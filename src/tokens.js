'use strict'
const chevrotain = require('chevrotain')
const xregexp = require('xregexp')

// A little mini DSL for easier lexer definition using xRegExp.
const fragments = {}

function FRAGMENT(name, def) {
  fragments[name] = xregexp.build(def, fragments)
}

function MAKE_PATTERN(def, flags) {
  return xregexp.build(def, fragments, flags)
}

// The order of fragments definitions is important
FRAGMENT('Digits', '[0-9]([0-9_]*[0-9])?')
FRAGMENT('ExponentPart', '[eE][+-]?{{Digits}}')
FRAGMENT('HexDigit', '[0-9a-fA-F]')
FRAGMENT('HexDigits', "{{HexDigit}}(({{HexDigit}}|'_')*{{HexDigit}})?")

const createToken = chevrotain.createToken

const Identifier = createToken({
  name: 'Identifier',
  pattern: /[a-zA-Z_\\$][a-zA-Z_\\$0-9]*/,
})

function createKeywordToken(options) {
  options.longer_alt = Identifier
  return createToken(options)
}

const Get = createKeywordToken({
  name: 'Get',
  pattern: /get/,
  label: "'get'",
})

const Set = createKeywordToken({
  name: 'Set',
  pattern: /set/,
  label: "'set'",
})

const Catch = createKeywordToken({
  name: 'Catch',
  pattern: /catch/,
  label: "'catch'",
})

const Finally = createKeywordToken({
  name: 'Finally',
  pattern: /finally/,
  label: "'finally'",
})

const Boolean = createKeywordToken({
  name: 'Boolean',
  pattern: /Boolean/,
  label: "'Boolean'",
})

const Char = createKeywordToken({
  name: 'Char',
  pattern: /Char/,
  label: "'Char'",
})

const Byte = createKeywordToken({
  name: 'Byte',
  pattern: /Byte/,
  label: "'Byte'",
})

const Short = createKeywordToken({
  name: 'Short',
  pattern: /Short/,
  label: "'Short'",
})

const Integer = createKeywordToken({
  name: 'Integer',
  pattern: /Integer/,
  label: "'Integer'",
})

const Long = createKeywordToken({
  name: 'Long',
  pattern: /Long/,
  label: "'Long'",
})

const Float = createKeywordToken({
  name: 'Float',
  pattern: /Float/,
  label: "'Float'",
})

const Double = createKeywordToken({
  name: 'Double',
  pattern: /Double/,
  label: "'Double'",
})

const String = createKeywordToken({
  name: 'String',
  pattern: /String/,
  label: "'String'",
})

const Select = createKeywordToken({
  name: 'SELECT',
  pattern: /SELECT/,
  label: "'SELECT'",
})

const From = createKeywordToken({
  name: 'FROM',
  pattern: /FROM/,
  label: "'FROM'",
})

const Where = createKeywordToken({
  name: 'WHERE',
  pattern: /WHERE/,
  label: "'WHERE'",
})

const Limit = createKeywordToken({
  name: 'LIMIT',
  pattern: /LIMIT/,
  label: "'LIMIT'",
})

const Group = createKeywordToken({
  name: 'GROUP',
  pattern: /GROUP/,
  label: "'GROUP'",
})

const Order = createKeywordToken({
  name: 'ORDER',
  pattern: /ORDER/,
  label: "'ORDER'",
})

const By = createKeywordToken({
  name: 'BY',
  pattern: /BY/,
  label: "'BY'",
})

const Count = createKeywordToken({
  name: 'COUNT',
  pattern: /COUNT/,
  label: "'COUNT'",
})

const In = createKeywordToken({
  name: 'IN',
  pattern: /IN/,
  label: "'IN'",
})

const Void = createKeywordToken({
  name: 'Void',
  pattern: /void/,
  label: "'void'",
})

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

const Throw = createKeywordToken({
  name: 'Throw',
  pattern: /throw/,
  label: "'throw'",
})

const Return = createKeywordToken({
  name: 'Return',
  pattern: /return/,
  label: "'return'",
})

const Break = createKeywordToken({
  name: 'Break',
  pattern: /break/,
  label: "'break'",
})

const Continue = createKeywordToken({
  name: 'Continue',
  pattern: /continue/,
  label: "'continue'",
})

const If = createKeywordToken({
  name: 'If',
  pattern: /if/,
  label: "'if'",
})

const Else = createKeywordToken({
  name: 'Else',
  pattern: /else/,
  label: "'else'",
})

const While = createKeywordToken({
  name: 'While',
  pattern: /while/,
  label: "'while'",
})

const Do = createKeywordToken({
  name: 'Do',
  pattern: /do/,
  label: "'do'",
})

const Try = createKeywordToken({
  name: 'Try',
  pattern: /try/,
  label: "'try'",
})

const Switch = createKeywordToken({
  name: 'Switch',
  pattern: /switch/,
  label: "'switch'",
})

const For = createKeywordToken({
  name: 'For',
  pattern: /for/,
  label: "'for'",
})

const True = createKeywordToken({
  name: 'True',
  pattern: /true/,
  label: "'true'",
})

const False = createKeywordToken({
  name: 'False',
  pattern: /false/,
  label: "'false'",
})

const Null = createKeywordToken({
  name: 'Null',
  pattern: /null/,
  label: "'null'",
})

const Assert = createKeywordToken({
  name: 'Assert',
  pattern: /assert/,
  label: "'assert'",
})

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

const Enum = createKeywordToken({
  name: 'Enum',
  pattern: /enum/,
  label: "'enum'",
})

const Interface = createKeywordToken({
  name: 'Interface',
  pattern: /interface/,
  label: "'interface'",
})

const LBrace = createToken({
  name: 'LBrace',
  pattern: /\(/,
  label: "'('",
})

const RBrace = createToken({
  name: 'RBrace',
  pattern: /\)/,
  label: "')'",
})

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

const LSquare = createToken({
  name: 'LSquare',
  pattern: /\[/,
  label: "'['",
})

const RSquare = createToken({
  name: 'RSquare',
  pattern: /]/,
  label: "']'",
})

const Less = createToken({
  name: 'Less',
  pattern: /</,
  label: "'<'",
})

const LessEquals = createToken({
  name: 'LessEquals',
  pattern: /<=/,
  label: "'<='",
})

const Greater = createToken({
  name: 'Greater',
  pattern: />/,
  label: "'>'",
})

const GreaterEquals = createToken({
  name: 'GreaterEquals',
  pattern: />=/,
  label: "'>='",
})

const Dot = createToken({
  name: 'Dot',
  pattern: /\./,
  label: "'.'",
})

const Comma = createToken({
  name: 'Comma',
  pattern: /,/,
  label: "','",
})

const SemiColonWithFollowEmptyLine = createToken({
  name: 'SemiColonWithFollowEmptyLine',
  pattern: /;[ \t]*(\r\n|\r[^\n]|\n)[ \t]*(\r\n|\r|\n)/,
  label: "';'",
  line_breaks: true,
})

const SemiColon = createToken({
  name: 'SemiColon',
  pattern: /;/,
  label: "';'",
})

const Colon = createToken({
  name: 'Colon',
  pattern: /:/,
  label: "':'",
})

const Equals = createToken({
  name: 'Equals',
  pattern: /=/,
  label: "'='",
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

const FloatLiteral = createToken({
  name: 'FloatLiteral',
  pattern: MAKE_PATTERN(
    '-?({{Digits}}\\.{{Digits}}?|\\.{{Digits}}){{ExponentPart}}?[fFdD]?|{{Digits}}({{ExponentPart}}[fFdD]?|[fFdD])'
  ),
  label: "'FloatLiteral'",
})

const DecimalLiteral = createToken({
  name: 'DecimalLiteral',
  pattern: MAKE_PATTERN('-?(0|[1-9]({{Digits}}?|_+{{Digits}}))[lL]?'),
  label: "'DecimalLiteral'",
})

const StringLiteral = createToken({
  name: 'StringLiteral',
  pattern: MAKE_PATTERN('"[^"\\\\]*(\\\\.[^"\\\\]*)*"'),
  label: "'StringLiteral'",
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

const ExclamationmarkEquals = createToken({
  name: 'ExclamationmarkEquals',
  pattern: /!=/,
  label: "'!='",
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

const LineComment = createToken({
  name: 'LineComment',
  pattern: /\/\/[^\n\r]*/,
})

const LineCommentStandalone = createToken({
  name: 'LineCommentStandalone',
  // TODO: I think the s* in the end is meant to be \s*
  pattern: /\/\/[^\n\r]*((\n|[\r][^\n]|\r\n)s*){2,}/,
  line_breaks: true,
})

const JavaDocComment = createToken({
  name: 'JavaDocComment',
  pattern: /\/\*\*([^*]|\*(?!\/))*\*\//,
  line_breaks: true,
})

const JavaDocCommentStandalone = createToken({
  name: 'JavaDocCommentStandalone',
  pattern: /\/\*\*([^*]|\*(?!\/))*\*\/(((\n)|([\r][^\n])|(\r\n))\s*){2,}/,
  line_breaks: true,
})

const TraditionalComment = createToken({
  name: 'TraditionalComment',
  pattern: /\/\*([^*]|\*(?!\/))*\*\//,
  line_breaks: true,
})

const TraditionalCommentStandalone = createToken({
  name: 'TraditionalCommentStandalone',
  pattern: /\/\*([^*]|\*(?!\/))*\*\/(((\n)|([\r][^\n])|(\r\n))\s*){2,}/,
  line_breaks: true,
})

const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: chevrotain.Lexer.SKIPPED,
  line_breaks: true,
})

// | PUBLIC
// | PROTECTED
// | PRIVATE
// | STATIC
// | ABSTRACT
// | FINAL    // FINAL for class only -- does not apply to interfaces
// | STRICTFP

// note we are placing WhiteSpace first as it is very common thus it will speed up the lexer.
const allTokens = [
  WhiteSpace,
  LineCommentStandalone,
  LineComment,
  JavaDocCommentStandalone,
  JavaDocComment,
  TraditionalCommentStandalone,
  TraditionalComment,
  // "keywords" appear before the Identifier
  Boolean,
  Char,
  Byte,
  Short,
  Interface,
  Integer,
  Long,
  Float,
  Double,
  String,
  Void,
  Public,
  Protected,
  Private,
  Static,
  Abstract,
  Catch,
  Finally,
  Final,
  Transient,
  Extends,
  Implements,
  New,
  This,
  Super,
  Throw,
  Return,
  Break,
  Continue,
  If,
  Else,
  While,
  Do,
  Try,
  Switch,
  For,
  True,
  False,
  Null,
  Assert,
  Instanceof,
  Class,
  Enum,
  FloatLiteral,
  DecimalLiteral,
  StringLiteral,
  Select,
  From,
  Where,
  Limit,
  Group,
  Order,
  By,
  Count,
  In,
  Get,
  Set,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  Dot,
  Comma,
  SemiColonWithFollowEmptyLine,
  SemiColon,
  Colon,
  EqualsEquals,
  ExclamationmarkEquals,
  Equals,
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
  LBrace,
  RBrace,
  LCurly,
  RCurly,
  LSquare,
  RSquare,
  LessEquals,
  Less,
  GreaterEquals,
  Greater,
  At,
  StarEquals,
  Star,
  DashEquals,
  Dash,
  Questionmark,
  Exclamationmark,
]

module.exports = {
  allTokens,
  tokens: {
    WhiteSpace,
    LineCommentStandalone,
    LineComment,
    JavaDocCommentStandalone,
    JavaDocComment,
    TraditionalCommentStandalone,
    TraditionalComment,
    Boolean,
    Char,
    Byte,
    Short,
    Interface,
    Integer,
    Long,
    Float,
    Double,
    String,
    Void,
    Public,
    Protected,
    Private,
    Static,
    Abstract,
    Catch,
    Finally,
    Final,
    Transient,
    Extends,
    Implements,
    New,
    This,
    Super,
    Throw,
    Return,
    Break,
    Continue,
    If,
    Else,
    While,
    Do,
    Try,
    Switch,
    For,
    True,
    False,
    Null,
    Assert,
    Instanceof,
    Class,
    Enum,
    FloatLiteral,
    DecimalLiteral,
    StringLiteral,
    Get,
    Set,
    Select,
    From,
    Where,
    Limit,
    Group,
    Order,
    By,
    Count,
    In,
    Identifier,
    Dot,
    Comma,
    SemiColonWithFollowEmptyLine,
    SemiColon,
    Colon,
    EqualsEquals,
    ExclamationmarkEquals,
    Equals,
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
    LBrace,
    RBrace,
    LCurly,
    RCurly,
    LSquare,
    RSquare,
    LessEquals,
    Less,
    GreaterEquals,
    Greater,
    At,
    StarEquals,
    Star,
    DashEquals,
    Dash,
    Questionmark,
    Exclamationmark,
  },
}
