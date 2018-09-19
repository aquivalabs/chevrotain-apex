const { createToken, sharedSymbols } = require('../_shared')

const LCurly = createToken({
  name: 'LCurly',
  // using a string literal to get around a bug in regexp-to-ast
  // so lexer optimizations can be enabled.
  pattern: '{',
  label: "'{'",
})

const RCurly = createToken({
  name: 'RCurly',
  pattern: /}/,
  label: "'}'",
})

const EqualsEquals = createToken({
  name: 'EqualsEquals',
  pattern: /==/,
  label: "'=='",
})

const Minus = createToken({
  name: 'Minus',
  pattern: /-/,
  label: "'-'",
})

const MinusEquals = createToken({
  name: 'MinusEquals',
  pattern: /-=/,
  label: "'-='",
})

const MinusMinus = createToken({
  name: 'MinusMinus',
  pattern: /--/,
  label: "'--'",
})

const Plus = createToken({
  name: 'Plus',
  pattern: /\+/,
  label: "'+'",
})

const PlusEquals = createToken({
  name: 'PlusEquals',
  pattern: /\+=/,
  label: "'+='",
})

const PlusPlus = createToken({
  name: 'PlusPlus',
  pattern: /\+\+/,
  label: "'++'",
})

const And = createToken({
  name: 'And',
  pattern: /&/,
  label: "'&'",
})

const AndAnd = createToken({
  name: 'AndAnd',
  pattern: /&&/,
  label: "'&&'",
})

const AndEquals = createToken({
  name: 'AndEquals',
  pattern: /&=/,
  label: "'&='",
})

const At = createToken({
  name: 'At',
  pattern: /@/,
  label: "'@'",
})

const Questionmark = createToken({
  name: 'Questionmark',
  pattern: /\?/,
  label: "'?'",
})

const Exclamationmark = createToken({
  name: 'Exclamationmark',
  pattern: /!/,
  label: "'!'",
})

const Or = createToken({
  name: 'Or',
  pattern: /\|/,
  label: "'|'",
})

const OrEquals = createToken({
  name: 'OrEquals',
  pattern: /\|=/,
  label: "'|='",
})

const OrOr = createToken({
  name: 'OrOr',
  pattern: /\|\|/,
  label: "'||'",
})

const Star = createToken({
  name: 'Star',
  pattern: /\*/,
  label: "'*'",
})

const StarEquals = createToken({
  name: 'StarEquals',
  pattern: /\*=/,
  label: "'*='",
})

const Dash = createToken({
  name: 'Dash',
  pattern: /\//,
  label: "'/'",
})

const DashEquals = createToken({
  name: 'DashEquals',
  pattern: /\/=/,
  label: "'/='",
})

module.exports = {
  EqualsEquals,
  PlusPlus,
  PlusEquals,
  Plus,
  MinusMinus,
  MinusEquals,
  Minus,
  AndAnd,
  AndEquals,
  And,
  OrOr,
  OrEquals,
  Or,
  LCurly,
  RCurly,
  ...sharedSymbols,
  At,
  StarEquals,
  Star,
  DashEquals,
  Dash,
  Questionmark,
  Exclamationmark,
}
