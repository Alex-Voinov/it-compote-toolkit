import { FC, useState } from 'react'
import StartForm from '../../components/UI/SrartForm/StartForm'
import styles from './StartPage.module.css'
import ResultFind from '../../components/ResultFind/ResultFind'
import IStudent from '../../models/Student'

const StartPage: FC = () => {
    const [status, setStatus] = useState('');
    const [findStudents, setFindStudents] = useState<IStudent | IStudent[] | null>(null);

    return (
        <section className={styles.wrapper}>
            <StartForm setStatus={setStatus} setFindStudents={setFindStudents} />
            {status && <ResultFind findStudentsState={[findStudents, setFindStudents]} statusState={[status, setStatus]}/>}
        </section>
    )
}

export default StartPage