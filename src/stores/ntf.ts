import { makeAutoObservable } from "mobx";

export enum StatusNtf {
    empty,
    info,
    error,
}

export default class Ntf {
    title: string = ''
    text: string = ''
    status: number = StatusNtf.empty

    constructor() {
        makeAutoObservable(this)
    }

    exist() {
        return this.status !== StatusNtf.empty
    }

    hide() {
        this.status = StatusNtf.empty
    }

    showInfo(title: string, text: string) {
        this.status = StatusNtf.info
        this.title = title
        this.text = text
    }

    showError(title: string, text: string) {
        this.status = StatusNtf.error
        this.title = title
        this.text = text
    }

    notifyHHBadResponse() {
        this.status = StatusNtf.error
        this.title = 'Ошибка'
        this.text = 'Holihop отправил некоректные данные'
    }
}