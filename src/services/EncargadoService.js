import axios from "axios"
export class EncargadoService {
    constructor(endpoint) {
        this.endpoint = endpoint;
        if (!endpoint) {
            endpoint = 'http://localhost:5135';
        }
    }
    crearEncargado = (name, lastName, phoneNumber, user, userId) => {
        console.log('endpoint: ', this.endpoint + '/api/Staff');
        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/api/Staff', {
                name,
                lastName,
                phoneNumber,
                user,
                userId
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
    /*buscarPorNombre = (texto) => {
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
    }*/
}