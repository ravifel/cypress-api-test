/// <reference types="cypress"/>

describe('Change devices', () => {

    const payload_registration_device = require('../fixtures/put_tests/register_device_successfully.json');
    const payload_update_device = require('../fixtures/put_tests/update_device_successfully.json');

    it('Change a device', () => {
        const currentDate = new Date().toISOString().slice(0, 10);

        const body_post = payload_registration_device;
        const body_put = payload_update_device

        cy.deviceRegister(body_post).as('postDeviceResult')

        // Getting the registration result, to get the 'id'
        cy.get('@postDeviceResult')
            .then((response_post) => {
                expect(response_post.status).equal(200);
                expect(response_post.body.name).equal("Ravi Laptop")

                cy.updateDevice(response_post.body.id, body_put).as('putDeviceResult')

                // PUT validations
                cy.get('@putDeviceResult').then((response_put) => {
                    expect(response_put.status).equal(200)
                    expect(response_put.body.name).equal(body_put.name)
                    expect(response_put.body.data.Owner).equal(body_put.data.Owner)
                    expect(response_put.body.updatedAt.slice(0, 10)).equal(currentDate);
                })
            })
    })
})