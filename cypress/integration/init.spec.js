// init.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


describe('Cypress', () => {
    it('is working', () => {
        expect(true).to.equal(true)
    })

    it('opens the app', () => {
        cy.visit('http://localhost:3000')
    })
})