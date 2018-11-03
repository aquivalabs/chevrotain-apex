const Parser = require('../src/index')

describe('integerLiteral', () => {
  it('decimalLiteral', () => {
    expect(Parser.parse('10', (parser) => parser.integerLiteral())).toEqual({
      type: 'DECIMAL_LITERAL',
      value: '10',
    })
  })
})
