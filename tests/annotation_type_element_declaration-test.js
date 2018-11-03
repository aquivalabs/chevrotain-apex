const Parser = require('../src/index')

describe('annotationTypeElementDeclaration', () => {
  it('without modifiers', () => {
    expect(
      Parser.parse('class A{}', (parser) => parser.annotationTypeElementDeclaration())
    ).toEqual({
      type: 'ANNOTATION_TYPE_ELEMENT_DECLARATION',
      modifiers: [],
      declaration: {
        type: 'CLASS_DECLARATION',
        name: {
          type: 'IDENTIFIER',
          value: 'A',
        },
        body: {
          type: 'CLASS_BODY',
          declarations: [],
        },
      },
    })
  })

  it('modifiers', () => {
    expect(
      Parser.parse('transient class A{}', (parser) =>
        parser.annotationTypeElementDeclaration()
      )
    ).toEqual({
      type: 'ANNOTATION_TYPE_ELEMENT_DECLARATION',
      modifiers: [{ type: 'MODIFIER', value: 'transient' }],
      declaration: {
        type: 'CLASS_DECLARATION',
        name: {
          type: 'IDENTIFIER',
          value: 'A',
        },
        body: {
          type: 'CLASS_BODY',
          declarations: [],
        },
      },
    })
  })
})
