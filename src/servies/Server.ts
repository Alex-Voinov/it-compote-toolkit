import axios from 'axios';
import { AxiosResponse } from 'axios';
import IStudentSerch from '../models/StudentSerch';

const API_URL = `http://localhost:5000/api`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

export default class Server {
    static getStudent(
        fullName: string,
        email: string,
        tel: string,
    ): Promise<AxiosResponse<IStudentSerch>> {
        return $api.get<IStudentSerch>('/get-student', { params: { fullName, email, tel } })
    }
    static getDisciplines(): Promise<AxiosResponse<{ [key: string]: string[] }>> {
        return $api.get<{ [key: string]: string[] }>('/get-disciplines')
    }
}

