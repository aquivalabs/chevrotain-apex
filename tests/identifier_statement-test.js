const Parser = require('../src/index')

describe('identifierStatement', () => {
  // FIXME: unsupported syntax
  it('simple', () => {
    expect(Parser.parse('a:this;', (parser) => parser.identifierStatement())).toEqual({
      type: 'IDENTIFIER_STATEMENT',
      identifier: {
        type: 'IDENTIFIER',
        value: 'a',
      },
      statement: {
        type: 'EXPRESSION_STATEMENT',
        expression: {
          type: 'THIS',
        },
        followedEmptyLine: false,
      },
    })
  })
})
