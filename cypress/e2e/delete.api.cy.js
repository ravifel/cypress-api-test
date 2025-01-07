/// <reference types="cypress"/>

describe('Deletar dispositivo', () => {

    it('Deletar um dispositivo', () => {

        const body = {
            "name": "Ravi Laptop",
            "data": {
                "year": 2024,
                "price": 1849.99,
                "CPU model": "Intel Core i5",
                "Hard disk size": "1 TB",
                "Owner": "Ravi Silva LTDA"
            }
        }

        cy.request({
            method: 'POST',
            url: `https://api.restful-api.dev/objects`,
            failOnStatusCode: false,
            body: body
        }).as('postDeviceResult')

        // Pegando o result do cadastro, para pegar o 'id'
        cy.get('@postDeviceResult')
            .then((response) => {
                expect(response.status).equal(200);

                cy.request({
                    method: 'DELETE',
                    url: `https://api.restful-api.dev/objects/${response.body.id}`,
                    failOnStatusCode: false
                }).as('deleteDeviceResult')

                //validations do delete
                cy.get('@deleteDeviceResult').then((response_delete) => {

                })
            })


    })
})