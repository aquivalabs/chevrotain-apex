const { tokens } = require('../../lexer')

function classesAndMethods($) {
  // classType
  // : annotation* classOrInterfaceType
  $.RULE('classType', () => {
    $.MANY(() => {
      $.SUBRULE($.annotation)
    })
    $.SUBRULE($.classOrInterfaceType)
  })

  // interfaceBody
  // : '{' interfaceBodyDeclaration* '}'
  $.RULE('interfaceBody', () => {
    $.CONSUME(tokens.apex.LCurly)
    $.MANY(() => {
      $.SUBRULE($.interfaceBodyDeclaration)
    })
    $.CONSUME(tokens.apex.RCurly)
  })

  // modifier
  // : classOrInterfaceModifier
  // | TRANSIENT
  $.RULE('modifier', () => {
    $.OR([
      { ALT: () => $.SUBRULE($.classOrInterfaceModifier) },
      { ALT: () => $.CONSUME(tokens.apex.Transient) },
    ])
  })

  // // Java8
  // interfaceMethodModifier
  // : annotation
  // | PUBLIC
  // | ABSTRACT
  // | STATIC
  $.RULE('interfaceMethodModifier', () => {
    $.OR([
      { ALT: () => $.SUBRULE($.annotation) },
      { ALT: () => $.CONSUME(tokens.apex.Public) },
      { ALT: () => $.CONSUME(tokens.apex.Abstract) },
      { ALT: () => $.CONSUME(tokens.apex.Static) },
    ])
  })

  // accessModifier
  // | PUBLIC
  // | PROTECTED
  // | PRIVATE
  $.RULE('accessModifier', () => {
    $.OR([
      { ALT: () => $.CONSUME(tokens.apex.Public) },
      { ALT: () => $.CONSUME(tokens.apex.Protected) },
      { ALT: () => $.CONSUME(tokens.apex.Private) },
    ])
  })

  // abstractOrVirtual
  // | ABSTRACT
  // | VIRTUAL
  $.RULE('abstractOrVirtual', () => {
    $.OR([
      { ALT: () => $.CONSUME(tokens.apex.Abstract) },
      { ALT: () => $.CONSUME(tokens.apex.Virtual) },
    ])
  })

  // sharingModifier
  // ( with | without | inherit ) sharing
  $.RULE('sharingModifier', () => {
    $.OR([
      { ALT: () => $.CONSUME(tokens.apex.With) },
      { ALT: () => $.CONSUME(tokens.apex.Without) },
      { ALT: () => $.CONSUME(tokens.apex.Inherit) },
    ])
    $.CONSUME(tokens.apex.Sharing)
  })

  // classOrInterfaceModifier
  // : annotation
  // | accessModifier
  // | abstractOrVirtual
  // | STATIC
  // | FINAL    // FINAL for class only -- does not apply to interfaces
  $.RULE('classOrInterfaceModifier', () => {
    $.OR([
      { ALT: () => $.SUBRULE($.annotation) },
      { ALT: () => $.SUBRULE($.accessModifier) },
      { ALT: () => $.SUBRULE($.abstractOrVirtual) },
      { ALT: () => $.SUBRULE($.sharingModifier) },
      { ALT: () => $.CONSUME(tokens.apex.Static) },
      { ALT: () => $.CONSUME(tokens.apex.Final) },
    ])
  })

  // classBody
  // : '{' classBodyDeclaration* '}'
  $.RULE('classBody', () => {
    $.CONSUME(tokens.apex.LCurly)
    $.MANY(() => {
      $.SUBRULE($.classBodyDeclaration)
    })
    $.CONSUME(tokens.apex.RCurly)
  })

  // methodBody
  // : block
  // | ";"
  $.RULE('methodBody', () => {
    $.OR([{ ALT: () => $.SUBRULE($.block) }, { ALT: () => $.SUBRULE($.semiColon) }])
  })

  $.RULE('getProperty', () => {
    $.OPTION(() => $.SUBRULE($.accessModifier))
    $.CONSUME(tokens.apex.Get)
    $.OR1([
      {
        ALT: () => $.SUBRULE($.semiColon),
      },
      {
        ALT: () => $.SUBRULE($.block),
      },
    ])
  })

  $.RULE('setProperty', () => {
    $.OPTION(() => $.SUBRULE($.accessModifier))
    $.CONSUME(tokens.apex.Set)
    $.OR1([
      {
        ALT: () => $.SUBRULE($.semiColon),
      },
      {
        ALT: () => $.SUBRULE($.block),
      },
    ])
  })

  // fieldGetSetProperties
  // { ( (get|set) (;|{}) )* }
  $.RULE('fieldGetSetProperties', () => {
    $.CONSUME(tokens.apex.LCurly)
    $.AT_LEAST_ONE(() => {
      $.OR([
        {
          ALT: () => $.SUBRULE($.getProperty),
        },
        {
          ALT: () => $.SUBRULE($.setProperty),
        },
      ])
    })
    $.CONSUME(tokens.apex.RCurly)
  })

  // thisOrSuper
  // : (
  //     THIS
  //     | SUPER
  //   )
  //   arguments?
  $.RULE('thisOrSuper', () => {
    $.OR([
      {
        ALT: () => {
          $.CONSUME(tokens.apex.This)
        },
      },
      {
        ALT: () => {
          $.CONSUME(tokens.apex.Super)
        },
      },
    ])
    $.OPTION(() => $.SUBRULE($.arguments))
  })

  // explicitGenericInvocationSuffix
  // : super
  // | IDENTIFIER arguments
  $.RULE('explicitGenericInvocationSuffix', () => {
    $.OR([{ ALT: () => $.SUBRULE($.super) }, { ALT: () => $.SUBRULE($.identifierArguments) }])
  })

  // identifierArguments
  // : IDENTIFIER arguments
  $.RULE('identifierArguments', () => {
    $.CONSUME(tokens.apex.Identifier)
    $.SUBRULE($.arguments)
  })

  // super
  // : SUPER superSuffix
  $.RULE('super', () => {
    $.CONSUME(tokens.apex.Super)
    $.SUBRULE($.superSuffix)
  })

  // superSuffix
  // : arguments
  // | dotIdentifierArguments
  $.RULE('superSuffix', () => {
    $.OR([
      { ALT: () => $.SUBRULE($.arguments) },
      { ALT: () => $.SUBRULE($.dotIdentifierArguments) },
    ])
  })

  // enumConstants
  // : enumConstant (',' enumConstant)*
  $.RULE('enumConstants', () => {
    $.SUBRULE($.enumConstant)
    $.MANY({
      // It can have a single comma at the end
      // What should follow is a right curly OR
      // a semi colon for a start of a enumBodyDeclarations
      GATE: () =>
        $.LA(2).tokenType !== tokens.apex.RCurly && $.LA(2).tokenType !== tokens.apex.SemiColon,
      DEF: () => {
        $.CONSUME(tokens.apex.Comma)
        $.SUBRULE2($.enumConstant)
      },
    })
  })

  // enumConstant
  // : annotation* IDENTIFIER arguments? classBody?
  $.RULE('enumConstant', () => {
    $.MANY(() => {
      $.SUBRULE($.annotation)
    })
    $.CONSUME(tokens.apex.Identifier)
    $.OPTION(() => {
      $.SUBRULE($.arguments)
    })
    $.OPTION2(() => {
      $.SUBRULE($.classBody)
    })
  })

  // arguments
  // : '(' expressionList? ')'
  $.RULE('arguments', () => {
    $.CONSUME(tokens.apex.LBrace)
    $.OPTION(() => {
      $.SUBRULE($.expressionList)
    })
    $.CONSUME(tokens.apex.RBrace)
  })

  // variableModifier
  // : FINAL
  // | annotation
  $.RULE('variableModifier', () => {
    $.OR([{ ALT: () => $.SUBRULE($.annotation) }, { ALT: () => $.CONSUME(tokens.apex.Final) }])
  })
}

module.exports = {
  classesAndMethods,
}
