/**
Default Reporter implementation that collects statistics and log once features
*/
export default class Reporter {
  constructor(ctx) {
    this.ctx = ctx
    this.counts = {}
    this.usageData = {}
  }

  usageReported(featureName, data) {
    if (!this.usageData[featureName]) {
      this.usageData[featureName] = data
      this.counts[featureName] = 0
    }
    this.counts[featureName]++
    if (this.counts[featureName] === 1) {
      const report = { unsupportedBrowsers: data.unsupported }
      this.ctx.logger.error('Using incompatible ' + featureName, report)
    }
  }

  printStatistics() {
    this.ctx.skipReporting = true
    const features = Object.keys(this.counts)
    features.sort((a, b) => this.counts[b] - this.counts[a])
    console.table(
      features.map(f => ({
        feature: f,
        count: this.counts[f],
        unsupported: this.usageData[f].unsupported
          .map(d => d.browser)
          .join(','),
      }))
    )
    this.ctx.skipReporting = false
  }
}
