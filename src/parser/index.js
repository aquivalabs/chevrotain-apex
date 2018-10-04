'use strict'
const chevrotain = require('chevrotain')
const { ApexLexer, tokens } = require('../lexer')
const { soqlParser } = require('./soql')
const { apexRules } = require('./apexRules')

const Parser = chevrotain.Parser

const END_OF_FILE = chevrotain.createTokenInstance(chevrotain.EOF, '', NaN, NaN, NaN, NaN, NaN, NaN)
Object.freeze(END_OF_FILE)

class ApexParser extends chevrotain.Parser {
  constructor(input) {
    super(input, ApexLexer.lexerDefinition, { outputCst: true })

    const $ = this
    apexRules($)
    soqlParser($)

    Parser.performSelfAnalysis(this)
  }

  LA(howMuch) {
    if (howMuch === 1) {
      let token = super.LA(howMuch)
      while (
        chevrotain.tokenMatcher(token, tokens.apex.LineComment) ||
        chevrotain.tokenMatcher(token, tokens.apex.JavaDocComment) ||
        chevrotain.tokenMatcher(token, tokens.apex.TraditionalComment) ||
        chevrotain.tokenMatcher(token, tokens.apex.LineCommentStandalone) ||
        chevrotain.tokenMatcher(token, tokens.apex.JavaDocCommentStandalone) ||
        chevrotain.tokenMatcher(token, tokens.apex.TraditionalCommentStandalone)
      ) {
        const comment = token
        super.consumeToken()
        token = super.LA(howMuch)
        if (!this.isEmptyComment(comment)) {
          const prevToken = this.CST_STACK[this.CST_STACK.length - 1]
          // If we are in a class or interface body
          if (
            prevToken.name === 'classBody' ||
            prevToken.name === 'interfaceBody' ||
            prevToken.name === 'block'
          ) {
            if (
              chevrotain.tokenMatcher(comment, tokens.apex.LineCommentStandalone) ||
              chevrotain.tokenMatcher(comment, tokens.apex.JavaDocCommentStandalone) ||
              chevrotain.tokenMatcher(comment, tokens.apex.TraditionalCommentStandalone)
            ) {
              if (prevToken.name === 'classBody') {
                this.addCommentStandAlone(prevToken, 'classBodyDeclaration', comment)
              } else if (prevToken.name === 'interfaceBody') {
                this.addCommentStandAlone(prevToken, 'interfaceBodyDeclaration', comment)
              } else if (prevToken.name === 'block') {
                this.addCommentStandAlone(prevToken, 'blockStatement', comment)
              }
            } else if (
              this.lastToken &&
              this.lastToken.startLine !== comment.startLine &&
              chevrotain.tokenMatcher(token, tokens.apex.RCurly) &&
              (chevrotain.tokenMatcher(comment, tokens.apex.LineComment) ||
                chevrotain.tokenMatcher(comment, tokens.apex.JavaDocComment) ||
                chevrotain.tokenMatcher(comment, tokens.apex.TraditionalComment))
            ) {
              // if its the last comment we transform it into a standalone comment
              if (prevToken.name === 'classBody') {
                this.addCommentStandAlone(prevToken, 'classBodyDeclaration', comment)
              } else if (prevToken.name === 'interfaceBody') {
                this.addCommentStandAlone(prevToken, 'interfaceBodyDeclaration', comment)
              } else if (prevToken.name === 'block') {
                this.addCommentStandAlone(prevToken, 'blockStatement', comment)
              }
            }
          }
        }
      }
      this.lastToken = token
      return token
    }

    if (howMuch > 1) {
      return this.LAgreater1(howMuch)
    }
  }

  addCommentStandAlone(prevToken, declaration, comment) {
    if (!prevToken.children[declaration]) {
      prevToken.children[declaration] = []
    }
    prevToken.children[declaration].push({
      name: comment.image.startsWith('//')
        ? 'LineCommentStandalone'
        : 'JavaDocTraditionalCommentStandalone',
      children: { image: comment.image },
    })
    comment.added = true
  }

  LAgreater1(howMuch) {
    let nextSearchIdx = this.currIdx
    for (let i = 0; i < howMuch; i++) {
      nextSearchIdx = this.skipComments(nextSearchIdx + 1)
    }

    const token = this.input[nextSearchIdx]
    if (!token) {
      return END_OF_FILE
    }
    return token
  }

  skipComments(nextSearchIdx) {
    let token = this.input[nextSearchIdx]
    while (
      token &&
      (chevrotain.tokenMatcher(token, tokens.apex.LineComment) ||
        chevrotain.tokenMatcher(token, tokens.apex.JavaDocComment) ||
        chevrotain.tokenMatcher(token, tokens.apex.TraditionalComment) ||
        chevrotain.tokenMatcher(token, tokens.apex.LineCommentStandalone) ||
        chevrotain.tokenMatcher(token, tokens.apex.JavaDocCommentStandalone) ||
        chevrotain.tokenMatcher(token, tokens.apex.TraditionalCommentStandalone))
    ) {
      nextSearchIdx++
      token = this.input[nextSearchIdx]
    }
    return nextSearchIdx
  }

  cstPostTerminal(key, consumedToken) {
    super.cstPostTerminal(key, consumedToken)

    const lastElement = this.CST_STACK[this.CST_STACK.length - 1]
    if (lastElement.name === 'semiColon') {
      const nextToken = super.LA(1)
      // After every Token (terminal) is successfully consumed
      // We will add all the comment that appeared after it on the same line
      // to the CST (Parse Tree)
      if (
        chevrotain.tokenMatcher(nextToken, tokens.apex.LineComment) &&
        !nextToken.added &&
        ((lastElement.children.SemiColon &&
          nextToken.startLine === lastElement.children.SemiColon[0].startLine) ||
          (lastElement.children.SemiColonWithFollowEmptyLine &&
            nextToken.startLine === lastElement.children.SemiColonWithFollowEmptyLine[0].startLine))
      ) {
        nextToken.trailing = true
        nextToken.added = true
        this.CST_STACK[this.CST_STACK.length - 2].children[tokens.apex.LineComment.tokenName] = [
          nextToken,
        ]
      }
    } else {
      let lookBehindIdx = -1
      let prevToken = super.LA(lookBehindIdx)

      // After every Token (terminal) is successfully consumed
      // We will add all the comment that appeared before it to the CST (Parse Tree)
      while (
        !prevToken.added &&
        (chevrotain.tokenMatcher(prevToken, tokens.apex.LineComment) ||
          chevrotain.tokenMatcher(prevToken, tokens.apex.TraditionalComment) ||
          chevrotain.tokenMatcher(prevToken, tokens.apex.JavaDocComment) ||
          chevrotain.tokenMatcher(prevToken, tokens.apex.LineCommentStandalone) ||
          chevrotain.tokenMatcher(prevToken, tokens.apex.TraditionalCommentStandalone) ||
          chevrotain.tokenMatcher(prevToken, tokens.apex.JavaDocCommentStandalone))
      ) {
        // TODO replace with faster method instead of replace
        if (!this.isEmptyComment(prevToken)) {
          super.cstPostTerminal(prevToken.tokenType.tokenName.replace('Standalone', ''), prevToken)
        }
        lookBehindIdx--
        prevToken = super.LA(lookBehindIdx)
      }
    }
  }

  isEmptyComment(comment) {
    // TODO fix replace because SLOW
    const isEmptyNoSpaces = comment.image.replace(/[\s]*/g, '') === '//'
    const isEmptyNoLineBreaks = comment.image.replace(/[\s\n\r*]*/g, '') === '//'

    const isEmptyLineComment =
      isEmptyNoSpaces &&
      (chevrotain.tokenMatcher(comment, tokens.apex.LineComment) ||
        chevrotain.tokenMatcher(comment, tokens.apex.LineCommentStandalone))

    const isEmptyMultilineComment =
      isEmptyNoLineBreaks &&
      (chevrotain.tokenMatcher(comment, tokens.apex.JavaDocComment) ||
        chevrotain.tokenMatcher(comment, tokens.apex.TraditionalComment) ||
        chevrotain.tokenMatcher(comment, tokens.apex.JavaDocCommentStandalone) ||
        chevrotain.tokenMatcher(comment, tokens.apex.TraditionalCommentStandalone))

    return isEmptyLineComment || isEmptyMultilineComment
  }
}

module.exports = ApexParser
