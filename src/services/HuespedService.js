import axios from "axios"
export class HuespedService {
    constructor(endpoint) {
        this.endpoint = endpoint;
        if (!endpoint) {
            endpoint = 'http://localhost:5135';
        }
    }
    crearHuesped = (name, lastName, phoneNumber, user, userId) => {
        console.log('endpoint: ', this.endpoint + '/api/Guest');
        console.log(user);
        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/api/Guest', {
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