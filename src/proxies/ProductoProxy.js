export default class ProductoProxy { 
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }
    getAll(page,take) {
        return this.axios.get(this.url + `productos/admin?page=${page}&take=${take}`);
    }
    getAllUser(page,take) {
        return this.axios.get(this.url + `productos?page=${page}&take=${take}`);
    }
    getById(id) {
        return this.axios.get(this.url + `productos/${id}`);
    }
    create(model){
        return this.axios.post(this.url+`productos`,model);
    }
    update(id, model){
        return this.axios.put(this.url+`productos/${id}`,model);
    }
    remove(id){
        return this.axios.delete(this.url+`productos/${id}`);
    }
}