const { tokens } = require('../../lexer')

function expressions($) {
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

  // identifierOrIdentifierWithTypeArgumentsOrOperatorExpression
  $.RULE('identifierOrIdentifierWithTypeArgumentsOrOperatorExpression', () => {
    $.CONSUME(tokens.apex.Identifier)
    $.OPTION(() => {
      $.SUBRULE($.typeArgumentsOrOperatorExpressionRest)
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

  // dimension
  // : '[' expression? ']'
  $.RULE('dimension', () => {
    $.CONSUME(tokens.apex.LSquare)
    $.OPTION(() => $.SUBRULE($.expression))
    $.CONSUME(tokens.apex.RSquare)
  })
}

module.exports = {
  expressions,
}
