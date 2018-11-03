const Parser = require('../src/index')

describe('typeArgument', () => {
  it('primitiveType', () => {
    expect(Parser.parse('boolean', (parser) => parser.typeArgument())).toEqual({
      type: 'TYPE_ARGUMENT',
      argument: {
        type: 'PRIMITIVE_TYPE',
        value: 'boolean',
      },
      super: undefined,
      extends: undefined,
    })
  })

  it('questionmark', () => {
    expect(Parser.parse('?', (parser) => parser.typeArgument())).toEqual({
      type: 'TYPE_ARGUMENT',
      argument: {
        type: 'QUESTIONMARK',
      },
      super: undefined,
      extends: undefined,
    })
  })

  it('primitiveType extends primitiveType', () => {
    expect(Parser.parse('boolean extends someType', (parser) => parser.typeArgument())).toEqual({
      type: 'TYPE_ARGUMENT',
      argument: {
        type: 'PRIMITIVE_TYPE',
        value: 'boolean',
      },
      super: undefined,
      extends: {
        type: 'IDENTIFIER',
        value: 'someType',
      },
    })
  })

  it('primitiveType super primitiveType', () => {
    expect(Parser.parse('boolean super someType', (parser) => parser.typeArgument())).toEqual({
      type: 'TYPE_ARGUMENT',
      argument: {
        type: 'PRIMITIVE_TYPE',
        value: 'boolean',
      },
      super: {
        type: 'IDENTIFIER',
        value: 'someType',
      },
      extends: undefined,
    })
  })

  it('questionmark extends primitiveType', () => {
    expect(Parser.parse('? extends integer', (parser) => parser.typeArgument())).toEqual({
      type: 'TYPE_ARGUMENT',
      argument: {
        type: 'QUESTIONMARK',
      },
      super: undefined,
      extends: {
        type: 'PRIMITIVE_TYPE',
        value: 'integer',
      },
    })
  })

  it('questionmark super primitiveType', () => {
    expect(Parser.parse('? super integer', (parser) => parser.typeArgument())).toEqual({
      type: 'TYPE_ARGUMENT',
      argument: {
        type: 'QUESTIONMARK',
      },
      super: {
        type: 'PRIMITIVE_TYPE',
        value: 'integer',
      },
      extends: undefined,
    })
  })
})
