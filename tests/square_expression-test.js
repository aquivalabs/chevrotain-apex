const Parser = require('../src/index')

describe('squareExpressionRest', () => {
  it('squareExpression', () => {
    expect(Parser.parse('[super]', (parser) => parser.squareExpressionRest())).toEqual({
      type: 'SQUARE_EXPRESSION_REST',
      expression: {
        type: 'SUPER',
      },
    })
  })
})
