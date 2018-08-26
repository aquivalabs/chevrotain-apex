const { Identifier, WhiteSpace } = require('../_shared')

const soqlBasic = require('./soqlBasic')
const { sharedSymbols } = require('../_shared')

module.exports = {
  WhiteSpace,
  ...soqlBasic,
  Identifier,
  ...sharedSymbols,
}
