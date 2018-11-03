const Parser = require('../src/index')

// FIXME: lambdas not supported. Maybe we should remove those rules completely
describe('lambdaParameters', () => {
  it('identifier', () => {
    expect(Parser.parse('a', (parser) => parser.lambdaParameters())).toEqual({
      type: 'IDENTIFIER',
      value: 'a',
    })
  })

  it('empty parameters', () => {
    expect(Parser.parse('()', (parser) => parser.lambdaParameters())).toEqual({
      type: 'FORMAL_PARAMETERS',
      parameters: [],
    })
  })

  it('formalParameters', () => {
    expect(Parser.parse('(boolean a)', (parser) => parser.lambdaParameters())).toEqual({
      type: 'FORMAL_PARAMETERS',
      parameters: [
        {
          type: 'FORMAL_PARAMETER',
          modifiers: [],
          dotDotDot: false,
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
        },
      ],
    })
  })

  it('identfiers', () => {
    expect(Parser.parse('(a)', (parser) => parser.lambdaParameters())).toEqual({
      type: 'IDENTIFIERS',
      identifiers: {
        type: 'IDENTIFIER_LIST',
        list: ['a'],
      },
    })
  })
})
