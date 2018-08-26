const { createKeywordToken } = require('../_shared')

const Count = createKeywordToken({
  name: 'COUNT',
  pattern: /COUNT/,
  label: "'COUNT'",
})

const Group = createKeywordToken({
  name: 'GROUP',
  pattern: /GROUP/,
  label: "'GROUP'",
})

module.exports = {
  Count,
  Group,
}
