/// <reference types="cypress"/>

describe('Alterar dispositivos', () => {

    it('Alterar um dispositivo', () => {
        const currentDate = new Date().toISOString().slice(0, 10);

        const body_post = {
            "name": "Ravi Laptop",
            "data": {
                "year": 2024,
                "price": 1849.99,
                "CPU model": "Intel Core i5",
                "Hard disk size": "1 TB",
                "Owner": "Ravi Silva LTDA"
            }
        }

        const body_put = {
            "name": "Ravi Laptop Updated",
            "data": {
                "year": 2024,
                "price": 1849.99,
                "CPU model": "Intel Core i5  Updated",
                "Hard disk size": "1 TB  Updated",
                "Owner": "Ravi Silva LTDA  Updated"
            }
        }

        cy.request({
            method: 'POST',
            url: `https://api.restful-api.dev/objects`,
            failOnStatusCode: false,
            body: body_post
        }).as('postDeviceResult')

        // Pegando o result do cadastro, para pegar o 'id'
        cy.get('@postDeviceResult')
            .then((response_post) => {
                expect(response_post.status).equal(200);
                expect(response_post.body.name).equal("Ravi Laptop")

                cy.request({
                    method: 'PUT',
                    url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
                    failOnStatusCode: false,
                    body: body_put
                }).as('putDeviceResult')

                //validations do PUT
                cy.get('@putDeviceResult').then((response_put) => {
                    expect(response_put.status).equal(200)
                    expect(response_put.body.name).equal(body_put.name)
                    expect(response_put.body.data.Owner).equal(body_put.data.Owner)
                    expect(response_put.body.updatedAt.slice(0, 10)).equal(currentDate);
                })
            })
    })
})