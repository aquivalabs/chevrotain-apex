const { tokens } = require('../../lexer')

function soqlParser($) {
  $.RULE('baseSoqlQuery', () => {
    $.CONSUME(tokens.soql.Select)
    $.CONSUME(tokens.soql.Identifier)
    $.OPTION(() => {
      $.MANY(() => {
        $.CONSUME(tokens.soql.Comma)
        $.CONSUME1(tokens.soql.Identifier)
      })
    })
    $.CONSUME(tokens.soql.From)
    $.CONSUME2(tokens.soql.Identifier)
    $.CONSUME(tokens.soql.RSquare)
  })
}

module.exports = {
  soqlParser,
}
