const Parser = require('../src/index')

describe('variableDeclarators', () => {
  it('single', () => {
    expect(Parser.parse('A', (parser) => parser.variableDeclarators())).toEqual({
      type: 'VARIABLE_DECLARATORS',
      list: [
        {
          type: 'VARIABLE_DECLARATOR',
          id: {
            type: 'VARIABLE_DECLARATOR_ID',
            id: {
              type: 'IDENTIFIER',
              value: 'A',
            },
            dimensions: [],
          },
          init: undefined,
        },
      ],
    })
  })

  it('multiple', () => {
    expect(Parser.parse('A, B', (parser) => parser.variableDeclarators())).toEqual({
      type: 'VARIABLE_DECLARATORS',
      list: [
        {
          type: 'VARIABLE_DECLARATOR',
          id: {
            type: 'VARIABLE_DECLARATOR_ID',
            id: {
              type: 'IDENTIFIER',
              value: 'A',
            },
            dimensions: [],
          },
          init: undefined,
        },
        {
          type: 'VARIABLE_DECLARATOR',
          id: {
            type: 'VARIABLE_DECLARATOR_ID',
            id: {
              type: 'IDENTIFIER',
              value: 'B',
            },
            dimensions: [],
          },
          init: undefined,
        },
      ],
    })
  })
})
