const Parser = require('../src/index')

describe('interfaceMethodDeclaration', () => {
  it('void', () => {
    expect(Parser.parse('void a() {}', (parser) => parser.interfaceMethodDeclaration())).toEqual({
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

  it('one modifier', () => {
    expect(
      Parser.parse('public void a() {}', (parser) => parser.interfaceMethodDeclaration())
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

  it('multiple modifier', () => {
    expect(
      Parser.parse('public static void a() {}', (parser) => parser.interfaceMethodDeclaration())
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

  it('single square', () => {
    expect(Parser.parse('void a()[] {}', (parser) => parser.interfaceMethodDeclaration())).toEqual({
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

  it('multiple squares', () => {
    expect(
      Parser.parse('void a()[][] {}', (parser) => parser.interfaceMethodDeclaration())
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
})
