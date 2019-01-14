const { createKeywordToken } = require('../_shared')

const Yesterday = createKeywordToken({
  name: 'Yesterday',
  pattern: /YESTERDAY/,
  label: "'Yesterday'",
})

const Today = createKeywordToken({
  name: 'Today',
  pattern: /TODAY/,
  label: "'Today'",
})

const Tomorrow = createKeywordToken({
  name: 'Tomorrow',
  pattern: /TOMORROW/,
  label: "'Tomorrow'",
})

const LastWeek = createKeywordToken({
  name: 'LastWeek',
  pattern: /LAST_WEEK/,
  label: "'LastWeek'",
})

const ThisWeek = createKeywordToken({
  name: 'ThisWeek',
  pattern: /THIS_WEEK/,
  label: "'ThisWeek'",
})

const NextWeek = createKeywordToken({
  name: 'NextWeek',
  pattern: /NEXT_WEEK/,
  label: "'NextWeek'",
})

const LastMonth = createKeywordToken({
  name: 'LastMonth',
  pattern: /LAST_MONTH/,
  label: "'LastMonth'",
})

const ThisMonth = createKeywordToken({
  name: 'ThisMonth',
  pattern: /THIS_MONTH/,
  label: "'ThisMonth'",
})

const NextMonth = createKeywordToken({
  name: 'NextMonth',
  pattern: /NEXT_MONTH/,
  label: "'NextMonth'",
})

const LastYear = createKeywordToken({
  name: 'LastYear',
  pattern: /LAST_YEAR/,
  label: "'LastYear'",
})

const ThisYear = createKeywordToken({
  name: 'ThisYear',
  pattern: /THIS_YEAR/,
  label: "'ThisYear'",
})

const NextYear = createKeywordToken({
  name: 'NextYear',
  pattern: /NEXT_YEAR/,
  label: "'NextYear'",
})

const Last90Days = createKeywordToken({
  name: 'Last90Days',
  pattern: /LAST_90_DAYS/,
  label: "'Last90Days'",
})

const Next90Days = createKeywordToken({
  name: 'Next90Days',
  pattern: /NEXT_90_DAYS/,
  label: "'Next90Days'",
})

const LastNDays = createKeywordToken({
  name: 'LastNDays',
  pattern: /LAST_N_DAYS/,
  label: "'LastNDays'",
})

const NextNDays = createKeywordToken({
  name: 'NextNDays',
  pattern: /NEXT_N_DAYS/,
  label: "'NextNDays'",
})

const LastNWeeks = createKeywordToken({
  name: 'LastNWeeks',
  pattern: /LAST_N_WEEKS/,
  label: "'LastNWeeks'",
})

const NextNWeeks = createKeywordToken({
  name: 'NextNWeeks',
  pattern: /NEXT_N_WEEKS/,
  label: "'NextNWeeks'",
})

const LastNMonth = createKeywordToken({
  name: 'LastNMonth',
  pattern: /LAST_N_MONTHS/,
  label: "'LastNMonth'",
})

const NextNMonths = createKeywordToken({
  name: 'NextNMonths',
  pattern: /NEXT_N_MONTHS/,
  label: "'NextNMonths'",
})

const LastQuarter = createKeywordToken({
  name: 'LastQuarter',
  pattern: /LAST_QUARTER/,
  label: "'LastQuarter'",
})

const ThisQuarter = createKeywordToken({
  name: 'ThisQuarter',
  pattern: /THIS_QUARTER/,
  label: "'ThisQuarter'",
})

const NextQuarter = createKeywordToken({
  name: 'NextQuarter',
  pattern: /NEXT_QUARTER/,
  label: "'NextQuarter'",
})

const LastNQuarters = createKeywordToken({
  name: 'LastNQuarters',
  pattern: /LAST_N_QUARTERS/,
  label: "'LastNQuarters'",
})

const NextNQuarters = createKeywordToken({
  name: 'NextNQuarters',
  pattern: /NEXT_N_QUARTERS/,
  label: "'NextNQuarters'",
})

const LastNYears = createKeywordToken({
  name: 'LastNYears',
  pattern: /LAST_N_YEARS/,
  label: "'LastNYears'",
})

const NextNYears = createKeywordToken({
  name: 'NextNYears',
  pattern: /NEXT_N_YEARS/,
  label: "'NextNYears'",
})

const LastFiscalQuarter = createKeywordToken({
  name: 'LastFiscalQuarter',
  pattern: /LAST_FISCAL_QUARTER/,
  label: "'LastFiscalQuarter'",
})

const ThisFiscalQuarter = createKeywordToken({
  name: 'ThisFiscalQuarter',
  pattern: /THIS_FISCAL_QUARTER/,
  label: "'ThisFiscalQuarter'",
})

const NextFiscalQuarter = createKeywordToken({
  name: 'NextFiscalQuarter',
  pattern: /NEXT_FISCAL_QUARTER/,
  label: "'NextFiscalQuarter'",
})

const LastNFiscalQuarters = createKeywordToken({
  name: 'LastNFiscalQuarters',
  pattern: /LAST_N_FISCAL_QUARTERS/,
  label: "'LastNFiscalQuarters'",
})

const NextNFiscalQuarters = createKeywordToken({
  name: 'NextNFiscalQuarters',
  pattern: /NEXT_N_FISCAL_QUARTERS/,
  label: "'NextNFiscalQuarters'",
})

const LastFiscalYear = createKeywordToken({
  name: 'LastFiscalYear',
  pattern: /LAST_FISCAL_YEAR/,
  label: "'LastFiscalYear'",
})

const ThisFiscalYear = createKeywordToken({
  name: 'ThisFiscalYear',
  pattern: /THIS_FISCAL_YEAR/,
  label: "'ThisFiscalYear'",
})

const NextFiscalYear = createKeywordToken({
  name: 'NextFiscalYear',
  pattern: /NEXT_FISCAL_YEAR/,
  label: "'NextFiscalYear'",
})

const LastNFiscalYears = createKeywordToken({
  name: 'LastNFiscalYears',
  pattern: /LAST_N_FISCAL_YEARS/,
  label: "'LastNFiscalYears'",
})

const NextNFiscalYears = createKeywordToken({
  name: 'NextNFiscalYears',
  pattern: /NEXT_N_FISCAL_YEARS/,
  label: "'NextNFiscalYears'",
})

module.exports = {
  Yesterday,
  Today,
  Tomorrow,
  LastWeek,
  ThisWeek,
  NextWeek,
  LastMonth,
  ThisMonth,
  NextMonth,
  LastYear,
  ThisYear,
  NextYear,
  Last90Days,
  Next90Days,
  LastNDays,
  NextNDays,
  LastNWeeks,
  NextNWeeks,
  LastNMonth,
  NextNMonths,
  LastQuarter,
  ThisQuarter,
  NextQuarter,
  LastNQuarters,
  NextNQuarters,
  LastNYears,
  NextNYears,
  LastFiscalQuarter,
  ThisFiscalQuarter,
  NextFiscalQuarter,
  LastNFiscalQuarters,
  NextNFiscalQuarters,
  LastFiscalYear,
  ThisFiscalYear,
  NextFiscalYear,
  LastNFiscalYears,
  NextNFiscalYears,
}
