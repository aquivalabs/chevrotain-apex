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

function apexRules($) {
  primitives($)
  complexTypes($)
  namesAndIdentifiers($)
  annotations($)
  basics($)
  classesAndMethods($)
  collections($)
  creators($)
  declarations($)
  expressions($)
}

module.exports = {
  apexRules,
}
