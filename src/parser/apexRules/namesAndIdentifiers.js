const { tokens } = require('../../lexer')

function namesAndIdentifiers($) {
  // identifiers
  // : '(' identifierList? ')'
  $.RULE('identifiers', () => {
    $.CONSUME(tokens.apex.LBrace)
    $.OPTION(() => {
      $.SUBRULE($.identifierList)
    })
    $.CONSUME(tokens.apex.RBrace)
  })

  // identifierList
  // : identifier (',' identifier)*
  $.RULE('identifierList', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: tokens.apex.Comma,
      DEF: () => {
        $.CONSUME(tokens.apex.Identifier)
      },
    })
  })

  // identifierName
  // : identifierNameElement ('.' identifierNameElement)*
  $.RULE('identifierName', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: tokens.apex.Dot,
      DEF: () => {
        $.SUBRULE($.identifierNameElement)
      },
    })
  })

  // identifierNameElement
  // : IDENTIFIER typeArgumentsOrDiamond?
  $.RULE('identifierNameElement', () => {
    $.OR([
      { ALT: () => $.CONSUME(tokens.apex.Identifier) },
      { ALT: () => $.CONSUME(tokens.apex.New) }, // KLUDGE to allow Trigger.new
    ])
    $.OPTION(() => {
      $.SUBRULE($.nonWildcardTypeArgumentsOrDiamond)
    })
  })

  // qualifiedNameList
  // : qualifiedName (',' qualifiedName)*
  $.RULE('qualifiedNameList', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: tokens.apex.Comma,
      DEF: () => {
        $.SUBRULE($.qualifiedName)
      },
    })
  })

  // qualifiedName
  // : IDENTIFIER ('.' IDENTIFIER)*
  $.RULE('qualifiedName', () => {
    $.CONSUME(tokens.apex.Identifier)
    $.MANY({
      // The gate condition is in addition to basic grammar lookahead, so this.LA(1) === dot
      // is always checked
      GATE: () => $.LA(2).tokenType === tokens.apex.Identifier,
      DEF: () => {
        $.CONSUME(tokens.apex.Dot)
        $.CONSUME2(tokens.apex.Identifier)
      },
    })
  })
}

module.exports = {
  namesAndIdentifiers,
}
