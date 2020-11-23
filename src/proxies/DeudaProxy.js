export default class IdentityProxy { 
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }
    getAll(page,take) {
        return this.axios.get(this.url + `deuda?page=${page}&take=${take}`);
    }
    getById(id) {
        return this.axios.get(this.url + `deuda/${id}`);
    }
    update(id,model){
        return this.axios.put(this.url+`deuda/${id}`,model);
    }
}