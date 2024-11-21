import IStudent from "./models/Student";
import Server from "./servies/Server"
import { makeAutoObservable } from "mobx";

export default class Store {
    disciplines: string[] = []
    student: IStudent | null = null
    selectDiscipline: string = ''

    constructor(){
        makeAutoObservable(this);
    }

    selectStudent(studentData: IStudent) {
        this.student = studentData;
    }

    setSelectDiscipline(numberDiscipline: number) {
        this.selectDiscipline = this.disciplines[numberDiscipline];
    }

    async uploadDisciplines() {
        const response = await Server.getDisciplines();
        if (response.data.Disciplines)
            this.disciplines = response.data.Disciplines
    }
}