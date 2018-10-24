const { createKeywordToken } = require('../_shared')

const ToLabel = createKeywordToken({
  name: 'TOLABEL',
  pattern: /TOLABEL/,
  label: "'TOLABEL'",
})
module.exports = {
  ToLabel,
}
