import Axios from 'axios';
import IdentityProxy from './IdentityProxy.js';
import ProductoProxy from './ProductoProxy.js';
import OrdenProxy from './OrdenProxy.js';
import ClienteProxy from './ClienteProxy.js';
import TasaProxy from './TasaProxy.js';
import DeudaProxy from './DeudaProxy.js';
// Axios default behavior
Axios.defaults.headers.common.Accept = 'application/json';

// Token
Axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => Promise.reject(error)
);

Axios.interceptors.response.use(
    response => response,
    error => {
        const { status } = error.response;
        if (status === 401) {
            localStorage.removeItem('access_token');
            window.location.reload(true);
        }
        return Promise.reject(error);
    }
);
//enlace backend:
//let url = 'http://localhost:5000/';
let url = 'https://fastmarketapi.herokuapp.com/';
export default{
    identityProxy: new IdentityProxy(Axios,url),
    productoProxy: new ProductoProxy(Axios,url),
    ordenProxy: new OrdenProxy(Axios,url),
    clienteProxy: new ClienteProxy(Axios,url),
    tasaProxy: new TasaProxy(Axios,url),
    deudaProxy: new DeudaProxy(Axios,url),
}