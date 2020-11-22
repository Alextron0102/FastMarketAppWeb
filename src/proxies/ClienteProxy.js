export default class OrdenProxy { 
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }
    getAll(page,take) {
        return this.axios.get(this.url + `cliente?page=${page}&take=${take}`);
    }
    getById(id) {
        return this.axios.get(this.url + `cliente/${id}`);
    }
    create(model){
        return this.axios.post(this.url+`cliente`,model);
    }
    update(id,model){
        return this.axios.put(this.url+`cliente/${id}`,model);
    }
    remove(id){
        return this.axios.delete(this.url+`cliente/${id}`);
    }
}