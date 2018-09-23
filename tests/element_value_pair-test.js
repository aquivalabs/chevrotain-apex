const Parser = require('../src/index')

describe('elementValuePair', () => {
  it('elementValuePair', () => {
    // FIXME: unsupported syntax
    // expect(Parser.parse('key=@Value', (parser) => parser.elementValuePair())).toEqual({
    expect(Parser.parse('key=true', (parser) => parser.elementValuePair())).toEqual({
      type: 'ELEMENT_VALUE_PAIR',
      key: {
        type: 'IDENTIFIER',
        value: 'key',
      },
      value: {
        type: 'QUALIFIED_NAME',
        type: 'BOOLEAN_LITERAL',
        value: 'true',
      },
    })
  })
})
