const { tokens } = require('../../lexer')

function declarations($) {
  // annotationTypeDeclaration
  // : '@' INTERFACE IDENTIFIER annotationTypeBody
  $.RULE('annotationTypeDeclaration', () => {
    $.CONSUME(tokens.apex.At)
    $.CONSUME(tokens.apex.Interface)
    $.CONSUME(tokens.apex.Identifier)
    $.SUBRULE($.annotationTypeBody)
  })

  // annotationTypeElementDeclaration
  // : modifier* annotationTypeElementRest
  $.RULE('annotationTypeElementDeclaration', () => {
    $.MANY(() => {
      $.SUBRULE($.modifier)
    })
    $.SUBRULE($.annotationTypeElementRest)
  })

  // typeDeclaration
  // : classOrInterfaceModifier*
  //   (classDeclaration | enumDeclaration | interfaceDeclaration | annotationTypeDeclaration)
  $.RULE('typeDeclaration', () => {
    $.MANY(() => {
      $.SUBRULE($.classOrInterfaceModifier)
    })
    $.OR([
      { ALT: () => $.SUBRULE($.classDeclaration) },
      { ALT: () => $.SUBRULE($.enumDeclaration) },
      { ALT: () => $.SUBRULE($.interfaceDeclaration) },
      { ALT: () => $.SUBRULE($.annotationTypeDeclaration) },
    ])
  })

  // constantDeclarationOrInterfaceMethodDeclaration
  // : constantDeclaration
  // | interfaceMethodDeclaration
  $.RULE('constantDeclarationOrInterfaceMethodDeclaration', () => {
    let isConstantDeclaration = true
    let isInterfaceMethodDeclaration = true

    $.OR([
      {
        ALT: () => {
          // interfaceMethodDeclaration
          $.MANY(() => {
            $.SUBRULE($.interfaceMethodModifier)
            isConstantDeclaration = false
          })
          $.MANY2(() => {
            $.SUBRULE($.annotation)
            isConstantDeclaration = false
          })
          $.OR2([
            {
              ALT: () => {
                $.SUBRULE($.typeType)

                $.OPTION2({
                  GATE: () => isConstantDeclaration,
                  DEF: () => {
                    $.AT_LEAST_ONE_SEP({
                      SEP: tokens.apex.Comma,
                      DEF: () => {
                        $.SUBRULE($.constantDeclarator)
                      },
                    })
                    $.SUBRULE($.semiColon)
                    isInterfaceMethodDeclaration = false
                  },
                })
              },
            },
            { ALT: () => $.CONSUME(tokens.apex.Void) },
          ])

          $.OR3([
            {
              GATE: () => isInterfaceMethodDeclaration,
              ALT: () => {
                $.CONSUME(tokens.apex.Identifier)
                $.SUBRULE($.formalParameters)
                $.MANY3(() => {
                  $.CONSUME(tokens.apex.LSquare)
                  $.CONSUME(tokens.apex.RSquare)
                })
                $.SUBRULE($.methodBody)
              },
            },
            {
              ALT: () => {
                // empty for constant declaration
              },
            },
          ])
        },
      },
    ])
  })

  // interfaceDeclaration
  // : INTERFACE IDENTIFIER (EXTENDS typeList)? interfaceBody
  $.RULE('interfaceDeclaration', () => {
    $.CONSUME(tokens.apex.Interface)
    $.CONSUME(tokens.apex.Identifier)
    $.OPTION2(() => {
      $.CONSUME(tokens.apex.Extends)
      $.SUBRULE($.typeList)
    })
    $.SUBRULE($.interfaceBody)
  })

  // interfaceBodyDeclaration
  // : modifier* interfaceMemberDeclaration
  $.RULE('interfaceBodyDeclaration', () => {
    $.MANY(() => {
      $.SUBRULE($.modifier)
    })
    $.SUBRULE($.interfaceMemberDeclaration)
  })

  // interfaceMemberDeclaration
  // : constantDeclarationOrInterfaceMethodDeclaration
  // | interfaceDeclaration
  // | annotationTypeDeclaration
  // | classDeclaration
  // | enumDeclaration
  $.RULE('interfaceMemberDeclaration', () => {
    $.OR([
      {
        ALT: () => $.SUBRULE($.constantDeclarationOrInterfaceMethodDeclaration),
      },
      { ALT: () => $.SUBRULE($.interfaceDeclaration) },
      { ALT: () => $.SUBRULE($.classDeclaration) },
      { ALT: () => $.SUBRULE($.enumDeclaration) },
    ])
  })

  // see matching of [] comment in methodDeclaratorRest
  // methodBody from Java8
  // interfaceMethodDeclaration
  // : interfaceMethodModifier*
  //   (annotation*)?
  //   typeTypeOrVoid
  //   IDENTIFIER formalParameters ('[' ']')*
  //   methodBody
  $.RULE('interfaceMethodDeclaration', () => {
    $.MANY(() => {
      $.SUBRULE($.interfaceMethodModifier)
    })
    $.MANY2(() => {
      $.SUBRULE($.annotation)
    })
    $.SUBRULE($.typeTypeOrVoid)
    $.CONSUME(tokens.apex.Identifier)
    $.SUBRULE($.formalParameters)
    $.MANY3(() => {
      $.CONSUME(tokens.apex.LSquare)
      $.CONSUME(tokens.apex.RSquare)
    })
    $.SUBRULE($.methodBody)
  })

  // constantDeclaration
  // : typeType constantDeclarator (',' constantDeclarator)* ';'
  $.RULE('constantDeclaration', () => {
    $.SUBRULE($.typeType)
    $.AT_LEAST_ONE_SEP({
      SEP: tokens.apex.Comma,
      DEF: () => {
        $.SUBRULE($.constantDeclarator)
      },
    })
    $.SUBRULE($.semiColon)
  })

  // constantDeclarator
  // : IDENTIFIER ('[' ']')* '=' variableInitializer
  $.RULE('constantDeclarator', () => {
    $.CONSUME(tokens.apex.Identifier)
    $.MANY(() => {
      $.CONSUME(tokens.apex.LSquare)
      $.CONSUME(tokens.apex.RSquare)
    })
    $.CONSUME(tokens.apex.Equals)
    $.SUBRULE($.variableInitializer)
  })

  // classDeclaration
  // : CLASS IDENTIFIER
  //   (EXTENDS typeType)?
  //   (IMPLEMENTS typeList)?
  //   classBody
  $.RULE('classDeclaration', () => {
    $.CONSUME(tokens.apex.Class)
    $.CONSUME(tokens.apex.Identifier)
    $.OPTION(() => {
      $.CONSUME(tokens.apex.Extends)
      $.SUBRULE($.typeType)
    })
    $.OPTION2(() => {
      $.CONSUME(tokens.apex.Implements)
      $.SUBRULE($.typeList)
    })
    $.SUBRULE($.classBody)
  })

  // classBodyDeclaration
  // : STATIC? block
  // | modifier* memberDeclaration
  // | ';'
  $.RULE('classBodyDeclaration', () => {
    $.OPTION(() => {
      $.CONSUME(tokens.apex.Static)
    })
    $.OR([
      {
        ALT: () => {
          $.SUBRULE($.block)
        },
      },
      {
        // classBodyMemberDeclaration
        ALT: () => {
          $.MANY(() => {
            $.SUBRULE($.modifier)
          })
          $.SUBRULE($.memberDeclaration)
        },
      },
      {
        // semiColon
        ALT: () => {
          $.SUBRULE($.semiColon)
        },
      },
    ])
  })

  // memberDeclaration
  // : fieldDeclarationOrMethodDeclarationOrConstructorDeclaration
  // | genericMethodDeclarationOrGenericConstructorDeclaration
  // | interfaceDeclaration
  // | annotationTypeDeclaration
  // | classDeclaration
  // | enumDeclaration
  $.RULE('memberDeclaration', () => {
    $.OR([
      {
        ALT: () => $.SUBRULE($.fieldDeclarationOrMethodDeclarationOrConstructorDeclaration),
      },
      // {
      //   ALT: () =>
      //     $.SUBRULE($.genericMethodDeclarationOrGenericConstructorDeclaration)
      // },
      { ALT: () => $.SUBRULE($.interfaceDeclaration) },
      { ALT: () => $.SUBRULE($.annotationTypeDeclaration) },
      { ALT: () => $.SUBRULE($.classDeclaration) },
      { ALT: () => $.SUBRULE($.enumDeclaration) },
    ])
  })

  // fieldDeclarationOrMethodDeclarationOrConstructorDeclaration
  // : fieldDeclaration
  // | methodDeclaration
  // | constructorDeclaration
  $.RULE('fieldDeclarationOrMethodDeclarationOrConstructorDeclaration', () => {
    let isFieldDeclaration = true
    let isMethodDeclaration = true
    let isConstructorDeclaration = true
    let firstType = undefined
    // typeTypeOrVoid
    $.OR([
      {
        // typeType
        ALT: () => {
          $.OPTION(() => {
            $.SUBRULE($.annotation)
            isConstructorDeclaration = false
          })
          $.OR2([
            {
              ALT: () => {
                firstType = $.CONSUME(tokens.apex.Identifier)

                $.OR3([
                  {
                    // constructorDeclaration
                    GATE: () => isConstructorDeclaration,
                    ALT: () => {
                      $.SUBRULE($.formalParameters)
                      $.SUBRULE($.methodBody)
                      isFieldDeclaration = false
                      isMethodDeclaration = false
                      firstType.isConstructorDeclaration = true
                    },
                  },
                  {
                    ALT: () => {
                      $.OPTION3(() => {
                        $.SUBRULE($.typeArguments)
                      })
                      $.MANY({
                        GATE: () => $.LA(2).tokenType !== tokens.apex.Class,
                        DEF: () => {
                          $.CONSUME(tokens.apex.Dot)
                          $.SUBRULE2($.classOrInterfaceTypeElement)
                        },
                      })
                      isConstructorDeclaration = false
                    },
                  },
                ])
              },
            },
            {
              ALT: () => {
                firstType = $.SUBRULE($.primitiveType)
                isConstructorDeclaration = false
              },
            },
          ])
          $.MANY2({
            GATE: () => !isConstructorDeclaration,
            DEF: () => {
              const lSquare = $.CONSUME(tokens.apex.LSquare)
              lSquare.isTypeType = true
              $.CONSUME(tokens.apex.RSquare)
            },
          })
        },
      },
      {
        // Void
        ALT: () => {
          firstType = $.CONSUME(tokens.apex.Void)
          isConstructorDeclaration = false
          isFieldDeclaration = false
        },
      },
    ])
    $.OR4([
      {
        GATE: () => isMethodDeclaration || isFieldDeclaration,
        ALT: () => {
          $.CONSUME2(tokens.apex.Identifier)

          $.OR5([
            {
              // fieldDeclaration
              ALT: () => {
                $.MANY3(() => {
                  $.CONSUME2(tokens.apex.LSquare, {
                    LABEL: 'identifierDimension',
                  })
                  $.CONSUME2(tokens.apex.RSquare)
                })
                $.OPTION4(() => {
                  $.CONSUME(tokens.apex.Equals)
                  $.SUBRULE($.variableInitializer)
                })
                $.MANY4(() => {
                  $.CONSUME(tokens.apex.Comma)
                  $.SUBRULE($.variableDeclarator)
                })
                $.OR6([
                  {
                    ALT: () => $.SUBRULE2($.fieldGetSetProperties),
                  },
                  {
                    ALT: () => $.SUBRULE3($.semiColon),
                  },
                ])
                if (firstType) {
                  firstType.isFieldDeclaration = true
                }
              },
            },
            {
              // methodDeclaration
              ALT: () => {
                $.SUBRULE2($.formalParameters)
                $.MANY5(() => {
                  $.CONSUME3(tokens.apex.LSquare)
                  $.CONSUME3(tokens.apex.RSquare)
                })
                $.SUBRULE2($.methodBody)
                if (firstType) {
                  firstType.isMethodDeclaration = true
                }
              },
            },
          ])
        },
      },
      {
        ALT: () => {
          // empty
        },
      },
    ])
  })

  // methodDeclaration
  // : typeTypeOrVoid IDENTIFIER formalParameters ('[' ']')*
  //   methodBody
  $.RULE('methodDeclaration', () => {
    $.SUBRULE($.typeTypeOrVoid)
    $.CONSUME(tokens.apex.Identifier)
    $.SUBRULE($.formalParameters)
    $.MANY(() => {
      $.CONSUME(tokens.apex.LSquare)
      $.CONSUME(tokens.apex.RSquare)
    })
    $.SUBRULE($.methodBody)
  })

  // constructorDeclaration
  // : IDENTIFIER formalParameters block
  $.RULE('constructorDeclaration', () => {
    $.CONSUME(tokens.apex.Identifier)
    $.SUBRULE($.formalParameters)
    $.SUBRULE($.methodBody)
  })

  // genericMethodDeclarationOrGenericConstructorDeclaration
  // : methodDeclaration
  $.RULE('genericMethodDeclarationOrGenericConstructorDeclaration', () => {
    $.OR([
      { ALT: () => $.SUBRULE($.methodDeclaration) },
      { ALT: () => $.SUBRULE($.constructorDeclaration) },
    ])
  })

  // fieldDeclaration
  // : typeType variableDeclarators ';'
  $.RULE('fieldDeclaration', () => {
    $.SUBRULE($.typeType)
    $.SUBRULE($.variableDeclarators)
    $.OR([
      {
        ALT: () => $.SUBRULE1($.fieldGetSetProperties),
      },
      {
        ALT: () => $.SUBRULE($.semiColon),
      },
    ])
  })

  // enumDeclaration
  // : ENUM IDENTIFIER (IMPLEMENTS typeList)? '{' enumConstants? ','? enumBodyDeclarations? '}'
  $.RULE('enumDeclaration', () => {
    $.CONSUME(tokens.apex.Enum)
    $.CONSUME(tokens.apex.Identifier)
    $.OPTION(() => {
      $.CONSUME(tokens.apex.Implements)
      $.SUBRULE($.typeList)
    })
    $.CONSUME(tokens.apex.LCurly)
    $.OPTION2(() => {
      $.SUBRULE($.enumConstants)
    })
    $.OPTION3(() => {
      $.CONSUME(tokens.apex.Comma)
    })
    $.OPTION4(() => {
      $.SUBRULE($.enumBodyDeclarations)
    })
    $.CONSUME(tokens.apex.RCurly)
  })

  // enumBodyDeclarations
  // : ';' classBodyDeclaration*
  $.RULE('enumBodyDeclarations', () => {
    $.SUBRULE($.semiColon)
    $.MANY(() => {
      $.SUBRULE($.classBodyDeclaration)
    })
  })

  // variableDeclarators
  // : variableDeclarator (',' variableDeclarator)*
  $.RULE('variableDeclarators', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: tokens.apex.Comma,
      DEF: () => {
        $.SUBRULE($.variableDeclarator)
      },
    })
  })

  // variableDeclarator
  // : variableDeclaratorId ('=' variableInitializer)?
  $.RULE('variableDeclarator', () => {
    $.SUBRULE($.variableDeclaratorId)
    $.OPTION(() => {
      $.CONSUME(tokens.apex.Equals)
      $.SUBRULE($.variableInitializer)
    })
  })

  // variableDeclaratorId
  // : IDENTIFIER ('[' ']')*
  $.RULE('variableDeclaratorId', () => {
    $.CONSUME(tokens.apex.Identifier)
    $.MANY(() => {
      $.CONSUME(tokens.apex.LSquare)
      $.CONSUME(tokens.apex.RSquare)
    })
  })
}

module.exports = {
  declarations,
}
