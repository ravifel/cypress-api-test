// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('searchforSpecificDevice', (device__id) => {
    cy.request({
        method: 'GET',
        url: `/objects/${device__id}`,
        failOnStatusCode: false
    }).then((response) => {
        return response
    })
})

Cypress.Commands.add('deviceRegister', (body) => {
    cy.request({
        method: 'POST',
        url: `/objects`,
        failOnStatusCode: false,
        body: body
    }).then((response) => {
        return response
    })
})

Cypress.Commands.add('updateDevice', (id, body) => {
    cy.request({
        method: 'PUT',
        url: `/objects/${id}`,
        failOnStatusCode: false,
        body: body
    }).then((response) => {
        return response
    })
})

Cypress.Commands.add('deleteDevice', (id) => {
    cy.request({
        method: 'DELETE',
        url: `/objects/${id}`,
        failOnStatusCode: false
    }).then((response) => {
        return response
    })
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })