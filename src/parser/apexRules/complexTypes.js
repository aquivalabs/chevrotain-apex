const { tokens } = require('../../lexer')

function complexTypes($) {
  // typeList
  // : typeType (',' typeType)*
  $.RULE('typeList', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: tokens.apex.Comma,
      DEF: () => {
        $.SUBRULE($.typeType)
      },
    })
  })

  // typeTypeOrVoid
  // : typeType | VOID
  $.RULE('typeTypeOrVoid', () => {
    $.OR([{ ALT: () => $.SUBRULE($.typeType) }, { ALT: () => $.CONSUME(tokens.apex.Void) }])
  })

  // typeType
  // : annotation? (classOrInterfaceType | primitiveType) ('[' ']')*
  $.RULE('typeType', () => {
    $.OR([
      {
        ALT: () => {
          $.SUBRULE($.annotation)
          $.OPTION(() => {
            $.OR2([
              { ALT: () => $.SUBRULE($.classOrInterfaceType) },
              { ALT: () => $.SUBRULE($.primitiveType) },
            ])
            $.MANY(() => {
              $.CONSUME(tokens.apex.LSquare)
              $.CONSUME(tokens.apex.RSquare)
            })
          })
        },
      },
      {
        ALT: () => {
          $.OR3([
            { ALT: () => $.SUBRULE2($.classOrInterfaceType) },
            { ALT: () => $.SUBRULE2($.primitiveType) },
          ])
          $.MANY2(() => {
            $.CONSUME2(tokens.apex.LSquare)
            $.CONSUME2(tokens.apex.RSquare)
          })
        },
      },
    ])
  })

  // typeBound
  // : typeType ('&' typeType)*
  $.RULE('typeBound', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: tokens.apex.And,
      DEF: () => {
        $.SUBRULE($.typeType)
      },
    })
  })

  // classOrInterfaceType
  // : classOrInterfaceTypeElement ('.' classOrInterfaceTypeElement)*
  $.RULE('classOrInterfaceType', () => {
    $.SUBRULE($.classOrInterfaceTypeElement)
    $.MANY({
      GATE: () => $.LA(2).tokenType !== tokens.apex.Class,
      DEF: () => {
        $.CONSUME(tokens.apex.Dot)
        $.SUBRULE2($.classOrInterfaceTypeElement)
      },
    })
  })

  // classOrInterfaceTypeElement
  // : IDENTIFIER typeArguments?
  $.RULE('classOrInterfaceTypeElement', () => {
    $.CONSUME(tokens.apex.Identifier)
    $.OPTION(() => {
      $.SUBRULE($.typeArguments)
    })
  })

  // typeArgumentsOrDiamond
  // : emptyDiamond
  // | typeArguments
  $.RULE('typeArgumentsOrDiamond', () => {
    $.OR([{ ALT: () => $.SUBRULE($.emptyDiamond) }, { ALT: () => $.SUBRULE($.typeArguments) }])
  })

  // typeArguments
  // : '<' typeArgument (',' typeArgument)* '>'
  $.RULE('typeArguments', () => {
    $.CONSUME(tokens.apex.Less)
    $.AT_LEAST_ONE_SEP({
      SEP: tokens.apex.Comma,
      DEF: () => {
        $.SUBRULE($.typeArgument)
      },
    })
    $.CONSUME(tokens.apex.Greater)
  })

  // typeArgument
  // : typeType | '?'
  //   ((EXTENDS | SUPER) typeType)?
  $.RULE('typeArgument', () => {
    $.OR([
      {
        ALT: () => $.SUBRULE($.typeType)
      },
      {
        ALT: () => $.CONSUME(tokens.apex.Questionmark)
      },
    ])
    $.OPTION(() => {
      $.OR2([{ ALT: () => $.CONSUME(tokens.apex.Extends) }, { ALT: () => $.CONSUME(tokens.apex.Super) }])
      $.SUBRULE2($.typeType)
    })
  })

  // nonWildcardTypeArgumentsOrDiamond
  // : emptyDiamond
  // | nonWildcardTypeArguments
  $.RULE('nonWildcardTypeArgumentsOrDiamond', () => {
    $.OR([
      { ALT: () => $.SUBRULE($.emptyDiamond) },
      { ALT: () => $.SUBRULE($.nonWildcardTypeArguments) },
    ])
  })

  // emptyDiamond
  // : '<' '>'
  $.RULE('emptyDiamond', () => {
    $.CONSUME(tokens.apex.Less)
    $.CONSUME(tokens.apex.Greater)
  })

  // nonWildcardTypeArguments
  // : '<' typeList '>'
  $.RULE('nonWildcardTypeArguments', () => {
    $.CONSUME(tokens.apex.Less)
    $.SUBRULE($.typeList)
    $.CONSUME(tokens.apex.Greater)
  })
}

module.exports = {
  complexTypes,
}
