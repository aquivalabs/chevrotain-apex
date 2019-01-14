const { createKeywordToken } = require('../_shared')

const ToLabel = createKeywordToken({
  name: 'ToLabel',
  pattern: /TOLABEL/,
  label: "'ToLabel'",
})

const CalendarMonth = createKeywordToken({
  name: 'CalendarMonth',
  pattern: /CALENDAR_MONTH/,
  label: "'CalendarMonth'",
})

const CalendarQuarter = createKeywordToken({
  name: 'CalendarQuarter',
  pattern: /CALENDAR_QUARTER/,
  label: "'CalendarQuarter'",
})

const CalendarYear = createKeywordToken({
  name: 'CalendarYear',
  pattern: /CALENDAR_YEAR/,
  label: "'CalendarYear'",
})

const DayInMonth = createKeywordToken({
  name: 'DayInMonth',
  pattern: /DAY_IN_MONTH/,
  label: "'DayInMonth'",
})

const DayInWeek = createKeywordToken({
  name: 'DayInWeek',
  pattern: /DAY_IN_WEEK/,
  label: "'DayInWeek'",
})

const DayInYear = createKeywordToken({
  name: 'DayInYear',
  pattern: /DAY_IN_YEAR/,
  label: "'DayInYear'",
})

const DayOnly = createKeywordToken({
  name: 'DayOnly',
  pattern: /DAY_ONLY/,
  label: "'DayOnly'",
})

const FiscalMonth = createKeywordToken({
  name: 'FiscalMonth',
  pattern: /FISCAL_MONTH/,
  label: "'FiscalMonth'",
})

const FiscalQuarter = createKeywordToken({
  name: 'FiscalQuarter',
  pattern: /FISCAL_QUARTER/,
  label: "'FiscalQuarter'",
})

const FiscalYear = createKeywordToken({
  name: 'FiscalYear',
  pattern: /FISCAL_YEAR/,
  label: "'FiscalYear'",
})

const HourInDay = createKeywordToken({
  name: 'HourInDay',
  pattern: /HOUR_IN_DAY/,
  label: "'HourInDay'",
})

const WeekInMonth = createKeywordToken({
  name: 'WeekInMonth',
  pattern: /WEEK_IN_MONTH/,
  label: "'WeekInMonth'",
})

const WeekInYear = createKeywordToken({
  name: 'WeekInYear',
  pattern: /WEEK_IN_YEAR/,
  label: "'WeekInYear'",
})

const Format = createKeywordToken({
  name: 'Format',
  pattern: /FORMAT/,
  label: "'Format'",
})

const ConvertCurrency = createKeywordToken({
  name: 'ConvertCurrency',
  pattern: /convertCurrency/,
  label: "'ConvertCurrency'",
})

module.exports = {
  ToLabel,
  CalendarMonth,
  CalendarQuarter,
  CalendarYear,
  DayInMonth,
  DayInWeek,
  DayInYear,
  DayOnly,
  FiscalMonth,
  FiscalQuarter,
  FiscalYear,
  HourInDay,
  WeekInMonth,
  WeekInYear,
  Format,
  ConvertCurrency,
}
