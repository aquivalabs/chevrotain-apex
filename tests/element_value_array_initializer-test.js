const Parser = require('../src/index')

describe('elementValueArrayInitializer', () => {
  it('single', () => {
    expect(Parser.parse('{@Something}', (parser) => parser.elementValueArrayInitializer())).toEqual(
      {
        type: 'ELEMENT_VALUE_ARRAY_INITIALIZER',
        values: [
          {
            type: 'ANNOTATION',
            name: {
              type: 'QUALIFIED_NAME',
              name: [
                {
                  type: 'IDENTIFIER',
                  value: 'Something',
                },
              ],
            },
            hasBraces: false,
            values: undefined,
          },
        ],
      }
    )
  })

  it('multiple', () => {
    expect(
      Parser.parse('{@Something, @Another}', (parser) => parser.elementValueArrayInitializer())
    ).toEqual({
      type: 'ELEMENT_VALUE_ARRAY_INITIALIZER',
      values: [
        {
          type: 'ANNOTATION',
          name: {
            type: 'QUALIFIED_NAME',
            name: [
              {
                type: 'IDENTIFIER',
                value: 'Something',
              },
            ],
          },
          hasBraces: false,
          values: undefined,
        },
        {
          type: 'ANNOTATION',
          name: {
            type: 'QUALIFIED_NAME',
            name: [
              {
                type: 'IDENTIFIER',
                value: 'Another',
              },
            ],
          },
          hasBraces: false,
          values: undefined,
        },
      ],
    })
  })
  it('comma at the end', () => {
    expect(
      Parser.parse('{@Something,}', (parser) => parser.elementValueArrayInitializer())
    ).toEqual({
      type: 'ELEMENT_VALUE_ARRAY_INITIALIZER',
      values: [
        {
          type: 'ANNOTATION',
          name: {
            type: 'QUALIFIED_NAME',
            name: [
              {
                type: 'IDENTIFIER',
                value: 'Something',
              },
            ],
          },
          hasBraces: false,
          values: undefined,
        },
      ],
    })
  })
})
