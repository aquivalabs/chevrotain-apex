const Parser = require('../src/index')

describe('typeArgumentsOrOperatorExpressionRest', () => {
  it('single', () => {
    expect(
      Parser.parse('<boolean>', (parser) => parser.typeArgumentsOrOperatorExpressionRest())
    ).toEqual({
      type: 'TYPE_ARGUMENTS',
      value: {
        type: 'TYPE_LIST',
        list: [
          {
            type: 'TYPE_ARGUMENT',
            argument: {
              type: 'PRIMITIVE_TYPE',
              value: 'boolean',
            },
            super: undefined,
            extends: undefined,
          },
        ],
      },
    })
  })

  it('multi', () => {
    expect(
      Parser.parse('<boolean, integer>', (parser) => parser.typeArgumentsOrOperatorExpressionRest())
    ).toEqual({
      type: 'TYPE_ARGUMENTS',
      value: {
        type: 'TYPE_LIST',
        list: [
          {
            type: 'TYPE_ARGUMENT',
            argument: {
              type: 'PRIMITIVE_TYPE',
              value: 'boolean',
            },
            super: undefined,
            extends: undefined,
          },
          {
            type: 'TYPE_ARGUMENT',
            argument: {
              type: 'PRIMITIVE_TYPE',
              value: 'integer',
            },
            super: undefined,
            extends: undefined,
          },
        ],
      },
    })
  })

  it('operatorExpression Less', () => {
    expect(
      Parser.parse('< array.length', (parser) => parser.typeArgumentsOrOperatorExpressionRest())
    ).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '<',
      },
      expression: {
        type: 'TYPE_ARGUMENT',
        argument: {
          type: 'CLASS_OR_INTERFACE_TYPE',
          elements: [
            {
              type: 'IDENTIFIER',
              value: 'array',
            },
            {
              type: 'IDENTIFIER',
              value: 'length',
            },
          ],
        },
        extends: undefined,
        super: undefined,
      },
    })
  })

  it('operatorExpression Less with typeArgument as method', () => {
    expect(
      Parser.parse('< size()', (parser) => parser.typeArgumentsOrOperatorExpressionRest())
    ).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '<',
      },
      expression: {
        type: 'METHOD_INVOCATION',
        name: {
          type: 'IDENTIFIER',
          value: 'size',
        },
        parameters: undefined,
        dimensions: [],
      },
    })
  })

  it('operatorExpression Less with typeArgument as method and dimensions', () => {
    expect(
      Parser.parse('< size()[0]', (parser) => parser.typeArgumentsOrOperatorExpressionRest())
    ).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '<',
      },
      expression: {
        type: 'METHOD_INVOCATION',
        name: {
          type: 'IDENTIFIER',
          value: 'size',
        },
        parameters: undefined,
        dimensions: [
          {
            type: 'DIMENSION',
            expression: {
              type: 'DECIMAL_LITERAL',
              value: '0',
            },
          },
        ],
      },
    })
  })

  it('operatorExpression Less with typeArgument as method and parameters', () => {
    expect(
      Parser.parse('< size(this)', (parser) => parser.typeArgumentsOrOperatorExpressionRest())
    ).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '<',
      },
      expression: {
        type: 'METHOD_INVOCATION',
        name: {
          type: 'IDENTIFIER',
          value: 'size',
        },
        parameters: {
          list: [
            {
              type: 'THIS',
            },
          ],
          type: 'EXPRESSION_LIST',
        },
        dimensions: [],
      },
    })
  })

  it('operatorExpression Less with qualifiedNameExpression as method', () => {
    expect(
      Parser.parse('< list.size()', (parser) => parser.typeArgumentsOrOperatorExpressionRest())
    ).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '<',
      },
      expression: {
        type: 'QUALIFIED_EXPRESSION',
        expression: {
          type: 'IDENTIFIER',
          value: 'list',
        },
        rest: {
          type: 'METHOD_INVOCATION',
          name: {
            type: 'IDENTIFIER',
            value: 'size',
          },
          parameters: undefined,
          dimensions: [],
        },
      },
    })
  })

  it('operatorExpression Less with number', () => {
    expect(Parser.parse('< 3', (parser) => parser.typeArgumentsOrOperatorExpressionRest())).toEqual(
      {
        type: 'OPERATOR_EXPRESSION_REST',
        operator: {
          type: 'OPERATOR',
          operator: '<',
        },
        expression: {
          type: 'DECIMAL_LITERAL',
          value: '3',
        },
      }
    )
  })

  it('operatorExpression Less with this', () => {
    expect(
      Parser.parse('< this', (parser) => parser.typeArgumentsOrOperatorExpressionRest())
    ).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '<',
      },
      expression: {
        type: 'THIS',
      },
    })
  })

  it('operatorExpression Less with super', () => {
    expect(
      Parser.parse('< super', (parser) => parser.typeArgumentsOrOperatorExpressionRest())
    ).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '<',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })
})
