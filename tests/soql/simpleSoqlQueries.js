const Parser = require("../../src/index");
const { simpleSoqlQueries } = require('./_samples')

describe('simpleSoqlQueries', () => {
  it('basicQuery', () => {
    expect(
      Parser.parse(simpleSoqlQueries.basicQuery, (parser) => parser.queryUnit)
    ).toEqual({})
  })
})
