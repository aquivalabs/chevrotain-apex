const Parser = require('../src/index')

describe('interfaceDeclaration', () => {
  it('empty', () => {
    expect(Parser.parse('interface A{}', (parser) => parser.interfaceDeclaration())).toEqual({
      type: 'INTERFACE_DECLARATION',
      name: {
        type: 'IDENTIFIER',
        value: 'A',
      },
      typeParameters: undefined,
      extends: undefined,
      body: {
        type: 'INTERFACE_BODY',
        declarations: [],
      },
    })
  })

  // FIXME: unsupported syntax - you can't extend primitives or standard classes
  it('typeList', () => {
    expect(
      Parser.parse('interface A extends boolean {}', (parser) => parser.interfaceDeclaration())
    ).toEqual({
      type: 'INTERFACE_DECLARATION',
      name: {
        type: 'IDENTIFIER',
        value: 'A',
      },
      typeParameters: undefined,
      extends: {
        type: 'TYPE_LIST',
        list: [
          {
            type: 'PRIMITIVE_TYPE',
            value: 'boolean',
          },
        ],
      },
      body: {
        type: 'INTERFACE_BODY',
        declarations: [],
      },
    })
  })
})
