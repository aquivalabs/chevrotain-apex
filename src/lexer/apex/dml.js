const { createKeywordToken } = require('../_shared')

const Insert = createKeywordToken({
  name: 'Insert',
  pattern: /insert/,
  label: "'insert'",
})

const Update = createKeywordToken({
  name: 'Update',
  pattern: /update/,
  label: "'update'",
})

const Upsert = createKeywordToken({
  name: 'Upsert',
  pattern: /upsert/,
  label: "'upsert'",
})

const Delete = createKeywordToken({
  name: 'Delete',
  pattern: /delete/,
  label: "'delete'",
})

const Undelete = createKeywordToken({
  name: 'Undelete',
  pattern: /undelete/,
  label: "'undelete'",
})

module.exports = {
  Insert,
  Update,
  Upsert,
  Delete,
  Undelete,
}
