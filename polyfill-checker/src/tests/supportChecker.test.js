import { makeSupportChecker } from '../supportChecker'

const minBrowsers = {
  chrome: true,
  edge: true,
  firefox: 32,
  ie: 10,
}

const isSupported = makeSupportChecker({ logger: { debug: jest.fn() } })

describe('supportChecker', () => {
  it('should be fully supported', () => {
    const suppBrowsers = {
      chrome: { version_added: true },
      edge: { version_added: true },
      firefox: { version_added: '1' },
      ie: { version_added: true },
      nodejs: { version_added: true },
    }
    expect(isSupported(minBrowsers, suppBrowsers)).toBe(true)
  })

  it('should not be supported by version number', () => {
    const suppBrowsers = {
      chrome: { version_added: true },
      ie: { version_added: '11' },
    }
    expect(isSupported(minBrowsers, suppBrowsers)).toBe(false)
  })

  it('should not be supported by full support flag', () => {
    const suppBrowsers = {
      chrome: { version_added: '9' },
    }
    expect(isSupported(minBrowsers, suppBrowsers)).toBe(false)
  })

  it('should not be supported at all', () => {
    const suppBrowsers = {
      chrome: { version_added: false },
    }
    expect(isSupported(minBrowsers, suppBrowsers)).toBe(false)
  })

  it('should be supported when versions equal', () => {
    const suppBrowsers = {
      firefox: { version_added: '32' },
    }
    expect(isSupported(minBrowsers, suppBrowsers)).toBe(true)
  })

  it('should be supported on empty input', () => {
    expect(isSupported(minBrowsers, undefined)).toBe(true)
  })
})
