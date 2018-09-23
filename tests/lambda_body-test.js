const Parser = require('../src/index')

// FIXME: lambdas not supported. Maybe we should remove those rules completely
describe('lambdaBody', () => {
  it('block', () => {
    expect(Parser.parse('{}', (parser) => parser.lambdaBody())).toEqual({
      type: 'BLOCK',
      statements: [],
    })
  })

  it('expression', () => {
    expect(Parser.parse('this', (parser) => parser.lambdaBody())).toEqual({
      type: 'THIS',
    })
  })
})
