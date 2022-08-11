import axios from "axios";
import {ContactItem} from "../store/app-reducer";


const apiInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const AppApi = {
    getContacts() {
        return apiInstance.get<ContactItem[]>(`/users`).then(res => res.data)
    }
}