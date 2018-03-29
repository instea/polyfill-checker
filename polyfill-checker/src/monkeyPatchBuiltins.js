import { patchUnsupportedBuiltins } from './patchUnsupportedBuiltins'
import { makePatchers } from './patchers'

export default function monkeyPatchBuiltins(data, ctx) {
  const { logger, reporter } = ctx
  ctx.skipReporting = true

  function reportUsage(featureName, data) {
    if (ctx.skipReporting) {
      return
    }
    reporter.usageReported(featureName, data)
  }

  const patchers = makePatchers({
    onConstructor: reportUsage,
    onMethod: reportUsage,
    onProperty: reportUsage,
    logger,
  })

  const options = { ctx, patchers }

  patchUnsupportedBuiltins(data, options)
  ctx.skipReporting = false
}
