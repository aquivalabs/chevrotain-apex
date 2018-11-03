const Parser = require('../src/index')

describe('interfaceMethodModifier', () => {
  it('public', () => {
    expect(Parser.parse('public', (parser) => parser.interfaceMethodModifier())).toEqual({
      type: 'MODIFIER',
      value: 'public',
    })
  })

  // TODO: check if interfaces support protected modifier
  // it("protected", () => {
  //   expect(
  //     Parser.parse("protected", parser => parser.interfaceMethodModifier())
  //   ).toEqual({
  //     type: "MODIFIER",
  //     value: "protected"
  //   });
  // });

  it('static', () => {
    expect(Parser.parse('static', (parser) => parser.interfaceMethodModifier())).toEqual({
      type: 'MODIFIER',
      value: 'static',
    })
  })

  it('abstract', () => {
    expect(Parser.parse('abstract', (parser) => parser.interfaceMethodModifier())).toEqual({
      type: 'MODIFIER',
      value: 'abstract',
    })
  })

  it('annotation', () => {
    expect(Parser.parse('@Bean', (parser) => parser.interfaceMethodModifier())).toEqual({
      type: 'ANNOTATION',
      name: {
        type: 'QUALIFIED_NAME',
        name: [
          {
            type: 'IDENTIFIER',
            value: 'Bean',
          },
        ],
      },
      hasBraces: false,
    })
  })
})
