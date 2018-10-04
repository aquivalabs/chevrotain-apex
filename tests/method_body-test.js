const Parser = require('../src/index')

describe('methodBody', () => {
  it('block', () => {
    expect(Parser.parse('{}', (parser) => parser.methodBody())).toEqual({
      type: 'BLOCK',
      statements: [],
    })
  })

  it('semiColon', () => {
    expect(Parser.parse(';', (parser) => parser.methodBody())).toEqual(undefined)
  })

  it('charLiteral', () => {
    expect(
      Parser.parse(
        "{\nif (message.indexOf('h') > 0) {}\ninteger destination = message.indexOf('d');\n}",
        (parser) => parser.methodBody()
      )
    ).toEqual({
      type: 'BLOCK',
      statements: [
        {
          type: 'IF_STATEMENT',
          condition: {
            type: 'OPERATOR_EXPRESSION',
            left: {
              type: 'QUALIFIED_EXPRESSION',
              expression: {
                type: 'IDENTIFIER',
                value: 'message',
              },
              rest: {
                type: 'METHOD_INVOCATION',
                name: {
                  type: 'IDENTIFIER',
                  value: 'indexOf',
                },
                parameters: {
                  list: [
                    {
                      type: 'STRING_LITERAL',
                      value: "'h'",
                    },
                  ],
                  type: 'EXPRESSION_LIST',
                },
                dimensions: [],
              },
            },
            operator: {
              type: 'OPERATOR',
              operator: '>',
            },
            right: {
              type: 'DECIMAL_LITERAL',
              value: '0',
            },
          },
          body: {
            statements: [],
            type: 'BLOCK',
          },
          else: undefined,
        },
        {
          type: 'EXPRESSION_STATEMENT',
          expression: {
            type: 'LOCAL_VARIABLE_DECLARATION',
            modifiers: [],
            typeType: { type: 'PRIMITIVE_TYPE', value: 'integer' },
            declarators: {
              type: 'VARIABLE_DECLARATORS',
              list: [
                {
                  type: 'VARIABLE_DECLARATOR',
                  id: {
                    type: 'VARIABLE_DECLARATOR_ID',
                    dimensions: [],
                    id: { type: 'IDENTIFIER', value: 'destination' },
                  },
                  init: {
                    type: 'QUALIFIED_EXPRESSION',
                    expression: { type: 'IDENTIFIER', value: 'message' },
                    rest: {
                      dimensions: [],
                      name: { type: 'IDENTIFIER', value: 'indexOf' },
                      parameters: {
                        list: [
                          {
                            type: 'STRING_LITERAL',
                            value: "'d'",
                          },
                        ],
                        type: 'EXPRESSION_LIST',
                      },
                      type: 'METHOD_INVOCATION',
                    },
                  },
                },
              ],
            },
          },
          followedEmptyLine: false,
        },
      ],
    })
  })
})
