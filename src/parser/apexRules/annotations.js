const { tokens } = require('../../lexer')

function annotations($) {
  // annotation
  // : '@' qualifiedName ('(' ( elementValuePairs* | elementValue )? ')')?
  $.RULE('annotation', () => {
    $.CONSUME(tokens.apex.At)
    $.SUBRULE($.qualifiedName)
    $.OPTION(() => {
      $.CONSUME(tokens.apex.LBrace)
      $.OPTION2(() => {
        $.OR([
          {
            ALT: () => {
              $.SUBRULE($.expression)
            },
          },
          { ALT: () => $.SUBRULE($.elementValueArrayInitializer) },
        ])
        $.MANY(() => {
          $.CONSUME(tokens.apex.Comma)
          $.SUBRULE2($.elementValuePair)
        })
      })
      $.CONSUME(tokens.apex.RBrace)
    })
  })

  // annotationTypeBody
  // : '{' (annotationTypeElementDeclaration)* '}'
  $.RULE('annotationTypeBody', () => {
    $.CONSUME(tokens.apex.LCurly)
    $.MANY(() => {
      $.SUBRULE($.annotationTypeElementDeclaration)
    })
    $.CONSUME(tokens.apex.RCurly)
  })

  // annotationTypeElementRest
  // : typeType annotationMethodRestOrConstantRest ';'
  // | classDeclaration ';'?
  // | interfaceDeclaration ';'?
  // | enumDeclaration ';'?
  // | annotationTypeDeclaration ';'?
  $.RULE('annotationTypeElementRest', () => {
    $.OR([
      {
        ALT: () => {
          $.SUBRULE($.typeType)
          $.SUBRULE($.annotationMethodRestOrConstantRest)
          $.SUBRULE($.semiColon)
        },
      },
      {
        ALT: () => {
          $.SUBRULE($.classDeclaration)
          $.OPTION(() => {
            $.SUBRULE2($.semiColon)
          })
        },
      },
      {
        ALT: () => {
          $.SUBRULE($.interfaceDeclaration)
          $.OPTION2(() => {
            $.SUBRULE3($.semiColon)
          })
        },
      },
      {
        ALT: () => {
          $.SUBRULE($.enumDeclaration)
          $.OPTION3(() => {
            $.SUBRULE4($.semiColon)
          })
        },
      },
      {
        ALT: () => {
          $.SUBRULE($.annotationTypeDeclaration)
          $.OPTION4(() => {
            $.SUBRULE5($.semiColon)
          })
        },
      },
    ])
  })

  // annotationMethodRestOrConstantRest
  // : annotationMethodRest
  // | annotationConstantRest
  $.RULE('annotationMethodRestOrConstantRest', () => {
    $.OR([
      { ALT: () => $.SUBRULE($.annotationMethodRest) },
      { ALT: () => $.SUBRULE($.annotationConstantRest) },
    ])
  })

  // annotationMethodRest
  // : IDENTIFIER '(' ')' defaultValue?
  $.RULE('annotationMethodRest', () => {
    $.CONSUME(tokens.apex.Identifier)
    $.CONSUME(tokens.apex.LBrace)
    $.CONSUME(tokens.apex.RBrace)
  })

  // annotationConstantRest
  // : variableDeclarators
  $.RULE('annotationConstantRest', () => {
    $.SUBRULE($.variableDeclarators)
  })
}

module.exports = {
  annotations,
}
