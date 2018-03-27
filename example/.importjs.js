module.exports = {
  importStatementFormatter({ importStatement }) {
    // without semicolons
    return importStatement.replace(/;$/, '')
  },
  sortImports: false,
}
