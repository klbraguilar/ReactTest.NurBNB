import axios from "axios"
export class UsuarioService {
    constructor(endpoint) {
        this.endpoint = endpoint;
        if (!endpoint) {
            endpoint = 'http://localhost:5135';
        }
    }
    crearUsuario = (userName, password, email) => {
        console.log('endpoint: ', this.endpoint + '/api/Usuario');

        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/api/Usuario', {
                userName,
                password,
                email
            },{
                headers: {
                    'Accept': '*/*'
                }
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log('error: ' + error);
                reject(error);
            });
        });
    }
    buscarPorNombre = (texto) => {
        return new Promise((resolve, reject) => {
            axios.get(this.endpoint + '/api/Usuario', {
                params: {
                    searchTerm: texto
                }
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log('error: ' + error);
                reject(error);
            });
        });
    }
}