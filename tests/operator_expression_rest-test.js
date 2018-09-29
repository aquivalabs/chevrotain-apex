const Parser = require('../src/index')

describe('operatorExpressionRest', () => {
  it('Star', () => {
    expect(Parser.parse('*super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '*',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('Dash', () => {
    expect(Parser.parse('/super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '/',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('Plus', () => {
    expect(Parser.parse('+super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '+',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('Minus', () => {
    expect(Parser.parse('-super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '-',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('LessEquals', () => {
    expect(Parser.parse('<=super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '<=',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('GreaterEquals', () => {
    expect(Parser.parse('>=super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '>=',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('Greater', () => {
    expect(Parser.parse('>super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '>',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('Less', () => {
    expect(Parser.parse('<super', (parser) => parser.operatorExpressionRest())).toEqual({
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

  it('EqualsEquals', () => {
    expect(Parser.parse('==super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '==',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('ExclamationmarkEquals', () => {
    expect(Parser.parse('!=super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '!=',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('And', () => {
    expect(Parser.parse('&super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '&',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('|', () => {
    expect(Parser.parse('|super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '|',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('AndAnd', () => {
    expect(Parser.parse('&&super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '&&',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('OrOr', () => {
    expect(Parser.parse('||super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '||',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('Equals', () => {
    expect(Parser.parse('=super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '=',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('PlusEquals', () => {
    expect(Parser.parse('+=super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '+=',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('MinusEquals', () => {
    expect(Parser.parse('-=super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '-=',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('StarEquals', () => {
    expect(Parser.parse('*=super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '*=',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('DashEquals', () => {
    expect(Parser.parse('/=super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '/=',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('AndEquals', () => {
    expect(Parser.parse('&=super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '&=',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('OrEquals', () => {
    expect(Parser.parse('|=super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '|=',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })

  it('PercentageEquals', () => {
    expect(Parser.parse('%=super', (parser) => parser.operatorExpressionRest())).toEqual({
      type: 'OPERATOR_EXPRESSION_REST',
      operator: {
        type: 'OPERATOR',
        operator: '%=',
      },
      expression: {
        type: 'SUPER',
      },
    })
  })
})
