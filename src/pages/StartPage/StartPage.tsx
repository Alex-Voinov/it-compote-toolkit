import { FC, useContext, useEffect, useState } from 'react'
import StartForm from '../../components/UI/SrartForm/StartForm'
import styles from './StartPage.module.css'
import ResultFind from '../../components/ResultFind/ResultFind'
import IStudent from '../../models/Student'
import { GlobalData } from '../..'
import SelectDisciplines from '../../components/SelectDisciplines/SelectDisciplines'
import { observer } from 'mobx-react-lite';
import Server from '../../servies/Server'

const StartPage: FC = () => {
    const { store } = useContext(GlobalData)
    const [status, setStatus] = useState('');
    const [findStudents, setFindStudents] = useState<IStudent | IStudent[] | null>(null);
    useEffect(() => {
        if (store.student && store.selectDiscipline.length) {
            store.prepareDataForGroupSearch()
            if (store.age && store.lastThems.length)
            Server.pickGroup(
                store.selectDiscipline,
                store.level,
                store.age,
                store.lastThems
            )
        }
    }, [store.selectDiscipline])
    return (
        <section className={styles.wrapper}>
            <StartForm setStatus={setStatus} setFindStudents={setFindStudents} />
            {status && <ResultFind
                findStudentsState={[findStudents, setFindStudents]}
                statusState={[status, setStatus]}
            />}
            {store.student && !store.selectDiscipline.length && <SelectDisciplines />}
        </section>
    )
}

export default observer(StartPage)