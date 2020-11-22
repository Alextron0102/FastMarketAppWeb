export default class OrdenProxy { 
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }
    getAll(page,take) {
        return this.axios.get(this.url + `orden?page=${page}&take=${take}`);
    }
    getById(id) {
        return this.axios.get(this.url + `orden/${id}`);
    }
    create(model){
        return this.axios.post(this.url+`orden`,model);
    }
    remove(id){
        return this.axios.delete(this.url+`orden/${id}`);
    }
}