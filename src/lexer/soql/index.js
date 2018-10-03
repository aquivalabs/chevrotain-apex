const { Identifier, WhiteSpace } = require('../_shared')

const soqlBasic = require('./soqlBasic')
const { sharedSymbols, constants } = require('../_shared')

module.exports = {
  WhiteSpace,
  ...soqlBasic,
  ...constants,
  Identifier,
  ...sharedSymbols,
}
