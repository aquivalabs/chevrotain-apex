const Parser = require('../src/index')

describe('constantDeclarationOrInterfaceMethodDeclaration', () => {
  it('interfaceMethodDeclaration: void', () => {
    expect(
      Parser.parse('void a() {}', (parser) =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).toEqual({
      type: 'INTERFACE_METHOD_DECLARATION',
      modifiers: [],
      typeParameters: undefined,
      typeType: {
        type: 'VOID',
      },
      name: {
        type: 'IDENTIFIER',
        value: 'a',
      },
      parameters: {
        type: 'FORMAL_PARAMETERS',
        parameters: [],
      },
      dimensions: [],
      throws: undefined,
      body: {
        type: 'BLOCK',
        statements: [],
      },
    })
  })

  it('interfaceMethodDeclaration: one modifier', () => {
    expect(
      Parser.parse('public void a() {}', (parser) =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).toEqual({
      type: 'INTERFACE_METHOD_DECLARATION',
      modifiers: [{ type: 'MODIFIER', value: 'public' }],
      typeParameters: undefined,
      typeType: {
        type: 'VOID',
      },
      name: {
        type: 'IDENTIFIER',
        value: 'a',
      },
      parameters: {
        type: 'FORMAL_PARAMETERS',
        parameters: [],
      },
      dimensions: [],
      throws: undefined,
      body: {
        type: 'BLOCK',
        statements: [],
      },
    })
  })

  it('interfaceMethodDeclaration: multiple modifier', () => {
    expect(
      Parser.parse('public static void a() {}', (parser) =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).toEqual({
      type: 'INTERFACE_METHOD_DECLARATION',
      modifiers: [{ type: 'MODIFIER', value: 'public' }, { type: 'MODIFIER', value: 'static' }],
      typeParameters: undefined,
      typeType: {
        type: 'VOID',
      },
      name: {
        type: 'IDENTIFIER',
        value: 'a',
      },
      parameters: {
        type: 'FORMAL_PARAMETERS',
        parameters: [],
      },
      dimensions: [],
      throws: undefined,
      body: {
        type: 'BLOCK',
        statements: [],
      },
    })
  })

  it('interfaceMethodDeclaration: single square', () => {
    expect(
      Parser.parse('void a()[] {}', (parser) =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).toEqual({
      type: 'INTERFACE_METHOD_DECLARATION',
      modifiers: [],
      typeParameters: undefined,
      typeType: {
        type: 'VOID',
      },
      name: {
        type: 'IDENTIFIER',
        value: 'a',
      },
      parameters: {
        type: 'FORMAL_PARAMETERS',
        parameters: [],
      },
      dimensions: [
        {
          type: 'DIMENSION',
        },
      ],
      throws: undefined,
      body: {
        type: 'BLOCK',
        statements: [],
      },
    })
  })

  it('interfaceMethodDeclaration: multiple squares', () => {
    expect(
      Parser.parse('void a()[][] {}', (parser) =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).toEqual({
      type: 'INTERFACE_METHOD_DECLARATION',
      modifiers: [],
      typeParameters: undefined,
      typeType: {
        type: 'VOID',
      },
      name: {
        type: 'IDENTIFIER',
        value: 'a',
      },
      parameters: {
        type: 'FORMAL_PARAMETERS',
        parameters: [],
      },
      dimensions: [
        {
          type: 'DIMENSION',
        },
        {
          type: 'DIMENSION',
        },
      ],
      throws: undefined,
      body: {
        type: 'BLOCK',
        statements: [],
      },
    })
  })

  it('constantDeclaration: single declaration', () => {
    expect(
      Parser.parse('boolean A = this;', (parser) =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).toEqual({
      type: 'CONSTANT_DECLARATION',
      typeType: {
        type: 'PRIMITIVE_TYPE',
        value: 'boolean',
      },
      declarators: [
        {
          type: 'CONSTANT_DECLARATOR',
          name: {
            type: 'IDENTIFIER',
            value: 'A',
          },
          dimensions: [],
          init: {
            type: 'THIS',
          },
        },
      ],
      followedEmptyLine: false,
    })
  })

  it('constantDeclaration: mutiple declarations', () => {
    expect(
      Parser.parse('boolean A = this, B = super;', (parser) =>
        parser.constantDeclarationOrInterfaceMethodDeclaration()
      )
    ).toEqual({
      type: 'CONSTANT_DECLARATION',
      typeType: {
        type: 'PRIMITIVE_TYPE',
        value: 'boolean',
      },
      declarators: [
        {
          type: 'CONSTANT_DECLARATOR',
          name: {
            type: 'IDENTIFIER',
            value: 'A',
          },
          dimensions: [],
          init: {
            type: 'THIS',
          },
        },
        {
          type: 'CONSTANT_DECLARATOR',
          name: {
            type: 'IDENTIFIER',
            value: 'B',
          },
          dimensions: [],
          init: {
            type: 'SUPER',
          },
        },
      ],
      followedEmptyLine: false,
    })
  })
})
