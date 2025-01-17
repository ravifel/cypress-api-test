/// <reference types="cypress"/>

describe('List devices', () => {

    it('List SINGLE OBJECT', () => {
        const device__id = '7'

        cy.request({
            method: 'GET',
            url: `https://api.restful-api.dev/objects/${device__id}`,
            failOnStatusCode: false
        }).as('getDeviceResult')


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
})