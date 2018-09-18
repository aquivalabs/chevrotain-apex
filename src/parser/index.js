'use strict'
const chevrotain = require('chevrotain')
const { ApexLexer, tokens } = require('../lexer')
const { soqlParser } = require('./soql')

const Parser = chevrotain.Parser

const END_OF_FILE = chevrotain.createTokenInstance(chevrotain.EOF, '', NaN, NaN, NaN, NaN, NaN, NaN)
Object.freeze(END_OF_FILE)

class ApexParser extends chevrotain.Parser {
  constructor(input) {
    super(input, ApexLexer.lexerDefinition, { outputCst: true })

    const $ = this

    // compilationUnit
    // : packageDeclaration? importDeclaration* typeDeclaration* EOF
    $.RULE('compilationUnit', () => {
      let foundTypeDeclaration = false
      $.OPTION(() => {
        $.MANY(() => $.SUBRULE($.annotation))
        $.MANY2(() => {
          $.SUBRULE($.typeDeclaration)
          foundTypeDeclaration = true
        })
      })
      $.OPTION2({
        GATE: () => !foundTypeDeclaration,
        DEF: () => {
          $.MANY3(() => {
            $.SUBRULE2($.typeDeclaration)
          })
        },
      })
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

    // modifier
    // : classOrInterfaceModifier
    // | TRANSIENT
    $.RULE('modifier', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.classOrInterfaceModifier) },
        { ALT: () => $.CONSUME(tokens.apex.Transient) },
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
        { ALT: () => $.CONSUME(tokens.apex.Static) },
        { ALT: () => $.CONSUME(tokens.apex.Final) },
      ])
    })

    // variableModifier
    // : FINAL
    // | annotation
    $.RULE('variableModifier', () => {
      $.OR([{ ALT: () => $.SUBRULE($.annotation) }, { ALT: () => $.CONSUME(tokens.apex.Final) }])
    })

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

    // elementValuePairs
    // : elementValuePair (',' elementValuePair)*
    $.RULE('elementValuePairs', () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.apex.Comma,
        DEF: () => {
          $.SUBRULE($.elementValuePair)
        },
      })
    })

    // elementValuePair
    // : IDENTIFIER '=' elementValue
    $.RULE('elementValuePair', () => {
      $.CONSUME(tokens.apex.Identifier)
      $.CONSUME(tokens.apex.Equals)
      $.SUBRULE($.elementValue)
    })

    // elementValue
    // : expression
    // | annotation
    // | elementValueArrayInitializer
    $.RULE('elementValue', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.expression) },
        { ALT: () => $.SUBRULE($.elementValueArrayInitializer) },
      ])
    })

    // elementValueArrayInitializer
    // : '{' (elementValue (',' elementValue)*)? (',')? '}'
    $.RULE('elementValueArrayInitializer', () => {
      $.CONSUME(tokens.apex.LCurly)
      $.OPTION(() => {
        $.SUBRULE($.elementValue)
        $.MANY(() => {
          $.CONSUME(tokens.apex.Comma)
          $.SUBRULE2($.elementValue)
        })
      })
      $.OPTION2(() => {
        $.CONSUME2(tokens.apex.Comma)
      })
      $.CONSUME(tokens.apex.RCurly)
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

    // classBody
    // : '{' classBodyDeclaration* '}'
    $.RULE('classBody', () => {
      $.CONSUME(tokens.apex.LCurly)
      $.MANY(() => {
        $.SUBRULE($.classBodyDeclaration)
      })
      $.CONSUME(tokens.apex.RCurly)
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
                          GATE: () => this.LA(2).tokenType !== tokens.apex.Class,
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

    // methodBody
    // : block
    // | ";"
    $.RULE('methodBody', () => {
      $.OR([{ ALT: () => $.SUBRULE($.block) }, { ALT: () => $.SUBRULE($.semiColon) }])
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

    // enumConstants
    // : enumConstant (',' enumConstant)*
    $.RULE('enumConstants', () => {
      $.SUBRULE($.enumConstant)
      $.MANY({
        // It can have a single comma at the end
        // What should follow is a right curly OR
        // a semi colon for a start of a enumBodyDeclarations
        GATE: () =>
          this.LA(2).tokenType !== tokens.apex.RCurly && this.LA(2).tokenType !== tokens.apex.SemiColon,
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

    // enumBodyDeclarations
    // : ';' classBodyDeclaration*
    $.RULE('enumBodyDeclarations', () => {
      $.SUBRULE($.semiColon)
      $.MANY(() => {
        $.SUBRULE($.classBodyDeclaration)
      })
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

    // interfaceBody
    // : '{' interfaceBodyDeclaration* '}'
    $.RULE('interfaceBody', () => {
      $.CONSUME(tokens.apex.LCurly)
      $.MANY(() => {
        $.SUBRULE($.interfaceBodyDeclaration)
      })
      $.CONSUME(tokens.apex.RCurly)
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

    // variableInitializer
    // : arrayOrMapInitializer
    // | expression
    $.RULE('variableInitializer', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.arrayOrMapInitializer) },
        {
          ALT: () => {
            $.SUBRULE($.expression)
            $.OPTION(() => {
              $.CONSUME(tokens.apex.Questionmark)
              $.SUBRULE2($.expression)
              $.CONSUME(tokens.apex.Colon)
              $.SUBRULE3($.expression)
            })
          },
        },
      ])
    })

    // arrayOrMapInitializer
    // : '{' (variableInitializer (',' variableInitializer)* (',')? )? '}'
    $.RULE('arrayOrMapInitializer', () => {
      $.CONSUME(tokens.apex.LCurly)
      $.OPTION(() => {
        $.SUBRULE($.variableInitializer)
        $.OPTION1(() => {
          $.CONSUME(tokens.apex.EqualsGreater)
          $.SUBRULE1($.variableInitializer)
        })
        $.MANY({
          GATE: () =>
            this.LA(2).tokenType !== tokens.apex.Comma && this.LA(2).tokenType !== tokens.apex.RCurly,
          DEF: () => {
            $.CONSUME(tokens.apex.Comma)
            $.SUBRULE2($.variableInitializer)
            $.OPTION3(() => {
              $.CONSUME1(tokens.apex.EqualsGreater)
              $.SUBRULE3($.variableInitializer)
            })
          },
        })
      })
      $.OPTION2(() => {
        $.CONSUME2(tokens.apex.Comma)
      })
      $.CONSUME(tokens.apex.RCurly)
    })

    // annotationTypeDeclaration
    // : '@' INTERFACE IDENTIFIER annotationTypeBody
    $.RULE('annotationTypeDeclaration', () => {
      $.CONSUME(tokens.apex.At)
      $.CONSUME(tokens.apex.Interface)
      $.CONSUME(tokens.apex.Identifier)
      $.SUBRULE($.annotationTypeBody)
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

    // annotationTypeElementDeclaration
    // : modifier* annotationTypeElementRest
    $.RULE('annotationTypeElementDeclaration', () => {
      $.MANY(() => {
        $.SUBRULE($.modifier)
      })
      $.SUBRULE($.annotationTypeElementRest)
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

    // typeTypeOrVoid
    // : typeType | VOID
    $.RULE('typeTypeOrVoid', () => {
      $.OR([{ ALT: () => $.SUBRULE($.typeType) }, { ALT: () => $.CONSUME(tokens.apex.Void) }])
    })

    // classOrInterfaceType
    // : classOrInterfaceTypeElement ('.' classOrInterfaceTypeElement)*
    $.RULE('classOrInterfaceType', () => {
      $.SUBRULE($.classOrInterfaceTypeElement)
      $.MANY({
        GATE: () => this.LA(2).tokenType !== tokens.apex.Class,
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

    // typeArgumentsOrOperatorExpressionRest
    // : '<'
    //   (
    //     'this'
    //     | 'super'
    //     | literal
    //     | typeArgument (',' typeArgument)* ( '(' expressionList ')' dimension* )? '>'?
    //     | '(' expression ')'
    //   )
    $.RULE('typeArgumentsOrOperatorExpressionRest', () => {
      $.CONSUME(tokens.apex.Less)
      $.OR([
        { ALT: () => $.CONSUME(tokens.apex.This) },
        { ALT: () => $.CONSUME(tokens.apex.Super) },
        { ALT: () => $.SUBRULE($.literal) },
        {
          ALT: () => {
            let canBeOperatorExpression = true
            $.SUBRULE($.typeArgument)
            $.MANY(() => {
              $.CONSUME(tokens.apex.Comma)
              $.SUBRULE2($.typeArgument)
              canBeOperatorExpression = false
            })

            let isOperatorExpression = false
            $.OPTION3({
              GATE: () => canBeOperatorExpression,
              DEF: () => {
                $.CONSUME(tokens.apex.LBrace)
                $.OPTION4(() => {
                  $.SUBRULE($.expressionList)
                })
                $.CONSUME(tokens.apex.RBrace)
                $.MANY2(() => {
                  $.SUBRULE($.dimension)
                })
                isOperatorExpression = true
              },
            })
            $.OPTION5({
              GATE: () => !isOperatorExpression,
              DEF: () => {
                $.CONSUME(tokens.apex.Greater)
              },
            })
          },
        },
        {
          ALT: () => {
            $.CONSUME2(tokens.apex.LBrace)
            $.SUBRULE2($.expression)
            $.CONSUME2(tokens.apex.RBrace)
          },
        },
      ])
    })

    // typeArgument
    // : typeType | '?'
    //   ((EXTENDS | SUPER) typeType)?
    $.RULE('typeArgument', () => {
      $.OR([{ ALT: () => $.SUBRULE($.typeType) }, { ALT: () => $.CONSUME(tokens.apex.Questionmark) }])
      $.OPTION(() => {
        $.OR2([{ ALT: () => $.CONSUME(tokens.apex.Extends) }, { ALT: () => $.CONSUME(tokens.apex.Super) }])
        $.SUBRULE2($.typeType)
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

    // formalParameters
    // : '(' formalParameterList? ')'
    $.RULE('formalParameters', () => {
      $.CONSUME(tokens.apex.LBrace)
      $.OPTION(() => {
        $.SUBRULE($.formalParameterList)
      })
      $.CONSUME(tokens.apex.RBrace)
    })

    // formalParameterList
    // : formalParameter (',' formalParameter)*
    $.RULE('formalParameterList', () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.apex.Comma,
        DEF: () => {
          $.SUBRULE($.formalParameter)
        },
      })
    })

    // formalParameter
    // : variableModifier* typeType variableDeclaratorId
    $.RULE('formalParameter', () => {
      $.MANY(() => {
        $.SUBRULE($.variableModifier)
      })
      $.SUBRULE($.typeType)
      $.SUBRULE($.variableDeclaratorId)
    })

    // block
    // : '{' blockStatement* '}'
    $.RULE('block', () => {
      $.CONSUME(tokens.apex.LCurly)
      $.MANY(() => {
        $.SUBRULE($.blockStatement)
      })
      $.CONSUME(tokens.apex.RCurly)
    })

    // blockStatement
    // : variableModifier* typeType variableDeclarators ';' // localVariableDeclaration
    // | classOrInterfaceModifier* (classDeclaration | interfaceDeclaration) // localTypeDeclaration
    // | identifierStatement
    // | expressionStatement
    $.RULE('blockStatement', () => {
      let hasSemiColon = false
      $.MANY(() => {
        $.SUBRULE($.classOrInterfaceModifier)
      })
      $.OR([
        {
          // localeVariableDeclaration
          ALT: () => {
            $.OR2([
              {
                ALT: () => {
                  $.SUBRULE($.expression)

                  $.OR3([
                    {
                      // identifierStatement
                      ALT: () => {
                        $.CONSUME(tokens.apex.Colon)
                        $.SUBRULE($.statement)
                      },
                    },
                    {
                      // expressionStatement
                      ALT: () => {
                        $.SUBRULE($.semiColon)
                        hasSemiColon = true
                      },
                    },
                    {
                      ALT: () => {
                        $.OPTION(() => {
                          $.SUBRULE($.typeArguments)
                        })
                        $.MANY2({
                          GATE: () => this.LA(2).tokenType !== tokens.apex.Class,
                          DEF: () => {
                            $.CONSUME(tokens.apex.Dot)
                            $.SUBRULE2($.classOrInterfaceTypeElement)
                          },
                        })
                      },
                    },
                  ])
                },
              },
            ])
            $.OPTION2({
              GATE: () => !hasSemiColon,
              DEF: () => {
                // if not identifier statement
                $.MANY3(() => {
                  $.CONSUME(tokens.apex.LSquare)
                  $.CONSUME(tokens.apex.RSquare)
                })
                $.SUBRULE($.variableDeclarators)
                $.SUBRULE2($.semiColon)
              },
            })
          },
        },
        // localTypeDeclaration
        { ALT: () => $.SUBRULE($.classDeclaration) },
        // localTypeDeclaration
        { ALT: () => $.SUBRULE($.interfaceDeclaration) },
        { ALT: () => $.SUBRULE($.statementWithStartingToken) },
      ])
    })

    // statement
    // : statementWithStartingToken
    // | identifierStatement
    $.RULE('statement', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.statementWithStartingToken) },
        { ALT: () => $.SUBRULE($.expressionStatement) },
        { ALT: () => $.SUBRULE($.identifierStatement) },
      ])
    })

    // statementWithStartingToken
    // : block
    // | assertStatement
    // | ifStatement
    // | forStatement
    // | whileStatement
    // | doWhileStatement
    // | tryStatement
    // | returnStatement
    // | throwStatement
    // | breakStatement
    // | continueStatement
    // | semiColonStatement
    // | expressionStatement
    $.RULE('statementWithStartingToken', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.block) },
        { ALT: () => $.SUBRULE($.assertStatement) },
        { ALT: () => $.SUBRULE($.ifStatement) },
        { ALT: () => $.SUBRULE($.forStatement) },
        { ALT: () => $.SUBRULE($.whileStatement) },
        { ALT: () => $.SUBRULE($.doWhileStatement) },
        { ALT: () => $.SUBRULE($.tryStatement) },
        { ALT: () => $.SUBRULE($.returnStatement) },
        { ALT: () => $.SUBRULE($.throwStatement) },
        { ALT: () => $.SUBRULE($.breakStatement) },
        { ALT: () => $.SUBRULE($.continueStatement) },
        { ALT: () => $.SUBRULE($.semiColonStatement) },
      ])
    })

    // assertStatement
    // : ASSERT expression (':' expression)? ';'
    $.RULE('assertStatement', () => {
      $.CONSUME(tokens.apex.Assert)
      $.SUBRULE($.expression)
      $.OPTION(() => {
        $.CONSUME(tokens.apex.Colon)
        $.SUBRULE2($.expression)
      })
      $.SUBRULE($.semiColon)
    })

    // ifStatement
    // : IF '(' expression ')' statement (ELSE statement)?
    $.RULE('ifStatement', () => {
      $.CONSUME(tokens.apex.If)
      $.CONSUME(tokens.apex.LBrace)
      $.SUBRULE($.expression)
      $.CONSUME(tokens.apex.RBrace)
      $.SUBRULE($.statement)
      $.OPTION(() => {
        $.CONSUME(tokens.apex.Else)
        $.SUBRULE2($.statement)
      })
    })

    // whileStatement
    // : WHILE '(' expression ')' statement
    $.RULE('whileStatement', () => {
      $.CONSUME(tokens.apex.While)
      $.CONSUME(tokens.apex.LBrace)
      $.SUBRULE($.expression)
      $.CONSUME(tokens.apex.RBrace)
      $.SUBRULE($.statement)
    })

    // doWhileStatement
    // : DO statement WHILE '(' expression ')' ';'
    $.RULE('doWhileStatement', () => {
      $.CONSUME(tokens.apex.Do)
      $.SUBRULE($.statement)
      $.CONSUME(tokens.apex.While)
      $.CONSUME(tokens.apex.LBrace)
      $.SUBRULE($.expression)
      $.CONSUME(tokens.apex.RBrace)
      $.SUBRULE($.semiColon)
    })

    // tryStatement
    // : TRY resourceSpecification? block (catchClause+ finallyBlock? | finallyBlock)
    $.RULE('tryStatement', () => {
      $.CONSUME(tokens.apex.Try)
      $.OPTION(() => {
        $.SUBRULE($.resourceSpecification)
      })
      $.SUBRULE($.block)
      $.OPTION1(() => {
        $.OR([
          {
            ALT: () => {
              $.SUBRULE($.catchClause)
              $.MANY(() => {
                $.SUBRULE2($.catchClause)
              })
              $.OPTION2(() => {
                $.SUBRULE($.finallyBlock)
              })
            },
          },
          { ALT: () => $.SUBRULE2($.finallyBlock) },
        ])
      })
    })

    // returnStatement
    // : RETURN expression? ';'
    $.RULE('returnStatement', () => {
      $.CONSUME(tokens.apex.Return)
      $.OPTION(() => {
        $.SUBRULE($.expression)
      })
      $.SUBRULE($.semiColon)
    })

    // throwStatement
    // : THROW expression ';'
    $.RULE('throwStatement', () => {
      $.CONSUME(tokens.apex.Throw)
      $.SUBRULE($.expression)
      $.SUBRULE($.semiColon)
    })

    // breakStatement
    // : BREAK IDENTIFIER? ';'
    $.RULE('breakStatement', () => {
      $.CONSUME(tokens.apex.Break)
      $.OPTION(() => {
        $.CONSUME(tokens.apex.Identifier)
      })
      $.SUBRULE($.semiColon)
    })

    // continueStatement
    // : CONTINUE IDENTIFIER? ';'
    $.RULE('continueStatement', () => {
      $.CONSUME(tokens.apex.Continue)
      $.OPTION(() => {
        $.CONSUME(tokens.apex.Identifier)
      })
      $.SUBRULE($.semiColon)
    })

    // semiColonStatement
    // : ';'
    $.RULE('semiColonStatement', () => {
      $.SUBRULE($.semiColon)
    })

    // expressionStatement
    // : expression ';'
    $.RULE('expressionStatement', () => {
      $.SUBRULE($.expression)
      $.SUBRULE($.semiColon)
    })

    // identifierStatement
    // : IDENTIFIER ':' statement
    $.RULE('identifierStatement', () => {
      $.CONSUME(tokens.apex.Identifier)
      $.CONSUME(tokens.apex.Colon)
      $.SUBRULE($.statement)
    })

    // catchClause
    // : CATCH '(' variableModifier* catchType IDENTIFIER ')' block
    $.RULE('catchClause', () => {
      $.CONSUME(tokens.apex.Catch)
      $.CONSUME(tokens.apex.LBrace)
      $.MANY(() => {
        $.SUBRULE($.variableModifier)
      })
      $.SUBRULE($.catchType)
      $.CONSUME(tokens.apex.Identifier)
      $.CONSUME(tokens.apex.RBrace)
      $.SUBRULE($.block)
    })

    // catchType
    // : qualifiedName ('|' qualifiedName)*
    $.RULE('catchType', () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.apex.Or,
        DEF: () => {
          $.SUBRULE($.qualifiedName)
        },
      })
    })

    // finallyBlock
    // : FINALLY block
    $.RULE('finallyBlock', () => {
      $.CONSUME(tokens.apex.Finally)
      $.SUBRULE($.block)
    })

    // resourceSpecification
    // : '(' resources ';'? ')'
    $.RULE('resourceSpecification', () => {
      $.CONSUME(tokens.apex.LBrace)
      $.SUBRULE($.resources)
      $.OPTION(() => {
        $.SUBRULE($.semiColon)
      })
      $.CONSUME(tokens.apex.RBrace)
    })

    // resources
    // : resource (';' resource)*
    $.RULE('resources', () => {
      $.SUBRULE($.resource)
      $.MANY({
        GATE: () => this.LA(2).tokenType !== tokens.apex.RBrace,
        DEF: () => {
          $.SUBRULE($.semiColon)
          $.SUBRULE2($.resource)
        },
      })
    })

    // resource
    // : variableModifier* classOrInterfaceType variableDeclaratorId '=' expression
    $.RULE('resource', () => {
      $.MANY(() => {
        $.SUBRULE($.variableModifier)
      })
      $.SUBRULE($.classOrInterfaceType)
      $.SUBRULE($.variableDeclaratorId)
      $.CONSUME(tokens.apex.Equals)
      $.SUBRULE($.expression)
    })

    // forStatement
    // : FOR '(' forControl ')' statement
    $.RULE('forStatement', () => {
      $.CONSUME(tokens.apex.For)
      $.CONSUME(tokens.apex.LBrace)
      $.SUBRULE($.forControl)
      $.CONSUME(tokens.apex.RBrace)
      $.SUBRULE($.statement)
    })

    // forControl
    // : (localVariableDeclaration | expressionList)? ';' expression? ';' forUpdate=expressionList? // basicForStatement
    // | variableModifier* typeType variableDeclaratorId ':' expression // enhancedForControl
    $.RULE('forControl', () => {
      let enhancedForStatement = false
      $.OPTION(() => {
        let localVariableDeclaration = false
        $.MANY(() => {
          $.SUBRULE($.variableModifier)
          localVariableDeclaration = true
        })
        $.SUBRULE($.expression)
        $.OR([
          {
            ALT: () => {
              $.SUBRULE($.variableDeclaratorId)

              $.OR2([
                {
                  // enhancedForStatement
                  ALT: () => {
                    $.CONSUME(tokens.apex.Colon)
                    $.SUBRULE2($.expression)
                    enhancedForStatement = true
                  },
                },
                {
                  ALT: () => {
                    $.OPTION2(() => {
                      $.CONSUME(tokens.apex.Equals)
                      $.SUBRULE($.variableInitializer)
                    })
                  },
                },
              ])

              $.MANY2({
                GATE: () => !enhancedForStatement,
                DEF: () => {
                  $.CONSUME(tokens.apex.Comma)
                  $.SUBRULE($.variableDeclarator)
                },
              })
            },
          },
          {
            GATE: !localVariableDeclaration,
            ALT: () => {
              $.MANY3(() => {
                $.CONSUME2(tokens.apex.Comma)
                $.SUBRULE3($.expression)
              })
            },
          },
        ])
      })
      $.OR3([
        {
          GATE: () => !enhancedForStatement,
          ALT: () => {
            $.SUBRULE($.semiColon)
            $.OPTION3(() => {
              const optionalExpression = $.SUBRULE4($.expression)
              optionalExpression.optionalExpression = true
            })
            $.SUBRULE2($.semiColon)
            $.OPTION4(() => {
              $.SUBRULE($.expressionList)
            })
          },
        },
        {
          ALT: () => {
            // Just here for enhancedForStatement
          },
        },
      ])
    })

    // enhancedForControl
    // : variableModifier* typeType variableDeclaratorId ':' expression
    $.RULE('enhancedForControl', () => {
      $.MANY(() => {
        $.SUBRULE($.variableModifier)
      })
      $.SUBRULE($.typeType)
      $.SUBRULE($.variableDeclaratorId)
      $.CONSUME(tokens.apex.Colon)
      $.SUBRULE($.expression)
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

    // arguments
    // : '(' expressionList? ')'
    $.RULE('arguments', () => {
      $.CONSUME(tokens.apex.LBrace)
      $.OPTION(() => {
        $.SUBRULE($.expressionList)
      })
      $.CONSUME(tokens.apex.RBrace)
    })

    // dotIdentifierArguments
    // : '.' IDENTIFIER arguments?
    $.RULE('dotIdentifierArguments', () => {
      $.CONSUME(tokens.apex.Dot)
      $.CONSUME(tokens.apex.Identifier)
      $.OPTION(() => {
        $.SUBRULE($.arguments)
      })
    })

    // parExpression
    // : '(' expression ')'
    $.RULE('parExpression', () => {
      $.CONSUME(tokens.apex.LBrace)
      $.SUBRULE($.expression)
      $.CONSUME(tokens.apex.RBrace)
    })

    // expressionList
    // : expression (',' expression)*
    $.RULE('expressionList', () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.apex.Comma,
        DEF: () => {
          $.SUBRULE($.expression)
        },
      })
    })

    // methodInvocation
    // : IDENTIFIER '(' expressionList? ')'
    $.RULE('methodInvocation', () => {
      $.CONSUME(tokens.apex.Identifier)
      $.CONSUME(tokens.apex.LBrace)
      $.OPTION(() => {
        $.SUBRULE($.expressionList)
      })
      $.CONSUME(tokens.apex.RBrace)
      $.MANY(() => {
        $.SUBRULE($.dimension)
      })
    })

    // expression
    // : atomic
    //   (
    //     instanceExpressionRest
    //     | squareExpressionRest
    //     | postfixExpressionRest
    //     | ifElseExpressionRest
    //     | qualifiedExpressionRest
    //     | '->' lambdaBody // lambdaExpression
    //     | ( operatorExpressionRest )*
    //     )
    // | prefixExpression
    // | parExpressionOrCastExpressionOrLambdaExpression
    $.RULE('expression', () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.atomic)
            $.OR2([
              { ALT: () => $.SUBRULE($.instanceofExpressionRest) },
              { ALT: () => $.SUBRULE($.squareExpressionRest) },
              { ALT: () => $.SUBRULE($.postfixExpressionRest) },
              {
                ALT: () => {
                  $.SUBRULE($.ifElseExpressionRest)
                },
              },
              {
                ALT: () => {
                  $.SUBRULE($.qualifiedExpressionRest)
                  $.OR3([
                    {
                      ALT: () => $.SUBRULE2($.postfixExpressionRest),
                    },
                    {
                      ALT: () => {
                        $.OR4([
                          { ALT: () => $.SUBRULE2($.instanceofExpressionRest) },
                          {
                            ALT: () =>
                              $.MANY(() => {
                                $.SUBRULE($.operatorExpressionRest)
                              }),
                          },
                        ])
                        $.OPTION(() => $.SUBRULE2($.ifElseExpressionRest))
                      },
                    },
                  ])
                },
              },
              {
                ALT: () => {
                  $.MANY2(() => {
                    $.SUBRULE2($.operatorExpressionRest)
                    $.OPTION2(() => {
                      $.SUBRULE3($.ifElseExpressionRest)
                    })
                  })
                },
              },
            ])
          },
        },
        {
          ALT: () => {
            $.SUBRULE($.prefixExpression)
          },
        },
        {
          ALT: () => {
            $.SUBRULE($.parExpressionOrCastExpressionOrLambdaExpression)
          },
        },
        {
          ALT: () => {
            $.SUBRULE($.baseSoqlQuery)
          },
        },
      ])
    })

    // atomic
    // : methodInvocation
    // | primary
    // | creator
    $.RULE('atomic', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.methodInvocation) },
        { ALT: () => $.SUBRULE($.primary) },
        { ALT: () => $.SUBRULE($.creator) },
      ])
    })

    // instanceofExpressionRest
    // : INSTANCEOF typeType
    $.RULE('instanceofExpressionRest', () => {
      $.CONSUME(tokens.apex.Instanceof)
      $.SUBRULE($.typeType)
      $.MANY(() => {
        $.SUBRULE($.operatorExpressionRest)
      })
    })

    // squareExpressionRest
    // : '[' expression ']'
    $.RULE('squareExpressionRest', () => {
      $.CONSUME(tokens.apex.LSquare)
      $.SUBRULE($.expression)
      $.CONSUME(tokens.apex.RSquare)
    })

    // postfixExpressionRest
    // : ('++' | '--')
    $.RULE('postfixExpressionRest', () => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(tokens.apex.PlusPlus)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.MinusMinus)
          },
        },
      ])
    })

    // ifElseExpressionRest
    // : '?' expression ':' expression
    $.RULE('ifElseExpressionRest', () => {
      $.CONSUME(tokens.apex.Questionmark)
      $.SUBRULE($.expression)
      $.CONSUME(tokens.apex.Colon)
      $.SUBRULE2($.expression)
    })

    // qualifiedExpressionRest
    // : '.'
    //   (
    //     IDENTIFIER
    //     | methodInvocation
    //     | THIS
    //     | SUPER
    //     | creatorOptionalNonWildcardInnerCreator
    //     | explicitGenericInvocation
    //   )
    $.RULE('qualifiedExpressionRest', () => {
      $.CONSUME(tokens.apex.Dot)
      $.OR([
        { ALT: () => $.SUBRULE($.methodInvocation) },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.Identifier)
            $.OPTION(() => {
              $.SUBRULE($.typeArgumentsOrOperatorExpressionRest)
            })
            $.MANY(() => {
              $.SUBRULE($.dimension)
            })
          },
        },
        { ALT: () => $.CONSUME(tokens.apex.Class) },
        { ALT: () => $.CONSUME(tokens.apex.This) },
        { ALT: () => $.CONSUME(tokens.apex.Super) },
        { ALT: () => $.SUBRULE($.creatorOptionalNonWildcardInnerCreator) },
        { ALT: () => $.SUBRULE($.explicitGenericInvocation) },
        { ALT: () => $.CONSUME(tokens.apex.New) },
      ])

      $.OR2([
        { ALT: () => $.SUBRULE($.qualifiedExpressionRest) },
        {
          ALT: () => {
            // or nothing
          },
        },
      ])
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

    // prefixExpression
    // : ('+'|'-'|'++'|'--'|'~'|'!') expression
    $.RULE('prefixExpression', () => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(tokens.apex.Plus)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.Minus)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.PlusPlus)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.MinusMinus)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.Exclamationmark)
          },
        },
      ])
      $.SUBRULE($.expression)
    })

    // parExpressionOrCastExpressionOrLambdaExpression
    // : '(' expression ')'
    // | '(' typeType ')' expression
    // | lambdaExpression // Java8
    $.RULE('parExpressionOrCastExpressionOrLambdaExpression', () => {
      $.CONSUME(tokens.apex.LBrace)
      // if parExpression
      // -> no
      //       - annotations
      //       - typeArguments
      //       - LSquare/RSquare
      // -> only one expression
      $.OR([
        {
          ALT: () => {
            let formalParameters = false
            let i = 0
            $.OPTION(() => {
              const final = $.CONSUME(tokens.apex.Final)
              final.cnt = i
              formalParameters = true
            })
            $.SUBRULE($.expression)
            if (!formalParameters) {
              $.OPTION2(() => {
                $.SUBRULE($.variableDeclaratorId)
                formalParameters = true
              })
            } else {
              $.SUBRULE2($.variableDeclaratorId)
            }

            // For potentielle formalParameterList or identifierList
            $.MANY(() => {
              i++
              $.CONSUME(tokens.apex.Comma)
              if (formalParameters) {
                $.OPTION3(() => {
                  const final = $.CONSUME2(tokens.apex.Final)
                  final.cnt = i
                })
              }
              $.SUBRULE2($.expression)
              if (formalParameters) {
                $.SUBRULE3($.variableDeclaratorId)
              }
            })

            $.CONSUME2(tokens.apex.RBrace)
            $.OR2([
              {
                GATE: () => !formalParameters,
                ALT: () => {
                  // for potentielle cast expression
                  // or operator expression
                  let isOperatorExpression = false
                  $.OPTION4(() => {
                    $.SUBRULE($.operator)
                    isOperatorExpression = true
                  })
                  $.SUBRULE3($.expression)
                  $.MANY2({
                    GATE: () => isOperatorExpression,
                    DEF: () => {
                      $.SUBRULE($.operatorExpressionRest)
                    },
                  })
                  $.OPTION5({
                    GATE: () => isOperatorExpression,
                    DEF: () => {
                      $.SUBRULE($.ifElseExpressionRest)
                    },
                  })
                },
              },
              {
                GATE: () => !formalParameters,
                ALT: () => {
                  // Cast expression with following method or variable
                  $.SUBRULE($.qualifiedExpressionRest)
                  $.MANY3(() => {
                    $.SUBRULE2($.operatorExpressionRest)
                  })
                  // followed by a short if else
                  $.OR3([{ ALT: () => $.SUBRULE2($.ifElseExpressionRest) }, { ALT: () => {} }])
                },
              },
              {
                GATE: () => !formalParameters,
                ALT: () => {
                  // followed by a short if else
                  $.SUBRULE3($.ifElseExpressionRest)
                },
              },
              {
                // if the first expression is not an identifier, second expression should be empty
                GATE: () => !formalParameters,
                ALT: () => {},
              },
            ])
          },
        },
      ])
    })

    // operator
    // : ('*'|'/'|'%')
    //   | ('+'|'-')
    //   | ('<<' | '>>>' | '>>')
    //   | ('<=' | '>=' | '>' | '<')
    //   | ('==' | '!=')
    //   | '&'
    //   | '^'
    //   | '|'
    //   | '&&'
    //   | '||'
    //   | ('=' | '+=' | '-=' | '*=' | '/=' | '&=' | '|=' | '^=' | '>>=' | '>>>=' | '<<=' | '%=')
    $.RULE('operator', () => {
      $.OR([
        // ('*'|'/'|'%')
        {
          ALT: () => {
            $.CONSUME(tokens.apex.Star)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.Dash)
          },
        },
        // ('+'|'-')
        {
          ALT: () => {
            $.CONSUME(tokens.apex.Plus)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.Minus)
          },
        },
        // ('<=' | '>=' | '>' | '>>' | '>>>' | '<')
        {
          ALT: () => {
            $.CONSUME(tokens.apex.LessEquals)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.GreaterEquals)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.Greater)
            $.OPTION(() => {
              $.CONSUME2(tokens.apex.Greater)
              $.OPTION2(() => {
                $.CONSUME3(tokens.apex.Greater)
              })
            })
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.Less)
          },
        },
        // ('==' | '!=')
        {
          ALT: () => {
            $.CONSUME(tokens.apex.EqualsEquals)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.ExclamationmarkEquals)
          },
        },
        // '&'
        {
          ALT: () => {
            $.CONSUME(tokens.apex.And)
          },
        },
        // | '|'
        {
          ALT: () => {
            $.CONSUME(tokens.apex.Or)
          },
        },
        // | '&&'
        {
          ALT: () => {
            $.CONSUME(tokens.apex.AndAnd)
          },
        },
        // | '||'
        {
          ALT: () => {
            $.CONSUME(tokens.apex.OrOr)
          },
        },
        // ('=' | '+=' | '-=' | '*=' | '/=' | '&=' | '|=' | '^=' | '>>=' | '>>>=' | '<<=' | '%=')
        {
          ALT: () => {
            $.CONSUME(tokens.apex.Equals)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.PlusEquals)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.MinusEquals)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.StarEquals)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.DashEquals)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.AndEquals)
          },
        },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.OrEquals)
          },
        },
      ])
    })

    // operatorExpressionRest
    // : operator expression
    $.RULE('operatorExpressionRest', () => {
      const operator = $.SUBRULE($.operator)
      $.OR([
        { ALT: () => $.SUBRULE($.expression) },
        {
          GATE: () => operator.children.Equals.length > 0,
          ALT: () => $.SUBRULE($.elementValueArrayInitializer),
        },
      ])
    })

    // lambdaParameters // Java8
    // : IDENTIFIER
    // | formalParameters
    // | identifiers
    $.RULE('lambdaParameters', () => {
      $.OR([
        { ALT: () => $.CONSUME(tokens.apex.Identifier) },
        {
          ALT: () => {
            $.CONSUME(tokens.apex.LBrace)
            $.CONSUME(tokens.apex.RBrace)
          },
        },
        {
          ALT: () => {
            $.CONSUME2(tokens.apex.LBrace)
            $.SUBRULE($.formalParameterList)
            $.CONSUME2(tokens.apex.RBrace)
          },
        },
        {
          ALT: () => {
            $.CONSUME3(tokens.apex.LBrace)
            $.SUBRULE($.identifierList)
            $.CONSUME3(tokens.apex.RBrace)
          },
        },
      ])
    })

    // // Java8
    // lambdaBody
    // : expression
    // | block
    $.RULE('lambdaBody', () => {
      $.OR([{ ALT: () => $.SUBRULE($.expression) }, { ALT: () => $.SUBRULE($.block) }])
    })

    // classType
    // : annotation* classOrInterfaceType
    $.RULE('classType', () => {
      $.MANY(() => {
        $.SUBRULE($.annotation)
      })
      $.SUBRULE($.classOrInterfaceType)
    })

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

    // explicitGenericInvocation
    // : nonWildcardTypeArguments explicitGenericInvocationSuffix
    $.RULE('explicitGenericInvocation', () => {
      $.SUBRULE($.nonWildcardTypeArguments)
      $.SUBRULE($.explicitGenericInvocationSuffix)
    })

    // typeArgumentsOrDiamond
    // : emptyDiamond
    // | typeArguments
    $.RULE('typeArgumentsOrDiamond', () => {
      $.OR([{ ALT: () => $.SUBRULE($.emptyDiamond) }, { ALT: () => $.SUBRULE($.typeArguments) }])
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

    // qualifiedName
    // : IDENTIFIER ('.' IDENTIFIER)*
    $.RULE('qualifiedName', () => {
      $.CONSUME(tokens.apex.Identifier)
      $.MANY({
        // The gate condition is in addition to basic grammar lookahead, so this.LA(1) === dot
        // is always checked
        GATE: () => this.LA(2).tokenType === tokens.apex.Identifier,
        DEF: () => {
          $.CONSUME(tokens.apex.Dot)
          $.CONSUME2(tokens.apex.Identifier)
        },
      })
    })

    // primary
    // : THIS
    // | SUPER
    // | literal
    // | IDENTIFIER
    //// | typeTypeOrVoid '.' CLASS
    // | nonWildcardTypeArguments (explicitGenericInvocationSuffix | THIS arguments)
    $.RULE('primary', () => {
      $.OR([
        {
          ALT: () => {
            $.SUBRULE($.thisOrSuper)
          },
        },
        { ALT: () => $.SUBRULE($.literal) },
        {
          ALT: () => {
            $.OR2([
              {
                ALT: () => {
                  $.SUBRULE($.annotation)
                  $.OPTION2(() => {
                    $.OR3([
                      {
                        ALT: () => {
                          $.CONSUME(tokens.apex.Identifier)
                          $.OPTION3(() => {
                            $.SUBRULE($.typeArguments)
                          })
                        },
                      },
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
                  $.OR4([
                    {
                      ALT: () => {
                        $.SUBRULE($.identifierOrIdentifierWithTypeArgumentsOrOperatorExpression)
                      },
                    },
                    { ALT: () => $.SUBRULE2($.primitiveType) },
                  ])
                  $.MANY2(() => {
                    $.SUBRULE($.dimension)
                  })
                },
              },
            ])
          },
        },
        { ALT: () => $.CONSUME(tokens.apex.Void) },
        {
          ALT: () => {
            $.SUBRULE($.nonWildcardTypeArguments)
            $.OR5([
              { ALT: () => $.SUBRULE($.explicitGenericInvocationSuffix) },
              {
                ALT: () => {
                  $.CONSUME2(tokens.apex.This)
                  $.SUBRULE2($.arguments)
                },
              },
            ])
          },
        },
      ])
    })

    // identifierOrIdentifierWithTypeArgumentsOrOperatorExpression
    $.RULE('identifierOrIdentifierWithTypeArgumentsOrOperatorExpression', () => {
      $.CONSUME(tokens.apex.Identifier)
      $.OPTION(() => {
        $.SUBRULE($.typeArgumentsOrOperatorExpressionRest)
      })
    })

    // dimension
    // : '[' expression? ']'
    $.RULE('dimension', () => {
      $.CONSUME(tokens.apex.LSquare)
      $.OPTION(() => $.SUBRULE($.expression))
      $.CONSUME(tokens.apex.RSquare)
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

    // literal
    // : integerLiteral
    // | floatLiteral
    // | CHAR_LITERAL
    // | STRING_LITERAL
    // | BOOL_LITERAL
    // | NULL_LITERAL
    $.RULE('literal', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.integerLiteral) },
        { ALT: () => $.SUBRULE($.floatLiteral) },
        { ALT: () => $.SUBRULE($.stringLiteral) },
        { ALT: () => $.SUBRULE($.booleanLiteral) },
        { ALT: () => $.CONSUME(tokens.apex.Null) },
      ])
    })

    // stringLiteral
    $.RULE('stringLiteral', () => {
      $.CONSUME(tokens.apex.StringLiteral)
    })

    // booleanLiteral
    // : TRUE
    // | FALSE
    $.RULE('booleanLiteral', () => {
      $.OR([{ ALT: () => $.CONSUME(tokens.apex.True) }, { ALT: () => $.CONSUME(tokens.apex.False) }])
    })

    // integerLiteral
    // : DECIMAL_LITERAL
    // | HEX_LITERAL
    // | OCT_LITERAL
    // | BINARY_LITERAL
    $.RULE('integerLiteral', () => {
      $.CONSUME(tokens.apex.DecimalLiteral)
    })

    // floatLiteral
    // : FLOAT_LITERAL
    // | HEX_FLOAT_LITERAL
    $.RULE('floatLiteral', () => {
      $.CONSUME(tokens.apex.FloatLiteral)
    })

    // primitiveType
    // : BOOLEAN
    // | CHAR
    // | BYTE
    // | SHORT
    // | INTEGER
    // | LONG
    // | FLOAT
    // | DOUBLE
    $.RULE('primitiveType', () => {
      $.OR([
        { ALT: () => $.CONSUME(tokens.apex.Boolean) },
        { ALT: () => $.CONSUME(tokens.apex.Char) },
        { ALT: () => $.CONSUME(tokens.apex.Byte) },
        { ALT: () => $.CONSUME(tokens.apex.Short) },
        { ALT: () => $.CONSUME(tokens.apex.Integer) },
        { ALT: () => $.CONSUME(tokens.apex.Long) },
        { ALT: () => $.CONSUME(tokens.apex.Float) },
        { ALT: () => $.CONSUME(tokens.apex.Double) },
        { ALT: () => $.CONSUME(tokens.apex.String) },
      ])
    })

    // semiColon
    // : ';'
    // | ( ';' \n \n )
    $.RULE('semiColon', () => {
      $.OR([
        { ALT: () => $.CONSUME(tokens.apex.SemiColon) },
        { ALT: () => $.CONSUME(tokens.apex.SemiColonWithFollowEmptyLine) },
      ])
    })

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
