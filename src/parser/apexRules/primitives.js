const { tokens } = require('../../lexer')

function primitives($) {
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

  // literalList
  // : literal (',' literal)*
  $.RULE('literalList', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: tokens.apex.Comma,
      DEF: () => {
        $.SUBRULE($.literal)
      },
    })
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
  // semiColon
  // : ';'
  // | ( ';' \n \n )
  $.RULE('semiColon', () => {
    $.OR([
      { ALT: () => $.CONSUME(tokens.apex.SemiColon) },
      { ALT: () => $.CONSUME(tokens.apex.SemiColonWithFollowEmptyLine) },
    ])
  })
}

module.exports = {
  primitives,
}
