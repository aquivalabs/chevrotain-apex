const { createKeywordToken } = require('../_shared')

const Sharing = createKeywordToken({
  name: 'Sharing',
  pattern: /sharing/,
  label: "'sharing'",
})

const With = createKeywordToken({
  name: 'With',
  pattern: /with/,
  label: "'with'",
})

const Without = createKeywordToken({
  name: 'Without',
  pattern: /without/,
  label: "'without'",
})

const Inherit = createKeywordToken({
  name: 'Inherit',
  pattern: /inherit/,
  label: "'inherit'",
})

module.exports = {
  Sharing,
  Without,
  Inherit,
  With,
}
