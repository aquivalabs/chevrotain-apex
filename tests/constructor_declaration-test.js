const Parser = require('../src/index')

describe('constructorDeclaration', () => {
  it('simple', () => {
    expect(Parser.parse('a() {}', (parser) => parser.constructorDeclaration())).toEqual({
      type: 'CONSTRUCTOR_DECLARATION',
      name: {
        type: 'IDENTIFIER',
        value: 'a',
      },
      parameters: {
        type: 'FORMAL_PARAMETERS',
        parameters: [],
      },
      throws: undefined,
      body: {
        type: 'BLOCK',
        statements: [],
      },
    })
  })
})
