const { Identifier, WhiteSpace } = require('../shared')

const soqlBasic = require('./soqlBasic')
const { sharedSymbols } = require('../_shared')

module.exports = {
  WhiteSpace,
  ...soqlBasic,
  Identifier,
  ...sharedSymbols,
}
