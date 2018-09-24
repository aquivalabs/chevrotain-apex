const { primitives } = require('./primitives')
const { complexTypes } = require('./complexTypes')
const { namesAndIdentifiers } = require('./namesAndIdentifiers')
const { annotations } = require('./annotations')
const { basics } = require('./basics')
const { classesAndMethods } = require('./classesAndMethods')
const { collections } = require('./collections')
const { creators } = require('./creators')
const { declarations } = require('./declarations')
const { expressions } = require('./expressions')

function apexRules($, LA) {
  primitives($)
  complexTypes($, LA)
  namesAndIdentifiers($, LA)
  annotations($)
  basics($, LA)
  classesAndMethods($, LA)
  collections($, LA)
  creators($)
  declarations($, LA)
  expressions($)
}

module.exports = {
  apexRules,
}
