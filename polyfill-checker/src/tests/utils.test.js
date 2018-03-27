import { isExcluded } from '../utils'

describe('isExcluded', () => {
  it('should not be excluded', () => {
    expect(isExcluded('whatever', ['whateve', () => false])).toBe(false)
  })

  it('should be excluded by string', () => {
    expect(isExcluded('whatever', ['whatever', 'other'])).toBe(true)
  })

  it('should be excluded by function', () => {
    expect(
      isExcluded('whatever', ['something', name => name === 'whatever'])
    ).toBe(true)
  })
})
