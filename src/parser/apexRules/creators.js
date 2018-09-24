const { tokens } = require('../../lexer')

function creators($) {
  // creator
  // : nonWildcardCreator
  // | simpleCreator
  $.RULE('creator', () => {
    $.CONSUME(tokens.apex.New)
    $.OR([
      { ALT: () => $.SUBRULE($.nonWildcardCreator) },
      { ALT: () => $.SUBRULE($.simpleCreator) },
    ])
  })

  // nonWildCardCreator
  // : nonWildcardTypeArguments createdName classCreatorRest
  $.RULE('nonWildcardCreator', () => {
    $.SUBRULE($.nonWildcardTypeArguments)
    $.SUBRULE($.createdName)
    $.SUBRULE($.classCreatorRest)
  })

  // simpleCreator
  // : createdName (arrayCreatorRest | classCreatorRest)
  $.RULE('simpleCreator', () => {
    $.SUBRULE($.createdName)
    $.OR([
      { ALT: () => $.SUBRULE($.arrayOrMapInitializer) },
      { ALT: () => $.SUBRULE($.arrayCreatorRest) },
      { ALT: () => $.SUBRULE($.classCreatorRest) },
    ])
  })

  // createdName
  // : identifierName
  // | primitiveType
  $.RULE('createdName', () => {
    $.OR([{ ALT: () => $.SUBRULE($.identifierName) }, { ALT: () => $.SUBRULE($.primitiveType) }])
  })

  // innerCreator
  // : IDENTIFIER nonWildcardTypeArgumentsOrDiamond? classCreatorRest
  $.RULE('innerCreator', () => {
    $.CONSUME(tokens.apex.Identifier)
    $.OPTION(() => {
      $.SUBRULE($.nonWildcardTypeArgumentsOrDiamond)
    })
    $.SUBRULE($.classCreatorRest)
  })

  // arrayCreatorRest
  // : '[' (']' ('[' ']')* arrayOrMapInitializer | expression ']' ('[' expression ']')* ('[' ']')*)
  $.RULE('arrayCreatorRest', () => {
    $.CONSUME(tokens.apex.LSquare)
    $.OR([
      {
        ALT: () => {
          $.CONSUME(tokens.apex.RSquare)
          $.MANY(() => {
            $.CONSUME2(tokens.apex.LSquare)
            $.CONSUME2(tokens.apex.RSquare)
          })
          $.SUBRULE($.arrayOrMapInitializer)
        },
      },
      {
        ALT: () => {
          $.SUBRULE($.expression)
          $.CONSUME3(tokens.apex.RSquare)
          $.MANY2(() => {
            $.CONSUME4(tokens.apex.LSquare)
            $.SUBRULE2($.expression)
            $.CONSUME4(tokens.apex.RSquare)
          })
          $.MANY3(() => {
            $.CONSUME5(tokens.apex.LSquare)
            $.CONSUME5(tokens.apex.RSquare)
          })
        },
      },
    ])
  })

  // classCreatorRest
  // : arguments classBody?
  $.RULE('classCreatorRest', () => {
    $.SUBRULE($.arguments)
    $.OPTION(() => {
      $.SUBRULE($.classBody)
    })
  })

  // creatorOptionalNonWildcardInnerCreator
  // : NEW nonWildcardTypeArguments? innerCreator
  $.RULE('creatorOptionalNonWildcardInnerCreator', () => {
    $.CONSUME(tokens.apex.New)
    $.OPTION(() => {
      $.SUBRULE($.nonWildcardTypeArguments)
    })
    $.SUBRULE($.innerCreator)
  })
}

module.exports = {
  creators,
}
