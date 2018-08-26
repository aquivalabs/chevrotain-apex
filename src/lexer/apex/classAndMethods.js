const { createKeywordToken } = require('../_shared')

const Instanceof = createKeywordToken({
  name: 'Instanceof',
  pattern: /instanceof/,
  label: "'instanceof'",
})

const Class = createKeywordToken({
  name: 'Class',
  pattern: /class/,
  label: "'class'",
})

const Interface = createKeywordToken({
  name: 'Interface',
  pattern: /interface/,
  label: "'interface'",
})

const Static = createKeywordToken({
  name: 'Static',
  pattern: /static/,
  label: "'static'",
})

const Abstract = createKeywordToken({
  name: 'Abstract',
  pattern: /abstract/,
  label: "'abstract'",
})

const Virtual = createKeywordToken({
  name: 'Virtual',
  pattern: /virtual/,
  label: "'virtual'",
})

const Final = createKeywordToken({
  name: 'Final',
  pattern: /final/,
  label: "'final'",
})

const Transient = createKeywordToken({
  name: 'Transient',
  pattern: /transient/,
  label: "'transient'",
})

const Extends = createKeywordToken({
  name: 'Extends',
  pattern: /extends/,
  label: "'extends'",
})

const Implements = createKeywordToken({
  name: 'Implements',
  pattern: /implements/,
  label: "'implements'",
})

const New = createKeywordToken({
  name: 'New',
  pattern: /new/,
  label: "'new'",
})

const This = createKeywordToken({
  name: 'This',
  pattern: /this/,
  label: "'this'",
})

const Super = createKeywordToken({
  name: 'Super',
  pattern: /super/,
  label: "'super'",
})

const Return = createKeywordToken({
  name: 'Return',
  pattern: /return/,
  label: "'return'",
})

module.exports = {
  Instanceof,
  Interface,
  Class,
  Static,
  Abstract,
  Virtual,
  Final,
  Transient,
  Extends,
  Implements,
  New,
  This,
  Super,
  Return,
}
