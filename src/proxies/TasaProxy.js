export default class TasaProxy { 
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }
    getAll(page,take) {
        return this.axios.get(this.url + `tasa?page=${page}&take=${take}`);
    }
    getAllSimple(page,take) {
        return this.axios.get(this.url + `tasa?page=${page}&take=${take}`);
    }
    getById(id) {
        return this.axios.get(this.url + `tasa/${id}`);
    }
    create(model){
        return this.axios.post(this.url+`tasa`,model);
    }
    update(id, model){
        return this.axios.put(this.url+`tasa/${id}`,model);
    }
    remove(id){
        return this.axios.delete(this.url+`tasa/${id}`);
    }
}