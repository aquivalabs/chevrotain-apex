const { Identifier, WhiteSpace } = require('../_shared')

const soqlBasic = require('./soqlBasic')
const functions = require('./functions')
const aggregations = require('./aggregations')
const dateLiterals = require('./dateLiterals')
const { sharedSymbols, constants } = require('../_shared')

module.exports = {
  WhiteSpace,
  ...dateLiterals,
  ...functions,
  ...soqlBasic,
  ...aggregations,
  ...constants,
  Identifier,
  ...sharedSymbols,
}
