const Parser = require('../src/index')

describe('typeArguments', () => {
  it('single', () => {
    expect(Parser.parse('<boolean>', (parser) => parser.typeArguments())).toEqual({
      type: 'TYPE_ARGUMENTS',
      value: {
        type: 'TYPE_LIST',
        list: [
          {
            type: 'TYPE_ARGUMENT',
            argument: {
              type: 'PRIMITIVE_TYPE',
              value: 'boolean',
            },
            super: undefined,
            extends: undefined,
          },
        ],
      },
    })
  })

  it('multi', () => {
    expect(Parser.parse('<boolean, integer>', (parser) => parser.typeArguments())).toEqual({
      type: 'TYPE_ARGUMENTS',
      value: {
        type: 'TYPE_LIST',
        list: [
          {
            type: 'TYPE_ARGUMENT',
            argument: {
              type: 'PRIMITIVE_TYPE',
              value: 'boolean',
            },
            super: undefined,
            extends: undefined,
          },
          {
            type: 'TYPE_ARGUMENT',
            argument: {
              type: 'PRIMITIVE_TYPE',
              value: 'integer',
            },
            super: undefined,
            extends: undefined,
          },
        ],
      },
    })
  })
})
