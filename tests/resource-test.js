const Parser = require('../src/index')

describe('resource', () => {
  it('simple', () => {
    expect(Parser.parse('A.B a = this', (parser) => parser.resource())).toEqual({
      type: 'RESOURCE',
      modifiers: [],
      typeType: {
        type: 'CLASS_OR_INTERFACE_TYPE',
        elements: [
          {
            type: 'IDENTIFIER',
            value: 'A',
          },
          {
            type: 'IDENTIFIER',
            value: 'B',
          },
        ],
      },
      id: {
        type: 'VARIABLE_DECLARATOR_ID',
        id: {
          type: 'IDENTIFIER',
          value: 'a',
        },
        dimensions: [],
      },
      expression: {
        type: 'THIS',
      },
    })
  })

  it('one annotation', () => {
    expect(Parser.parse('final A.B a = this', (parser) => parser.resource())).toEqual({
      type: 'RESOURCE',
      modifiers: [{ type: 'MODIFIER', value: 'final' }],
      typeType: {
        type: 'CLASS_OR_INTERFACE_TYPE',
        elements: [
          {
            type: 'IDENTIFIER',
            value: 'A',
          },
          {
            type: 'IDENTIFIER',
            value: 'B',
          },
        ],
      },
      id: {
        type: 'VARIABLE_DECLARATOR_ID',
        id: {
          type: 'IDENTIFIER',
          value: 'a',
        },
        dimensions: [],
      },
      expression: {
        type: 'THIS',
      },
    })
  })

  it('multiple annotations', () => {
    expect(Parser.parse('@Bean final A.B a = this', (parser) => parser.resource())).toEqual({
      type: 'RESOURCE',
      modifiers: [
        {
          type: 'ANNOTATION',
          name: {
            type: 'QUALIFIED_NAME',
            name: [
              {
                type: 'IDENTIFIER',
                value: 'Bean',
              },
            ],
          },
          hasBraces: false,
          values: undefined,
        },
        { type: 'MODIFIER', value: 'final' },
      ],
      typeType: {
        type: 'CLASS_OR_INTERFACE_TYPE',
        elements: [
          {
            type: 'IDENTIFIER',
            value: 'A',
          },
          {
            type: 'IDENTIFIER',
            value: 'B',
          },
        ],
      },
      id: {
        type: 'VARIABLE_DECLARATOR_ID',
        id: {
          type: 'IDENTIFIER',
          value: 'a',
        },
        dimensions: [],
      },
      expression: {
        type: 'THIS',
      },
    })
  })
})
