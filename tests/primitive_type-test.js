const Parser = require('../src/index')

describe('primitiveType', () => {
  it('boolean', () => {
    expect(Parser.parse('boolean', (parser) => parser.primitiveType())).toEqual({
      type: 'PRIMITIVE_TYPE',
      value: 'boolean',
    })
  })

  it('integer', () => {
    expect(Parser.parse('integer', (parser) => parser.primitiveType())).toEqual({
      type: 'PRIMITIVE_TYPE',
      value: 'integer',
    })
  })

  it('long', () => {
    expect(Parser.parse('long', (parser) => parser.primitiveType())).toEqual({
      type: 'PRIMITIVE_TYPE',
      value: 'long',
    })
  })

  it('double', () => {
    expect(Parser.parse('double', (parser) => parser.primitiveType())).toEqual({
      type: 'PRIMITIVE_TYPE',
      value: 'double',
    })
  })
})
