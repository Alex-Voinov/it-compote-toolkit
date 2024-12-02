import axios from 'axios';
import { AxiosResponse } from 'axios';
import IStudentSerch from '../models/StudentSerch';
import ITheme from '../models/Theme';
import ISuitableGroup from '../models/SuitableGroup';

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
        return $api.get<IStudentSerch>(
            '/get-student', {
            params: {
                fullName,
                email,
                tel
            }
        }
        )
    }
    static getDisciplines(): Promise<AxiosResponse<{ [key: string]: string[] }>> {
        return $api.get<{ [key: string]: string[] }>('/get-disciplines')
    }

    static getLastThems(studentId: number): Promise<AxiosResponse<{ [key: string]: ITheme }>> {
        return $api.get<{ [key: string]: ITheme }>(
            '/get-last-thems', {
            params: {
                studentId
            }
        })
    }
    
    static getTopicsAcrossDisciplines(): Promise<AxiosResponse<{ [key: string]: string[] }>> {
        return $api.get<{ [key: string]: string[] }>('/get-topics-across-disciplines')
    }

    static pickGroup(
        discipline: string,
        level: string,
        age: number,
        lastTheme: string[]
    ): Promise<AxiosResponse<{ [key: string]: ISuitableGroup[] }>> {
        return $api.get<{ [key: string]: ISuitableGroup[] }>(
            '/pick-group',
            {
                params: {
                    level,
                    discipline,
                    age,
                    lastTheme
                }
            }
        )
    }
}

