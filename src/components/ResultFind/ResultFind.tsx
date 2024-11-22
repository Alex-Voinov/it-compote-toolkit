import { Dispatch, FC, SetStateAction, MouseEvent, useContext, useState } from 'react'
import styles from './ResultFind.module.css'
import IStudent from '../../models/Student'
import { GlobalData } from '../..'
import { motion } from "framer-motion";

interface IResultFind {
    statusState: [string, Dispatch<SetStateAction<string>>],
    findStudentsState: [IStudent | IStudent[] | null, Dispatch<SetStateAction<IStudent | IStudent[] | null>>]
}

enum StatusFind {
    noMatches,
    perfectMatch,
    matchesFound,
}

const visibleFiled = {
    LastName: 'Фамилия',
    FirstName: 'Имя',
    MiddleName: 'Отчество',
    Mobile: 'Телефон',
    Birthday: 'День рождения',
}

const setTitleForDifferentStatus = [
    'Поиск не дал результатов',
    'Пользователь найден',
    'Лучшие совпадения',
]

const studentFieldForVisibleSingleResult: { [key: string]: string } = {
    Mobile: 'Телефон',
    Birthday: 'Дата рождения',
    EMail: 'Почта',
}

const agentFieldForVisibleSingleResult = {
    Mobile: 'Телефон',
    EMail: 'Почта'
}





const ResultFind: FC<IResultFind> = ({ statusState, findStudentsState }) => {
    const { student, notification } = useContext(GlobalData)
    const [status, setStatus] = statusState;
    const [findStudents, setFindStudents] = findStudentsState;
    const [selectStudentsFromList, setSelectStudentsFromList] = useState(0);
    const statusFind = status === 'matches found'
        ? StatusFind.matchesFound
        : status === 'perfect match'
            ? StatusFind.perfectMatch
            : StatusFind.noMatches

    const generateVision = (
        studentsData: IStudent | IStudent[] | null,
        statusFind: number
    ) => {
        if (statusFind === StatusFind.matchesFound) return <section className={styles.matchesFoundSection}>
            <header>
                {Object.values(visibleFiled).map(fieldName => <div>
                    {fieldName}
                </div>)}
            </header>
            {(studentsData as IStudent[]).map(
                (student, numberRow) => <div
                    className={styles.row}
                    onClick={() => { setSelectStudentsFromList(numberRow) }}
                    style={numberRow === selectStudentsFromList ? {
                        backgroundColor: 'rgb(155, 69, 247)',
                        color: '#eddffc'
                    } : {}}>
                    {Object.keys(visibleFiled).map(field => <div>
                        {
                            //@ts-ignore
                            student[field] ? student[field] : '–'
                        }
                    </div>)}
                </div>
            )}
        </section>
        if (statusFind === StatusFind.perfectMatch) {
            const singleStudent = studentsData as IStudent;
            const selectStudentField = []
            for (let studentField in studentFieldForVisibleSingleResult) {
                const translateField = studentFieldForVisibleSingleResult[studentField];
                selectStudentField.push(
                    <div className={styles.fieldSingleResult}>
                        <div>{translateField}</div> <div>{
                            //@ts-ignore
                            singleStudent[studentField] ? singleStudent[studentField] : '–'
                        }</div>
                    </div>
                )
            }
            const selectAgentsField: JSX.Element[][] = []
            if (singleStudent.Agents)
                singleStudent.Agents.forEach(agentData => {
                    const oneAgent = [];
                    oneAgent.push(
                        <header className={styles.agentTitle}>
                            {`${agentData.WhoIs}: ${agentData.LastName} ${agentData.FirstName} ${agentData.MiddleName}`}
                        </header>
                    )
                    for (let agentField in agentFieldForVisibleSingleResult) {
                        const translateField = studentFieldForVisibleSingleResult[agentField];
                        console.log(agentField)
                        oneAgent.push(
                            <div className={styles.fieldSingleResult}>
                                <div>{translateField}</div> <div>{
                                    //@ts-ignore
                                    agentData[agentField] ? agentData[agentField] : '–'
                                }</div>
                            </div>
                        )
                    }
                    selectAgentsField.push(oneAgent)
                })

            return <div className={styles.single}>
                <header>
                    {`${singleStudent.LastName} ${singleStudent.FirstName} ${singleStudent.MiddleName}`}
                </header>
                <main>
                    {selectStudentField}
                    {selectAgentsField && selectAgentsField.map(agent =>
                        <div>
                            {agent}
                        </div>
                    )}
                </main>
            </div>
        }
        return <></>
    }


    const reset = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStatus('')
        setFindStudents(null)
    }

    const select = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (statusFind === StatusFind.perfectMatch)
            student.selectStudent(findStudents as IStudent)
        if (statusFind === StatusFind.matchesFound)
            student.selectStudent((findStudents as IStudent[])[selectStudentsFromList])
        const age = student.defineAge();
        if(age) notification.showInfo('Успешно', `Определен возраст выбранного ученика: ${age}.`)
            else notification.showError('Ошибка', 'Не удалось определить возраст выбранного ученика.')
        setStatus('')
    }

    return (
        <motion.section
            className={styles.wrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h1>{setTitleForDifferentStatus[statusFind]}</h1>
            {generateVision(findStudents, statusFind)}
            <div className={styles.buttonBlock}>
                {
                    statusFind === StatusFind.noMatches
                        ? <button onClick={reset}>Ок</button>
                        : <><button onClick={select}>
                            Выбрать
                        </button>
                            <button onClick={reset} style={{ marginLeft: '5vw' }}>
                                Отмена
                            </button></>
                }
            </div>
        </motion.section>
    )
}

export default ResultFind