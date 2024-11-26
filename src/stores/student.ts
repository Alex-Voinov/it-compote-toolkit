import IStudent from "../models/Student";
import Server from "../servies/Server"
import { makeAutoObservable } from "mobx";
import calculateAge from "../utilities/dateFunc";
import ITheme from "../models/Theme";

export default class Student {
    disciplines: string[] = []
    student: IStudent | null = null
    selectDiscipline: string = ''
    level: string = ''
    age: number | null = null;
    lastThems: { [key: string]: ITheme } = {}
    allTopic: { [key: string]: string[] } = {}
    selectLastTheme: string = ''

    constructor() {
        makeAutoObservable(this);
    }

    clear() {
        this.disciplines = []
        this.student = null
        this.selectDiscipline = ''
        this.level = ''
        this.age = null;
        this.lastThems = {}
        this.allTopic = {}
        this.selectLastTheme = ''
    }

    setupAge(newAge: string) {
        this.age = Number(newAge)
    }

    setupLastTheme(newSelectTheme: string) {
        this.selectLastTheme = newSelectTheme
    }

    setupLevel(newLevel: string) {
        this.level = newLevel
    }

    setupDiscipline(newDiscipline: string) {
        this.selectDiscipline = newDiscipline
        this.selectLastTheme = ''
    }

    defineAge() {
        // Определяем возраст ученика
        if (this.student?.Birthday) {
            this.age = calculateAge(this.student.Birthday);
            return this.age;
        }
        return 0;
    }

    async defineLatsThems() {
        const response = await Server.getLastThems(this.student!.ClientId!)
        const themes = response.data
        this.lastThems = themes;
        return Object.keys(themes).length
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

    async getTopicsAcrossDisciplines() {
        const response = await Server.getTopicsAcrossDisciplines();
        const topics = response.data;
        this.allTopic = topics
    }

    async pickGroup() {
        const request = await Server.pickGroup(
            this.selectDiscipline,
            this.level,
            this.age!,
            this.selectLastTheme ? this.selectLastTheme : this.lastThems[this.selectDiscipline].Description
        );
        this.clear()
        return request
    }
}