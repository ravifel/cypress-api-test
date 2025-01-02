/// <reference types="cypress"/>

describe('Register device', () => {

    it('Register device', () => {
        const currentDate = new Date().toISOString().slice(0, 10);

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

        //validations
        //pegar o Response e fazer as validacoes -> 
        cy.get('@postDeviceResult')
            .then((response) => {
                expect(response.status).equal(200);
                expect(response.body.id).not.to.be.null;
                expect(response.body.id).not.to.be.empty;

                expect(response.body.createdAt).not.to.be.null;
                expect(response.body.createdAt).to.not.be.empty;

                expect(response.body.createdAt.slice(0, 10)).equal(currentDate);
                expect(response.body.name).equal(body.name);

                expect(response.body.data.year).equal(body.data.year);
                expect(response.body.data.price).equal(body.data.price);
            })
    })
})