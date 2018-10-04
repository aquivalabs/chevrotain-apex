const Parser = require('../src/index')

describe('fieldDeclaration', () => {
  it('simple', () => {
    expect(Parser.parse('Abc def;', (parser) => parser.fieldDeclaration())).toEqual({
      type: 'FIELD_DECLARATION',
      typeType: {
        type: 'IDENTIFIER',
        value: 'Abc',
      },
      variableDeclarators: {
        type: 'VARIABLE_DECLARATORS',
        list: [
          {
            type: 'VARIABLE_DECLARATOR',
            id: {
              type: 'VARIABLE_DECLARATOR_ID',
              id: {
                type: 'IDENTIFIER',
                value: 'def',
              },
              dimensions: [],
            },
            init: undefined,
          },
        ],
      },
      followedEmptyLine: false,
    })
  })
})
