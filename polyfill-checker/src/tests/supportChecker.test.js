import { makeSupportChecker } from '../supportChecker'

const minBrowsers = {
  chrome: true,
  edge: true,
  firefox: '32',
  ie: '10',
  safari: '11.3',
  safari_mobile: '11.3.2',
}

const findUnsupported = makeSupportChecker({ logger: { debug: jest.fn() } })

describe('supportChecker', () => {
  it('should be fully supported', () => {
    const suppBrowsers = {
      chrome: { version_added: true },
      edge: { version_added: true },
      firefox: { version_added: '1' },
      ie: { version_added: true },
      nodejs: { version_added: true },
    }
    expect(findUnsupported(minBrowsers, suppBrowsers)).toEqual([])
  })

  it('should not be supported by version number', () => {
    const suppBrowsers = {
      chrome: { version_added: true },
      ie: { version_added: '11' },
    }
    expect(findUnsupported(minBrowsers, suppBrowsers)).toEqual([
      {
        browser: 'ie',
        version_added: '11',
        min_version: '10',
      },
    ])
  })

  it('should not be supported by version string', () => {
    const suppBrowsers = {
      safari: { version_added: '11.2' },
      safari_mobile: { version_added: '11.3.3' },
    }
    expect(findUnsupported(minBrowsers, suppBrowsers)).toEqual([
      {
        browser: 'safari_mobile',
        version_added: '11.3.3',
        min_version: '11.3.2',
      },
    ])
  })

  it('should not be supported by full support flag', () => {
    const suppBrowsers = {
      chrome: { version_added: '9' },
    }
    expect(findUnsupported(minBrowsers, suppBrowsers)).toEqual([
      {
        browser: 'chrome',
        version_added: '9',
        min_version: true,
      },
    ])
  })

  it('should not be supported at all', () => {
    const suppBrowsers = {
      chrome: { version_added: false },
    }
    expect(findUnsupported(minBrowsers, suppBrowsers)).toEqual([
      {
        browser: 'chrome',
        version_added: false,
        min_version: true,
      },
    ])
  })

  it('should be supported when versions equal', () => {
    const suppBrowsers = {
      firefox: { version_added: '32' },
    }
    expect(findUnsupported(minBrowsers, suppBrowsers)).toEqual([])
  })

  it('should be supported on empty input', () => {
    expect(findUnsupported(minBrowsers, undefined)).toEqual([])
  })
})
