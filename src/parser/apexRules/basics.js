const { tokens } = require('../../lexer')

function basics($) {
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
                        GATE: () => $.LA(2).tokenType !== tokens.apex.Class,
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
      GATE: () => $.LA(2).tokenType !== tokens.apex.RBrace,
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

  // explicitGenericInvocation
  // : nonWildcardTypeArguments explicitGenericInvocationSuffix
  $.RULE('explicitGenericInvocation', () => {
    $.SUBRULE($.nonWildcardTypeArguments)
    $.SUBRULE($.explicitGenericInvocationSuffix)
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
}

module.exports = {
  basics,
}
