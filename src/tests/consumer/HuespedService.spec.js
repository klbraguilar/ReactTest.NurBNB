import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { HuespedService } from '../../services/HuespedService.js';
import { crearHuespedRequestBody, crearHuespedResponse } from '../HuespedPactResponses.js';
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


    /*describe('buscar usuarios', () => {
        it('retorna una lista de usuarios encontrados', () => {
            //Arrange
            provider.given('realizar busqueda de usuarios')
                .uponReceiving('un texto de busqueda')
                .withRequest({
                    method: 'GET',
                    path: '/api/Usuario',
                    query: {
                        searchTerm: textoBusqueda
                    },
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(responseUsuarioSearch)
                });
            return provider.executeTest(async mockServer => {
                // Act
                itemService = new UsuarioService(mockServer.url);
                return itemService.buscarPorNombre(textoBusqueda).then((response) => {
                    // Assert

                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).to.deep.equal(responseUsuarioSearch);
                    expect(response).to.be.an('array');
                    expect(response).to.have.lengthOf(1);
                    const values = response.map((item) => item.username);
                    expect(values).to.include('kleber');                    
                });
            });
        });
    });*/
});