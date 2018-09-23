const Parser = require('../src/index')

describe('annotation', () => {
  it('annotation', () => {
    expect(Parser.parse('@Bean', (parser) => parser.annotation())).toEqual({
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

  it('annotation with braces', () => {
    expect(Parser.parse('@Bean()', (parser) => parser.annotation())).toEqual({
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
      hasBraces: true,
      values: undefined,
    })
  })

  it('annotation with element value (annotation)', () => {
    expect(Parser.parse('@Bean(@Something)', (parser) => parser.annotation())).toEqual({
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
      hasBraces: true,
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

  it('annotation with element value (elementValueArrayInitializer)', () => {
    expect(Parser.parse('@Bean({@Something})', (parser) => parser.annotation())).toEqual({
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
      hasBraces: true,
      values: [
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
        },
      ],
    })
  })

  it('annotation with element value pairs', () => {
    expect(Parser.parse('@Bean(key=true)', (parser) => parser.annotation())).toEqual({
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
      hasBraces: true,
      values: [
        {
          type: 'ELEMENT_VALUE_PAIR',
          key: {
            type: 'IDENTIFIER',
            value: 'key',
          },
          value: {
            type: 'BOOLEAN_LITERAL',
            value: 'true',
          },
        },
      ],
    })
  })

  // FIXME: verify this syntax is not supported in apex
  // it('annotation with element value pair with array initialization', () => {
  //   expect(Parser.parse('@Bean(key={"Abc"})', (parser) => parser.annotation())).toEqual({
  //     type: 'ANNOTATION',
  //     name: {
  //       type: 'QUALIFIED_NAME',
  //       name: [
  //         {
  //           type: 'IDENTIFIER',
  //           value: 'Bean',
  //         },
  //       ],
  //     },
  //     hasBraces: true,
  //     values: [
  //       {
  //         type: 'ELEMENT_VALUE_PAIR',
  //         key: {
  //           type: 'IDENTIFIER',
  //           value: 'key',
  //         },
  //         value: {
  //           type: 'ELEMENT_VALUE_ARRAY_INITIALIZER',
  //           values: [
  //             {
  //               type: 'STRING_LITERAL',
  //               value: '"Abc"',
  //             },
  //           ],
  //         },
  //       },
  //     ],
  //   })
  // })

  // FIXME: verify this syntax is not supported in apex
  // it('annotation with element value pairs with array initializations', () => {
  //   expect(
  //     Parser.parse('@Bean(key={"Abc"}, key2={"Def"})', (parser) => parser.annotation())
  //   ).toEqual({
  //     type: 'ANNOTATION',
  //     name: {
  //       type: 'QUALIFIED_NAME',
  //       name: [
  //         {
  //           type: 'IDENTIFIER',
  //           value: 'Bean',
  //         },
  //       ],
  //     },
  //     hasBraces: true,
  //     values: [
  //       {
  //         type: 'ELEMENT_VALUE_PAIR',
  //         key: {
  //           type: 'IDENTIFIER',
  //           value: 'key',
  //         },
  //         value: {
  //           type: 'ELEMENT_VALUE_ARRAY_INITIALIZER',
  //           values: [
  //             {
  //               type: 'STRING_LITERAL',
  //               value: '"Abc"',
  //             },
  //           ],
  //         },
  //       },
  //       {
  //         type: 'ELEMENT_VALUE_PAIR',
  //         key: {
  //           type: 'IDENTIFIER',
  //           value: 'key2',
  //         },
  //         value: {
  //           type: 'ELEMENT_VALUE_ARRAY_INITIALIZER',
  //           values: [
  //             {
  //               type: 'STRING_LITERAL',
  //               value: '"Def"',
  //             },
  //           ],
  //         },
  //       },
  //     ],
  //   })
  // })
})
