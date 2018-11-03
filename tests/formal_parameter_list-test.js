const Parser = require('../src/index')

describe('formalParameterList', () => {
  it('one formalParameter', () => {
    expect(Parser.parse('boolean a', (parser) => parser.formalParameterList())).toEqual([
      {
        type: 'FORMAL_PARAMETER',
        modifiers: [],
        typeType: {
          type: 'PRIMITIVE_TYPE',
          value: 'boolean',
        },
        dotDotDot: false,
        id: {
          type: 'VARIABLE_DECLARATOR_ID',
          id: {
            type: 'IDENTIFIER',
            value: 'a',
          },
          dimensions: [],
        },
      },
    ])
  })

  it('multiple formalParameters', () => {
    expect(Parser.parse('boolean a, boolean b', (parser) => parser.formalParameterList())).toEqual([
      {
        type: 'FORMAL_PARAMETER',
        modifiers: [],
        typeType: {
          type: 'PRIMITIVE_TYPE',
          value: 'boolean',
        },
        dotDotDot: false,
        id: {
          type: 'VARIABLE_DECLARATOR_ID',
          id: {
            type: 'IDENTIFIER',
            value: 'a',
          },
          dimensions: [],
        },
      },
      {
        type: 'FORMAL_PARAMETER',
        modifiers: [],
        typeType: {
          type: 'PRIMITIVE_TYPE',
          value: 'boolean',
        },
        dotDotDot: false,
        id: {
          type: 'VARIABLE_DECLARATOR_ID',
          id: {
            type: 'IDENTIFIER',
            value: 'b',
          },
          dimensions: [],
        },
      },
    ])
  })
})
