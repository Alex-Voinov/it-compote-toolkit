import { FC, useContext, useState } from 'react'
import StartForm from '../../components/UI/SrartForm/StartForm'
import styles from './StartPage.module.css'
import ResultFind from '../../components/ResultFind/ResultFind'
import IStudent from '../../models/Student'
import { GlobalData } from '../..'
import SelectDisciplines from '../../components/SelectDisciplines/SelectDisciplines'
import { observer } from 'mobx-react-lite';

const StartPage: FC = () => {
    const { store } = useContext(GlobalData)
    const [status, setStatus] = useState('');
    const [findStudents, setFindStudents] = useState<IStudent | IStudent[] | null>(null);
    return (
        <section className={styles.wrapper}>
            <StartForm setStatus={setStatus} setFindStudents={setFindStudents} />
            {status && <ResultFind findStudentsState={[findStudents, setFindStudents]} statusState={[status, setStatus]} />}
            {store.student && !store.selectDiscipline.length && <SelectDisciplines />}
        </section>
    )
}

export default observer(StartPage)