import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { HuespedService } from '../../services/HuespedService.js';
import { crearHuespedRequestBody, crearHuespedResponse, textoBusqueda, responseHuespedSearch } from '../HuespedPactResponses.js';
const { like } = MatchersV3;
describe('El API de Items', () => {

    let huespedService;
    const provider = new PactV3({
        consumer: 'react-client',
        provider: 'huesped-service'
    });

    describe('crear huesped', () => {
        it('retorna un id de huesped ya creado', () => {
            //Arrange
            provider.given('crear huesped')
                .uponReceiving('se requiere crear un nuevo huesped')
                .withRequest({
                    method: 'POST',
                    path: '/api/Guest',
                    headers: {
                        'Accept': '*/*'
                    },
                    body: crearHuespedRequestBody
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(crearHuespedResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                huespedService = new HuespedService(mockServer.url);
                return huespedService.crearHuesped(crearHuespedRequestBody.name, crearHuespedRequestBody.lastName, crearHuespedRequestBody.phoneNumber, 
                    crearHuespedRequestBody.user,crearHuespedRequestBody.userId).then((response) => {
                    //Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).equal(crearHuespedResponse);
                });
            });

        });
    });


    describe('buscar huesped', () => {
        it('retorna una lista de huesped encontrados', () => {
            //Arrange
            provider.given('realizar busqueda de huesped')
                .uponReceiving('un texto de busqueda')
                .withRequest({
                    method: 'GET',
                    path: '/api/Guest',
                    query: {
                        searchTerm: textoBusqueda
                    },
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(responseHuespedSearch)
                });
            return provider.executeTest(async mockServer => {
                // Act
                huespedService = new HuespedService(mockServer.url);
                return huespedService.buscarPorNombre(textoBusqueda).then((response) => {
                    // Assert

                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).to.deep.equal(responseHuespedSearch);
                    expect(response).to.be.an('array');
                    expect(response).to.have.lengthOf(3);
                    const values = response.map((item) => item.name);
                    expect(values).to.include('ramiro');                    
                });
            });
        });
    });
});