/// <reference types="cypress"/>

describe('Register device', () => {

    const payload_registration_device = require('../fixtures/post_tests/register_device_successfully.json');

    it('Register a device', () => {
        const currentDate = new Date().toISOString().slice(0, 10);

        const body = payload_registration_device;
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