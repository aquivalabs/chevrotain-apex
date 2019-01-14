const { tokens } = require('../../lexer')

function soqlParser($) {
  // queryUnit
  // : [SELECT baseSoqlQuery whereClause?]
  $.RULE('queryUnit', () => {
    $.CONSUME(tokens.soql.LSquareSelect)
    $.SUBRULE($.baseSoqlQuery)
    $.OPTION(() => $.SUBRULE($.whereClause))
    $.OPTION1(() => $.SUBRULE($.groupByClause))
    $.OPTION2(() => $.SUBRULE($.orderByClause))
    $.OPTION8(() => $.SUBRULE($.limitClause))
    $.OPTION9(() => $.SUBRULE($.offsetClause))
    $.CONSUME(tokens.soql.RSquare)
  })

  // subquery
  // : (SELECT baseSoqlQuery whereClause?)
  $.RULE('subquery', () => {
    $.CONSUME(tokens.soql.LBrace)
    $.CONSUME(tokens.soql.Select)
    $.SUBRULE($.baseSoqlQuery)
    $.OPTION(() => $.SUBRULE($.whereClause))
    $.OPTION1(() => $.SUBRULE($.groupByClause))
    $.OPTION2(() => $.SUBRULE($.orderByClause))
    $.OPTION8(() => $.SUBRULE($.limitClause))
    $.OPTION9(() => $.SUBRULE($.offsetClause))
    $.CONSUME(tokens.soql.RBrace)
  })

  // baseSoqlQuery
  // : listOfFields FROM tokens.Identifier
  $.RULE('baseSoqlQuery', () => {
    $.SUBRULE($.listOfFields)
    $.CONSUME(tokens.soql.From)
    $.CONSUME2(tokens.soql.Identifier)
  })

  // listOfFields
  // : identifierName (, identifierName)*
  $.RULE('listOfFields', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: tokens.apex.Comma,
      DEF: () => {
        $.OR([
          { ALT: () => $.SUBRULE($.subquery) },
          { ALT: () => $.SUBRULE($.aggregationFunction) },
          { ALT: () => $.SUBRULE($.identifierName) },
        ])
      },
    })
  })

  $.RULE('aggregationFunction', () => {
    $.SUBRULE($.aggregationFunctionName)
    $.CONSUME(tokens.soql.LBrace)
    $.SUBRULE($.identifierName)
    $.CONSUME1(tokens.soql.RBrace)
    // alias available for aggregation functions
    $.OPTION(() => {
      $.CONSUME(tokens.apex.Identifier)
    })
  })

  // comparisonOperator
  // : GreaterEquals
  // | LessEquals
  // | ExclamationmarkEquals
  // | Equals
  // | Greater
  // | Less
  // | In
  // | Like
  $.RULE('comparisonOperator', () => {
    $.OR([
      { ALT: () => $.CONSUME(tokens.soql.GreaterEquals) },
      { ALT: () => $.CONSUME(tokens.soql.LessEquals) },
      { ALT: () => $.CONSUME(tokens.soql.ExclamationmarkEquals) },
      { ALT: () => $.CONSUME(tokens.soql.Equals) },
      { ALT: () => $.CONSUME(tokens.soql.Greater) },
      { ALT: () => $.CONSUME(tokens.soql.Less) },
      { ALT: () => {
          $.OPTION(() => $.CONSUME(tokens.soql.Not))
          $.CONSUME(tokens.soql.In)
        }
      },
      { ALT: () => $.CONSUME1(tokens.soql.Like) },
    ])
  })

  $.RULE('aggregationFunctionName', () => {
    $.OR([
      { ALT: () => $.CONSUME(tokens.soql.CountDistinct)},
      { ALT: () => $.CONSUME(tokens.soql.Count)},
      { ALT: () => $.CONSUME(tokens.soql.Avg)},
      { ALT: () => $.CONSUME(tokens.soql.Min)},
      { ALT: () => $.CONSUME(tokens.soql.Max)},
      { ALT: () => $.CONSUME(tokens.soql.Sum)},
    ])
  })

  // andOr
  // : (AND | OR)
  $.RULE('andOr', () => {
    $.OR([
      { ALT: () => $.CONSUME(tokens.soql.And) },
      { ALT: () => $.CONSUME(tokens.soql.Or) },
    ])
  })

  // colomIdentifierName
  // : :identifierNameElement ('.' identifierNameElement)*
  $.RULE('colonIdentifierName', () => {
    $.CONSUME(tokens.soql.Colon)
    $.SUBRULE($.identifierName)
  })

  // whereClause
  // : WHERE singleWhereCondition (andOr singleWhereCondition)*
  $.RULE('whereClause', () => {
    $.CONSUME(tokens.soql.Where)
    let lBrackets = 0
    $.OPTION(() =>
      $.MANY(() => {
        $.CONSUME(tokens.soql.LBrace)
        lBrackets++
      })
    )
    $.SUBRULE($.singleWhereCondition)
    if (lBrackets > 0) {
      $.OPTION1(() => {
        $.CONSUME2(tokens.soql.RBrace)
        lBrackets--
      })
    }
    $.OPTION2(() =>
      $.MANY1(() => {
        $.SUBRULE($.andOr)
        $.OPTION3(() => {
          $.MANY2(() => {
            $.CONSUME1(tokens.soql.LBrace)
            lBrackets++
          })
        })
        $.SUBRULE1($.singleWhereCondition)
        if (lBrackets > 0) {
          $.OPTION4(() => {
            $.MANY3(() => {
              $.CONSUME(tokens.soql.RBrace)
              lBrackets--
            })
          })
        }
      })
    )

    if (lBrackets > 0) {
      for (let i = 0; i < lBrackets; i++) {
        $.CONSUME1(tokens.soql.RBrace)
      }
    }
  })

  // singleWhereCondition
  // : identifierName comparisonOperator (literal|colonIdentifierName)
  $.RULE('singleWhereCondition', () => {
    $.OPTION(() => $.CONSUME(tokens.soql.Not))
    $.SUBRULE($.identifierName)
    $.SUBRULE($.comparisonOperator)

    $.OR1([
      { ALT: () => $.SUBRULE($.subquery) },
      { ALT: () => $.SUBRULE($.literal) },
      { ALT: () => $.SUBRULE($.colonIdentifierName) },
      {
        ALT: () => {
          $.CONSUME3(tokens.apex.LBrace)
          $.SUBRULE($.literalList)
          $.CONSUME3(tokens.apex.RBrace)
        },
      },
    ])
  })

  // orderBy
  // : ORDER BY
  $.RULE('orderBy', () => {
    $.CONSUME(tokens.soql.Order)
    $.CONSUME(tokens.soql.By)
  })

  // groupBy
  // : GROUP BY
  $.RULE('groupBy', () => {
    $.CONSUME(tokens.soql.Group)
    $.CONSUME(tokens.soql.By)
  })

  // nullsOrder
  // : NULLS (FIRST|LAST)
  $.RULE('nullsOrder', () => {
    $.CONSUME(tokens.soql.Nulls)
    $.OR([
      { ALT: () => $.CONSUME(tokens.soql.First) },
      { ALT: () => $.CONSUME(tokens.soql.Last) },
    ])
  })

  // orderByClause
  // : identifierName comparisonOperator (literal|colonIdentifierName)
  $.RULE('orderByClause', () => {
    $.SUBRULE($.orderBy)
    $.SUBRULE($.listOfFields)
    $.OPTION(() =>
      $.OR([
        { ALT: () => $.CONSUME(tokens.soql.Asc) },
        { ALT: () => $.CONSUME(tokens.soql.Desc) },
      ])
    )
    $.OPTION1(() => {
      $.SUBRULE($.nullsOrder)
    })
  })

  // limitClause
  // : LIMIT comparisonOperator (literal|colonIdentifierName)
  $.RULE('limitClause', () => {
    $.CONSUME(tokens.soql.Limit)
    $.SUBRULE($.integerLiteral)
  })

  // havingClause
  // : identifierName comparisonOperator (literal|colonIdentifierName)
  $.RULE('havingClause', () => {
    $.CONSUME(tokens.soql.Having)
    $.SUBRULE($.singleWhereCondition)
  })

  // groupByClause
  // : identifierName comparisonOperator (literal|colonIdentifierName)
  $.RULE('groupByClause', () => {
    $.SUBRULE($.groupBy)
    $.SUBRULE($.listOfFields)
    $.OPTION(() => {
      $.SUBRULE($.havingClause)
    })
  })

  // offsetClause
  // : OFFSET comparisonOperator (literal|colonIdentifierName)
  $.RULE('offsetClause', () => {
    $.CONSUME(tokens.soql.Offset)
    $.SUBRULE($.integerLiteral)
  })
}

module.exports = {
  soqlParser,
}
