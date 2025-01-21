/// <reference types="cypress"/>

describe('List devices', () => {

    it('List SINGLE OBJECT', () => {

        const device__id = '7'
        cy.searchforSpecificDevice(device__id).as('getDeviceResult')

        // Validations
        cy.get('@getDeviceResult')
            .then((response) => {
                expect(response.status).equal(200);
                expect(response.body).not.empty;
                expect(response.body.id).equal(device__id);
                expect(response.body.name).equal('Apple MacBook Pro 16');
                expect(response.body.data).not.empty;
                expect(response.body.data.year).not.string;
                expect(response.body.data.year).equal(2019);
                expect(response.body.data.price).to.exist;
                expect(response.body.data.price).to.be.a('number');
                expect(response.body.data.price).equal(1849.99);
                expect(response.body.data['CPU model']).not.empty;
                expect(response.body.data['Hard disk size']).not.empty;
            })
    })

    it('List Non-existent OBJECT', () => {

        const device__id = 'xpto'
        cy.searchforSpecificDevice(device__id).as('getDeviceResult')

        // Validations
        cy.get('@getDeviceResult')
            .then((response) => {
                expect(response.status).equal(404);
                expect(response.body.error).equal(`Oject with id=${device__id} was not found.`);
            })
    })
})