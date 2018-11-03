const Parser = require('../src/index')

describe('instanceofExpressionRest', () => {
  it('simple', () => {
    expect(
      Parser.parse('instanceof boolean', (parser) => parser.instanceofExpressionRest())
    ).toEqual({
      type: 'INSTANCEOF_EXPRESSION_REST',
      typeType: {
        type: 'PRIMITIVE_TYPE',
        value: 'boolean',
      },
    })
  })

  it('with following operator expression', () => {
    expect(
      Parser.parse('instanceof boolean && true', (parser) => parser.instanceofExpressionRest())
    ).toEqual({
      type: 'INSTANCEOF_EXPRESSION_REST',
      typeType: {
        type: 'PRIMITIVE_TYPE',
        value: 'boolean',
      },
      operatorExpressionRest: {
        type: 'OPERATOR_EXPRESSION_REST',
        operator: {
          type: 'OPERATOR',
          operator: '&&',
        },
        expression: {
          type: 'BOOLEAN_LITERAL',
          value: 'true',
        },
      },
    })
  })

  it('with following operator expressions', () => {
    expect(
      Parser.parse('instanceof boolean && true && false', (parser) =>
        parser.instanceofExpressionRest()
      )
    ).toEqual({
      type: 'INSTANCEOF_EXPRESSION_REST',
      typeType: {
        type: 'PRIMITIVE_TYPE',
        value: 'boolean',
      },
      operatorExpressionRest: {
        type: 'OPERATOR_EXPRESSION_REST',
        operator: {
          type: 'OPERATOR',
          operator: '&&',
        },
        expression: {
          type: 'OPERATOR_EXPRESSION',
          left: {
            type: 'BOOLEAN_LITERAL',
            value: 'true',
          },
          operator: {
            type: 'OPERATOR',
            operator: '&&',
          },
          right: {
            type: 'BOOLEAN_LITERAL',
            value: 'false',
          },
        },
      },
    })
  })

  it('with following operator expressions and instanceof', () => {
    expect(
      Parser.parse('instanceof boolean && true && false && i instanceof Integer', (parser) =>
        parser.instanceofExpressionRest()
      )
    ).toEqual({
      type: 'INSTANCEOF_EXPRESSION_REST',
      typeType: {
        type: 'PRIMITIVE_TYPE',
        value: 'boolean',
      },
      operatorExpressionRest: {
        type: 'OPERATOR_EXPRESSION_REST',
        operator: {
          type: 'OPERATOR',
          operator: '&&',
        },
        expression: {
          type: 'OPERATOR_EXPRESSION',
          left: {
            type: 'BOOLEAN_LITERAL',
            value: 'true',
          },
          operator: {
            type: 'OPERATOR',
            operator: '&&',
          },
          right: {
            type: 'OPERATOR_EXPRESSION',
            left: {
              type: 'BOOLEAN_LITERAL',
              value: 'false',
            },
            operator: {
              type: 'OPERATOR',
              operator: '&&',
            },
            right: {
              type: 'INSTANCEOF_EXPRESSION',
              expression: {
                type: 'IDENTIFIER',
                value: 'i',
              },
              instanceof: {
                type: 'PRIMITIVE_TYPE',
                value: 'integer',
              },
            },
          },
        },
      },
    })
  })
})
