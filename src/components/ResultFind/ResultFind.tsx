import { Dispatch, FC, SetStateAction, MouseEvent } from 'react'
import styles from './ResultFind.module.css'
import IStudent from '../../models/Student'

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
            student => <div className={styles.row}>
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



const ResultFind: FC<IResultFind> = ({ statusState, findStudentsState }) => {

    const [status, setStatus] = statusState;
    const [findStudents, setFindStudents] = findStudentsState;
    const statusFind = status === 'matches found'
        ? StatusFind.matchesFound
        : status === 'perfect match'
            ? StatusFind.perfectMatch
            : StatusFind.noMatches
    
    const reset = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStatus('')
        setFindStudents(null)
    }

    return (
        <section
            className={styles.wrapper}
        >
            <h1>{setTitleForDifferentStatus[statusFind]}</h1>
            {generateVision(findStudents, statusFind)}
            <div className={styles.buttonBlock}>
                {
                    statusFind === StatusFind.noMatches
                        ? <button onClick={reset}>Ок</button>
                        : <><button>Выбрать</button>
                            <button onClick={reset} style={{marginLeft: '5vw'}}>
                                Отмена
                            </button></>
                }
            </div>
        </section>
    )
}

export default ResultFind