const Parser = require('../src/index')

describe('methodDeclaration', () => {
  it('void', () => {
    expect(Parser.parse('void a() {}', (parser) => parser.methodDeclaration())).toEqual({
      type: 'METHOD_DECLARATION',
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

  it('special method name', () => {
    expect(
      Parser.parse('void create_a_range_from_$_to_$() {}', (parser) => parser.methodDeclaration())
    ).toEqual({
      type: 'METHOD_DECLARATION',
      typeType: {
        type: 'VOID',
      },
      name: {
        type: 'IDENTIFIER',
        value: 'create_a_range_from_$_to_$',
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

  it('typeParameter', () => {
    expect(Parser.parse('boolean a() {}', (parser) => parser.methodDeclaration())).toEqual({
      type: 'METHOD_DECLARATION',
      typeType: {
        type: 'PRIMITIVE_TYPE',
        value: 'boolean',
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
    expect(Parser.parse('void a()[] {}', (parser) => parser.methodDeclaration())).toEqual({
      type: 'METHOD_DECLARATION',
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
    expect(Parser.parse('void a()[][] {}', (parser) => parser.methodDeclaration())).toEqual({
      type: 'METHOD_DECLARATION',
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
