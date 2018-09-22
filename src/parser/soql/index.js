const { tokens } = require('../../lexer')

function soqlParser($) {
  // queryUnit
  // : [SELECT baseSoqlQuery whereClause?]
  $.RULE('queryUnit', () => {
    $.CONSUME(tokens.soql.Select)
    $.SUBRULE($.baseSoqlQuery)
    $.OPTION(() => $.SUBRULE($.whereClause))
    $.CONSUME(tokens.soql.RSquare)
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
        $.SUBRULE($.identifierName)
      },
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
      { ALT: () => $.CONSUME(tokens.soql.In) },
      { ALT: () => $.CONSUME(tokens.soql.Like) },
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
    $.SUBRULE($.singleWhereCondition)
    $.OPTION(() =>
      $.MANY(() => {
        $.SUBRULE($.andOr)
        $.SUBRULE1($.singleWhereCondition)
      })
    )
  })

  // singleWhereCondition
  // : identifierName comparisonOperator (literal|colonIdentifierName)
  $.RULE('singleWhereCondition', () => {
    $.SUBRULE($.identifierName)
    $.SUBRULE($.comparisonOperator)
    $.OR([
      { ALT: () => $.SUBRULE($.literal) },
      { ALT: () => $.SUBRULE($.colonIdentifierName) },
    ])
  })
}

module.exports = {
  soqlParser,
}
