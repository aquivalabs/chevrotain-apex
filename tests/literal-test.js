const Parser = require('../src/index')

describe('literal', () => {
  it('integerLiteral: positive', () => {
    expect(Parser.parse('10', (parser) => parser.literal())).toEqual({
      type: 'DECIMAL_LITERAL',
      value: '10',
    })
  })

  it('integerLiteral: negative', () => {
    expect(Parser.parse('-10', (parser) => parser.literal())).toEqual({
      type: 'DECIMAL_LITERAL',
      value: '-10',
    })
  })

  // FIXME: wrong type, should be DOUBLE_LITERAL
  it('floatLiteral: positive', () => {
    expect(Parser.parse('0.1', (parser) => parser.literal())).toEqual({
      type: 'FLOAT_LITERAL',
      value: '0.1',
    })
  })

  it('floatLiteral: negative', () => {
    expect(Parser.parse('-0.1', (parser) => parser.literal())).toEqual({
      type: 'FLOAT_LITERAL',
      value: '-0.1',
    })
  })

  it('stringLiteral: colon', () => {
    expect(Parser.parse("':'", (parser) => parser.literal())).toEqual({
      type: 'STRING_LITERAL',
      value: "':'",
    })
  })

  it('stringLiteral: t', () => {
    expect(Parser.parse("'\t'", (parser) => parser.literal())).toEqual({
      type: 'STRING_LITERAL',
      value: "'\\t'",
    })
  })
  it('stringLiteral: n', () => {
    expect(Parser.parse("'\n'", (parser) => parser.literal())).toEqual({
      type: 'STRING_LITERAL',
      value: "'\\n'",
    })
  })
  it('stringLiteral: r', () => {
    expect(Parser.parse("'\r'", (parser) => parser.literal())).toEqual({
      type: 'STRING_LITERAL',
      value: "'\\r'",
    })
  })
  it('stringLiteral: f', () => {
    expect(Parser.parse("'\f'", (parser) => parser.literal())).toEqual({
      type: 'STRING_LITERAL',
      value: "'\\f'",
    })
  })
  // FIXME: these are not parsed right
  it("stringLiteral: '", () => {
    expect(Parser.parse("'\''", (parser) => parser.literal())).toEqual({
      type: 'STRING_LITERAL',
      value: "'\\''",
    })
  })
  it('stringLiteral: \\', () => {
    expect(Parser.parse("'\\'", (parser) => parser.literal())).toEqual({
      type: 'STRING_LITERAL',
      value: "'\\\\'",
    })
  })

  // TODO unicode not supported
  // it("stringLiteral: unicode", () => {
  //   expect(Parser.parse("'\uFFFF'", parser => parser.literal())).toEqual({
  //     type: "STRING_LITERAL",
  //     value: "'\\uFFFF'"
  //   });
  // });

  it('stringLiteral', () => {
    expect(Parser.parse("'A'", (parser) => parser.literal())).toEqual({
      type: 'STRING_LITERAL',
      value: "'A'",
    })
  })

  it('booleanLiteral', () => {
    expect(Parser.parse('true', (parser) => parser.literal())).toEqual({
      type: 'BOOLEAN_LITERAL',
      value: 'true',
    })
  })

  it('nullLiteral', () => {
    expect(Parser.parse('null', (parser) => parser.literal())).toEqual({
      type: 'NULL',
    })
  })
})
