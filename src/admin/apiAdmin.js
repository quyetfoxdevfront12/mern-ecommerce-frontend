import { API } from '../config';

export const createCategory = (userID, token, category) => {
    return fetch(`${API}/category/create/${userID}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}
export const createProduct = (userID, token, product) => {

    return fetch(`${API}/product/create/${userID}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}