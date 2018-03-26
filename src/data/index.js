import mdnData from './mdnData.json'

/*
BrowserSupportDescriptor = {
  version_added: Boolean | Number,
  version_removed: Number,
  notes: String,
  flags: [
    type: String,
    name: String,
    value_to_set: String,
  ],
}

CompatDescriptor = {
  __compat: {
    mdn_url: URL,
    support: {
      [Browser key]: BrowserSupportDescriptor | Array<BrowserSupportDescriptor>,
    },
    status: {
      experimental: Boolean,
      standard_track: Boolean,
      deprecated: Boolean,
    }
  },
  [Object/method/property]: CompatDescriptior
}

Data = {
  [Object/method/property]: CompatDescriptor
}
*/
const data = mdnData
export default data
