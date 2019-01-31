const { Identifier, WhiteSpace } = require('../_shared')

const soqlBasic = require('./soqlBasic')
const aggregations = require('./aggregations')
const { sharedSymbols, constants } = require('../_shared')

module.exports = {
  WhiteSpace,
  ...soqlBasic,
  ...aggregations,
  ...constants,
  Identifier,
  ...sharedSymbols,
}
