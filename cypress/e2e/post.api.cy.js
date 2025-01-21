/// <reference types="cypress"/>

describe('Register device', () => {

    it('Register a device', () => {
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

        cy.deviceRegister(body).as('postDeviceResult')

        // Validations
        // get the response and do the validations -> 
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

    it('Register a device without sending data', () => {

        cy.deviceRegister().as('postDeviceResult')

        // Validations
        // get the response and do the validations -> 
        cy.get('@postDeviceResult')
            .then((response) => {
                expect(response.status).equal(400);
                expect(response.body.error).equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')
            })
    })
})