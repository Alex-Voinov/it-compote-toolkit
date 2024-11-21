import { FC } from 'react'
import styles from './ResultFind.module.css'
import IStudent from '../../models/Student'

interface IResultFind {
    status: string,
    findStudents: IStudent | IStudent[] | null
}

const createDataRow = (students: IStudent) => {
    return <div className={styles.row}>
        {students.LastName} {students.MiddleName} {students.FirstName}
    </div>
}

const ResultFind: FC<IResultFind> = ({ status, findStudents }) => {
    console.log(findStudents)
    return (
        <section className={styles.wrapper}>
            <h1>{
                status === 'matches found'
                    ? 'Лучшие совпадения'
                    : status === 'perfect match'
                        ? 'Пользователь найден'
                        : 'Поиск не дал результатов'
            }
            </h1>
            {Array.isArray(findStudents)
                ? (findStudents as IStudent[]).map(createDataRow)
                : findStudents && createDataRow(findStudents)}
        </section>
    )
}

export default ResultFind