const { tokens } = require('../../lexer')

function collections($) {
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

  // arrayOrMapInitializer
  // : '{' (variableInitializer (',' variableInitializer)* (',')? )? '}'
  $.RULE('arrayOrMapInitializer', () => {
    $.CONSUME(tokens.apex.LCurly)
    $.OPTION(() => {
      $.SUBRULE($.variableInitializer)
      $.OPTION1(() => {
        $.CONSUME(tokens.apex.KeyValue)
        $.SUBRULE1($.variableInitializer)
      })
      $.MANY({
        GATE: () =>
          $.LA(2).tokenType !== tokens.apex.Comma && $.LA(2).tokenType !== tokens.apex.RCurly,
        DEF: () => {
          $.CONSUME(tokens.apex.Comma)
          $.SUBRULE2($.variableInitializer)
          $.OPTION3(() => {
            $.CONSUME1(tokens.apex.KeyValue)
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
}

module.exports = {
  collections,
}
