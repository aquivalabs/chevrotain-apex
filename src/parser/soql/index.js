const { tokens } = require('../../lexer')

function soqlParser($) {
  $.RULE('baseSoqlQuery', () => {
    $.CONSUME(tokens.soql.Select)
    $.CONSUME1(tokens.soql.Identifier)
    $.OPTION(() => {
      $.MANY(() => {
        $.CONSUME2(tokens.soql.Comma)
        $.CONSUME3(tokens.soql.Identifier)
      })
    })
    $.CONSUME4(tokens.soql.From)
    $.CONSUME5(tokens.soql.Identifier)
  })
}

module.exports = {
  soqlParser,
}
