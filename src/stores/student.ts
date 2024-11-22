import IStudent from "../models/Student";
import Server from "../servies/Server"
import { makeAutoObservable } from "mobx";
import getYearDifference from "../utilities/dateFunc";

export default class Student {
    disciplines: string[] = []
    student: IStudent | null = null
    selectDiscipline: string = ''
    level: string = ''
    age: number | null = null;
    lastThems: string = ''

    constructor() {
        makeAutoObservable(this);
    }

    prepareDataForGroupSearch() {
        // Определяем возраст ученика
        if (this.student?.Birthday) {
            const birthDate: Date = new Date(this.student?.Birthday);
            const currentDate: Date = new Date();
            // Вычисляем возраст
            this.age = getYearDifference(birthDate, currentDate);
        }
        // Определеяем уровень ученика
        if (this.student?.Disciplines) {
            const disciplines = this.student.Disciplines;
            for (let discipline of disciplines) {
                if (discipline.Discipline === this.selectDiscipline) {
                    this.level = discipline.Level;
                    break;
                }
            }
        }
        // Определяем последнию тему ???

    }

    selectStudent(studentData: IStudent) {
        this.student = studentData;
    }

    setSelectDiscipline(numberDiscipline: number) {
        this.selectDiscipline = this.disciplines[numberDiscipline];
    }

    async uploadDisciplines() {
        const response = await Server.getDisciplines();
        if (response.data.Disciplines) {
            this.disciplines = response.data.Disciplines
            return this.disciplines
        }
    }
}