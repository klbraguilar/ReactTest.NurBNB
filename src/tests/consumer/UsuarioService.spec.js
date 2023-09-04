import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { UsuarioService } from '../../services/UsuarioService.js';
import { crearUsuarioRequestBody, crearUsuarioResponse, responseUsuarioSearch, textoBusqueda } from '../PactResponses.js';
const { like } = MatchersV3;
describe('El API de Items', () => {

    let itemService;
    const provider = new PactV3({
        consumer: 'react-client',
        provider: 'usuario-service'
    });

    describe('crear usuario', () => {
        it('retorna un id de usuario ya creado', () => {
            //Arrange
            provider.given('crear usuario')
                .uponReceiving('se requiere crear un nuevo usuario')
                .withRequest({
                    method: 'POST',
                    path: '/api/Usuario',
                    headers: {
                        'Accept': '*/*'
                    },
                    body: crearUsuarioRequestBody
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(crearUsuarioResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                itemService = new UsuarioService(mockServer.url);
                return itemService.crearUsuario(crearUsuarioRequestBody.userName, crearUsuarioRequestBody.password, crearUsuarioRequestBody.email).then((response) => {
                    //Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).equal(crearUsuarioResponse);
                });
            });

        });
    });


    describe('buscar usuarios', () => {
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
    });
});