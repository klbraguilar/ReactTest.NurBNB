import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { EncargadoService } from '../../services/EncargadoService.js';
import { crearEncargadoRequestBody, crearEncargadoResponse } from '../EncargadoPactResponses.js';
const { like } = MatchersV3;
describe('El API de Items', () => {

    let encargadoService;
    const provider = new PactV3({
        consumer: 'react-client',
        provider: 'huesped-service'
    });

    describe('crear encargado', () => {
        it('retorna un id de encargado ya creado', () => {
            //Arrange
            provider.given('crear encargado')
                .uponReceiving('se requiere crear un nuevo encargado')
                .withRequest({
                    method: 'POST',
                    path: '/api/Staff',
                    headers: {
                        'Accept': '*/*'
                    },
                    body: crearEncargadoRequestBody
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(crearEncargadoResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                encargadoService = new EncargadoService(mockServer.url);
                return encargadoService.crearEncargado(crearEncargadoRequestBody.name, crearEncargadoRequestBody.lastName, crearEncargadoRequestBody.phoneNumber, 
                    crearEncargadoRequestBody.user,crearEncargadoRequestBody.userId).then((response) => {
                    //Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).equal(crearEncargadoResponse);
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