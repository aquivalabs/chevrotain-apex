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

  it('typeParameters', () => {
    expect(Parser.parse('class A<B>{}', (parser) => parser.classDeclaration())).toEqual({
      type: 'CLASS_DECLARATION',
      name: {
        type: 'IDENTIFIER',
        value: 'A',
      },
      typeParameters: {
        type: 'TYPE_PARAMETERS',
        list: [
          {
            type: 'TYPE_PARAMETER',
            modifiers: [],
            name: {
              type: 'IDENTIFIER',
              value: 'B',
            },
            typeBound: undefined,
          },
        ],
      },
      extends: undefined,
      implements: undefined,
      body: {
        type: 'CLASS_BODY',
        declarations: [],
      },
    })
  })

  it('extends', () => {
    expect(
      Parser.parse('class A extends boolean{}', (parser) => parser.classDeclaration())
    ).toEqual({
      type: 'CLASS_DECLARATION',
      name: {
        type: 'IDENTIFIER',
        value: 'A',
      },
      typeParameters: undefined,
      extends: {
        type: 'PRIMITIVE_TYPE',
        value: 'boolean',
      },
      implements: undefined,
      body: {
        type: 'CLASS_BODY',
        declarations: [],
      },
    })
  })

  it('implements', () => {
    expect(
      Parser.parse('class A implements boolean{}', (parser) => parser.classDeclaration())
    ).toEqual({
      type: 'CLASS_DECLARATION',
      name: {
        type: 'IDENTIFIER',
        value: 'A',
      },
      typeParameters: undefined,
      extends: undefined,
      implements: {
        type: 'TYPE_LIST',
        list: [
          {
            type: 'PRIMITIVE_TYPE',
            value: 'boolean',
          },
        ],
      },
      body: {
        type: 'CLASS_BODY',
        declarations: [],
      },
    })
  })
})
