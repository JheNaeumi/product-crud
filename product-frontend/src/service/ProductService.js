import axios from "axios";

const REST_API_BASE_URL ='http://localhost:5086/api/Product';

export const CreateProduct = (product) => {
    return axios.post(REST_API_BASE_URL +"/CreateProduct", product)
}

export const GetProducts = () => {
    return axios.get(REST_API_BASE_URL +"/GetProducts")
}

export const UpdateProduct = (productId, product) => {
    return axios.patch(REST_API_BASE_URL +`/UpdateProduct/${productId}`, product)
}

export const DeleteProduct = (productId) => {
    return axios.delete(REST_API_BASE_URL +`/DeleteProduct/${productId}`)
}