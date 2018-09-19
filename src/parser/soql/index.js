const { tokens } = require('../../lexer')

function soqlParser($) {
  $.RULE('baseSoqlQuery', () => {
    $.CONSUME(tokens.soql.Select)
    $.SUBRULE($.listOfFields)
    $.CONSUME(tokens.soql.From)
    $.CONSUME2(tokens.soql.Identifier)
    $.CONSUME(tokens.soql.RSquare)
  })

  $.RULE('listOfFields', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: tokens.apex.Comma,
      DEF: () => {
        $.SUBRULE($.identifierName)
      },
    })
  })

}

module.exports = {
  soqlParser,
}
