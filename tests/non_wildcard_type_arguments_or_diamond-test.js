const Parser = require('../src/index')

describe('nonWildcardTypeArgumentsOrDiamond', () => {
  it('nonWildcardTypeArguments', () => {
    expect(
      Parser.parse('<boolean>', (parser) => parser.nonWildcardTypeArgumentsOrDiamond())
    ).toEqual({
      type: 'TYPE_ARGUMENTS',
      value: {
        type: 'TYPE_LIST',
        list: [
          {
            type: 'PRIMITIVE_TYPE',
            value: 'boolean',
          },
        ],
      },
    })
  })

  // FIXME: unsupportedd syntax
  it('emptyDiamond', () => {
    expect(Parser.parse('<>', (parser) => parser.nonWildcardTypeArgumentsOrDiamond())).toEqual({
      type: 'TYPE_ARGUMENTS',
      value: undefined,
    })
  })
})
