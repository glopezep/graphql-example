module.exports = `
  type Query {
    persons: [Person]
  }

  type Person {
    firstName: String
    lastName: String
  }
`