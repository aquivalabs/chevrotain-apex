const Parser = require('../src/index')

describe('typeBound', () => {
  it('single', () => {
    expect(Parser.parse('boolean', (parser) => parser.typeBound())).toEqual({
      type: 'TYPE_BOUND',
      list: [
        {
          type: 'PRIMITIVE_TYPE',
          value: 'boolean',
        },
      ],
    })
  })

  it('multiple', () => {
    expect(Parser.parse('boolean & integer', (parser) => parser.typeBound())).toEqual({
      type: 'TYPE_BOUND',
      list: [
        {
          type: 'PRIMITIVE_TYPE',
          value: 'boolean',
        },
        {
          type: 'PRIMITIVE_TYPE',
          value: 'integer',
        },
      ],
    })
  })
})
