import IStudent from "../models/Student";
import Server from "../servies/Server"
import { makeAutoObservable } from "mobx";
import calculateAge from "../utilities/dateFunc";
import ITheme from "../models/Theme";
import { setButtonTexts } from "../components/SelectLevelKnowledge/SelectLevelKnowledge";

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
        this.lastThems = {} // Все дисциплины - темы из холи хопа по ученику
        this.allTopic = {} // Все дисциплины - темы по гугл таблице
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

    defineSetLevels() {
        const levelIndex = setButtonTexts.indexOf(this.level)
        const indexLastLevel = setButtonTexts.length - 1
        const formatedLevelIndex = levelIndex === 0
            ? 1
            : (levelIndex === indexLastLevel)
                ? (indexLastLevel - 2) : levelIndex
        const suitableIndexLevels = [formatedLevelIndex - 1, formatedLevelIndex, formatedLevelIndex + 1]
        const suitableStringLevels = suitableIndexLevels.map(index => setButtonTexts[index])
        if (suitableStringLevels.includes('Medium'))
            suitableStringLevels.push('[All]')
        return suitableStringLevels.join(",")
    }

    checkAutoselectedThemes(){
        // Все темы по выбранной дисциплине
        const themesForDiscipline = this.allTopic[this.selectDiscipline].map(
            str => str.replace(/^[\s*]+|[\s*]+$/g, '')
        ).filter(
            dis => dis && !(dis.toLowerCase().includes('заглушка'))
        )
        if (!(this.selectDiscipline in this.lastThems)) return false
        const autoselectedTheme = this.lastThems[this.selectDiscipline].Description.replace(/^[\s*]+|[\s*]+$/g, '')
        const resultCheck = autoselectedTheme in themesForDiscipline
        if(!resultCheck) return false
        this.selectLastTheme = autoselectedTheme;
        return true
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

    defineSetThemes() {
        const delta = 2
        const themesForDiscipline = this.allTopic[this.selectDiscipline].map(
            str => str.replace(/^[\s*]+|[\s*]+$/g, '')
        ).filter(
            dis => dis && !(dis.toLowerCase().includes('заглушка'))
        )
        const indexSelectTheme = themesForDiscipline.indexOf(this.selectLastTheme)
        const startIndex = indexSelectTheme > delta ? indexSelectTheme - delta : 0
        const lastIndex = themesForDiscipline.length - 1
        const endIndex = indexSelectTheme < lastIndex - delta ? indexSelectTheme + delta : lastIndex
        return themesForDiscipline.slice(startIndex, endIndex + 1)
    }

    async pickGroup() {
        const request = await Server.pickGroup(
            this.selectDiscipline,
            this.defineSetLevels(),
            this.age!,
            this.defineSetThemes()
        );
        this.clear()
        return request
    }
}