const { createKeywordToken } = require('../_shared')

const Public = createKeywordToken({
  name: 'Public',
  pattern: /public/,
  label: "'public'",
})

const Protected = createKeywordToken({
  name: 'Protected',
  pattern: /protected/,
  label: "'protected'",
})

const Private = createKeywordToken({
  name: 'Private',
  pattern: /private/,
  label: "'private'",
})

module.exports = {
  Public,
  Protected,
  Private,
}
