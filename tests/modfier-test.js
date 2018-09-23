const Parser = require('../src/index')

describe('modifier', () => {
  it('transient', () => {
    expect(Parser.parse('transient', (parser) => parser.modifier())).toEqual({
      type: 'MODIFIER',
      value: 'transient',
    })
  })

  it('public', () => {
    expect(Parser.parse('public', (parser) => parser.modifier())).toEqual({
      type: 'MODIFIER',
      value: 'public',
    })
  })

  it('protected', () => {
    expect(Parser.parse('protected', (parser) => parser.modifier())).toEqual({
      type: 'MODIFIER',
      value: 'protected',
    })
  })
})
