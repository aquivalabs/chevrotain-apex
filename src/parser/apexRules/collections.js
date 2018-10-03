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
<<<<<<< HEAD
        $.CONSUME(tokens.apex.EqualsGreater)
=======
        $.CONSUME(tokens.apex.KeyValue)
>>>>>>> 113449adc8263323841642f46d005005af13f702
        $.SUBRULE1($.variableInitializer)
      })
      $.MANY({
        GATE: () =>
          $.LA(2).tokenType !== tokens.apex.Comma && $.LA(2).tokenType !== tokens.apex.RCurly,
        DEF: () => {
          $.CONSUME(tokens.apex.Comma)
          $.SUBRULE2($.variableInitializer)
          $.OPTION3(() => {
<<<<<<< HEAD
            $.CONSUME1(tokens.apex.EqualsGreater)
=======
            $.CONSUME1(tokens.apex.KeyValue)
>>>>>>> 113449adc8263323841642f46d005005af13f702
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
