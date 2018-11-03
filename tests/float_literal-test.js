const Parser = require('../src/index')

describe('floatLiteral', () => {
  // FIXME: wrong type, should be DOUBLE_LITERAL
  it('floatLiteral', () => {
    expect(Parser.parse('0.1', (parser) => parser.floatLiteral())).toEqual({
      type: 'FLOAT_LITERAL',
      value: '0.1',
    })
  })
})
