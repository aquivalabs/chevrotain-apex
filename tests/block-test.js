const Parser = require('../src/index')

describe('block', () => {
  it('empty', () => {
    expect(Parser.parse('{}', (parser) => parser.block())).toEqual({
      type: 'BLOCK',
      statements: [],
    })
  })

  it('single statement', () => {
    expect(Parser.parse('{ boolean A; }', (parser) => parser.block())).toEqual({
      type: 'BLOCK',
      statements: [
        {
          type: 'EXPRESSION_STATEMENT',
          expression: {
            type: 'LOCAL_VARIABLE_DECLARATION',
            modifiers: [],
            typeType: {
              type: 'PRIMITIVE_TYPE',
              value: 'boolean',
            },
            declarators: {
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
            },
          },
          followedEmptyLine: false,
        },
      ],
    })
  })

  it('multiple statement', () => {
    expect(Parser.parse('{ boolean A; class A {} }', (parser) => parser.block())).toEqual({
      type: 'BLOCK',
      statements: [
        {
          type: 'EXPRESSION_STATEMENT',
          expression: {
            type: 'LOCAL_VARIABLE_DECLARATION',
            modifiers: [],
            typeType: {
              type: 'PRIMITIVE_TYPE',
              value: 'boolean',
            },
            declarators: {
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
            },
          },
          followedEmptyLine: false,
        },
        {
          type: 'LOCAL_TYPE_DECLARATION',
          modifiers: [],
          declaration: {
            type: 'CLASS_DECLARATION',
            name: {
              type: 'IDENTIFIER',
              value: 'A',
            },
            typeParameters: undefined,
            extends: undefined,
            implements: undefined,
            body: {
              type: 'CLASS_BODY',
              declarations: [],
            },
          },
        },
      ],
    })
  })

  it('this()', () => {
    expect(Parser.parse('{ this(); }', (parser) => parser.block())).toEqual({
      type: 'BLOCK',
      statements: [
        {
          type: 'EXPRESSION_STATEMENT',
          expression: {
            type: 'THIS',
            arguments: {
              type: 'EXPRESSION_LIST',
              list: [],
            },
          },
          followedEmptyLine: false,
        },
      ],
    })
  })

  it("System.debug('please work')", () => {
    expect(Parser.parse("{ System.debug('please work'); }", (parser) => parser.block())).toEqual({
      type: 'BLOCK',
      statements: [
        {
          type: 'EXPRESSION_STATEMENT',
          expression: {
            type: 'QUALIFIED_EXPRESSION',
            expression: {
              type: 'IDENTIFIER',
              value: 'System',
            },
            rest: {
              type: 'METHOD_INVOCATION',
              name: {
                type: 'IDENTIFIER',
                value: 'debug',
              },
              parameters: {
                type: 'EXPRESSION_LIST',
                list: [
                  {
                    type: 'STRING_LITERAL',
                    value: "'please work'",
                  },
                ],
              },
              dimensions: [],
            },
          },
          followedEmptyLine: false,
        },
      ],
    })
  })

  it("System.debug('please work'); this();", () => {
    expect(
      Parser.parse("{ System.debug('please work'); this(); }", (parser) => parser.block())
    ).toEqual({
      type: 'BLOCK',
      statements: [
        {
          type: 'EXPRESSION_STATEMENT',
          expression: {
            type: 'QUALIFIED_EXPRESSION',
            expression: {
              type: 'IDENTIFIER',
              value: 'System',
            },
            rest: {
              type: 'METHOD_INVOCATION',
              name: {
                type: 'IDENTIFIER',
                value: 'debug',
              },
              parameters: {
                type: 'EXPRESSION_LIST',
                list: [
                  {
                    type: 'STRING_LITERAL',
                    value: "'please work'",
                  },
                ],
              },
              dimensions: [],
            },
          },
          followedEmptyLine: false,
        },
        {
          type: 'EXPRESSION_STATEMENT',
          expression: {
            type: 'THIS',
            arguments: {
              type: 'EXPRESSION_LIST',
              list: [],
            },
          },
          followedEmptyLine: false,
        },
      ],
    })
  })

  it("this(); System.debug('please work')", () => {
    expect(
      Parser.parse("{ this(); System.debug('please work'); }", (parser) => parser.block())
    ).toEqual({
      type: 'BLOCK',
      statements: [
        {
          type: 'EXPRESSION_STATEMENT',
          expression: {
            type: 'THIS',
            arguments: {
              type: 'EXPRESSION_LIST',
              list: [],
            },
          },
          followedEmptyLine: false,
        },
        {
          type: 'EXPRESSION_STATEMENT',
          expression: {
            type: 'QUALIFIED_EXPRESSION',
            expression: {
              type: 'IDENTIFIER',
              value: 'System',
            },
            rest: {
              type: 'METHOD_INVOCATION',
              name: {
                type: 'IDENTIFIER',
                value: 'debug',
              },
              parameters: {
                type: 'EXPRESSION_LIST',
                list: [
                  {
                    type: 'STRING_LITERAL',
                    value: "'please work'",
                  },
                ],
              },
              dimensions: [],
            },
          },
          followedEmptyLine: false,
        },
      ],
    })
  })

  it('line comment standalone', () => {
    expect(Parser.parse('{\n// comment\n\n }', (parser) => parser.block())).toEqual({
      type: 'BLOCK',
      statements: [
        {
          type: 'COMMENT_STANDALONE',
          value: '// comment',
        },
      ],
    })
  })

  it('line comment', () => {
    expect(Parser.parse('{\n// comment\n }', (parser) => parser.block())).toEqual({
      type: 'BLOCK',
      statements: [
        {
          type: 'COMMENT_STANDALONE',
          value: '// comment',
        },
      ],
    })
  })
})
