const Parser = require('../src/index')

describe('empty', () => {
  it('empty', () => {
    expect(Parser.parse('()', (parser) => parser.formalParameters())).toEqual({
      type: 'FORMAL_PARAMETERS',
      parameters: [],
    })
  })

  it('parameter', () => {
    expect(Parser.parse('(boolean a)', (parser) => parser.formalParameters())).toEqual({
      type: 'FORMAL_PARAMETERS',
      parameters: [
        {
          type: 'FORMAL_PARAMETER',
          modifiers: [],
          typeType: {
            type: 'PRIMITIVE_TYPE',
            value: 'boolean',
          },
          id: {
            type: 'VARIABLE_DECLARATOR_ID',
            id: {
              type: 'IDENTIFIER',
              value: 'a',
            },
            dimensions: [],
          },
          dotDotDot: false,
        },
      ],
    })
  })
})
