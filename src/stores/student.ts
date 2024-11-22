import IStudent from "../models/Student";
import Server from "../servies/Server"
import { makeAutoObservable } from "mobx";
import calculateAge from "../utilities/dateFunc";

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

    defineAge() {
        // Определяем возраст ученика
        if (this.student?.Birthday) {
            this.age = calculateAge(this.student.Birthday);
            return this.age;
        }
        return 0;
    }

    selectStudent(studentData: IStudent) {
        this.student = studentData;
    }

    setSelectDiscipline(numberDiscipline: number) {
        this.selectDiscipline = this.disciplines[numberDiscipline];
    }

    setLevel(level: string) {
        this.level = level;
    }

    async uploadDisciplines() {
        const response = await Server.getDisciplines();
        if (response.data.Disciplines) {
            this.disciplines = response.data.Disciplines
            return this.disciplines
        }
    }
}