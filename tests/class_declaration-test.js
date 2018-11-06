const Parser = require('../src/index')

describe('classDeclaration', () => {
  it('empty', () => {
    expect(Parser.parse('class A{}', (parser) => parser.classDeclaration())).toEqual({
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
    })
  })

  it('with sharing class', () => {
    expect(Parser.parse('with sharing class A{}', (parser) => parser.typeDeclaration())).toEqual({
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
      modifiers: [
        {
          type: 'MODIFIER',
          value: 'with sharing',
        },
      ],
      type: 'TYPE_DECLARATION',
    })
  })
})
