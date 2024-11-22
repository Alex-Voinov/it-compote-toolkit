import { FC, useContext, useEffect, useState } from 'react'
import StartForm from '../../components/UI/SrartForm/StartForm'
import styles from './StartPage.module.css'
import ResultFind from '../../components/ResultFind/ResultFind'
import IStudent from '../../models/Student'
import { GlobalData } from '../..'
import SelectDisciplines from '../../components/SelectDisciplines/SelectDisciplines'
import { observer } from 'mobx-react-lite';
import { AnimatePresence } from "framer-motion";
import SelectLevelKnowledge from '../../components/SelectLevelKnowledge/SelectLevelKnowledge'


const StartPage: FC = () => {
    const { student } = useContext(GlobalData)
    const [status, setStatus] = useState('');
    const [findStudents, setFindStudents] = useState<IStudent | IStudent[] | null>(null);
    // useEffect(() => {
    //     (student.selectDiscipline)
    //     if (student.student && student.selectDiscipline.length && student.level) {
    //         student.prepareDataForGroupSearch()
    //         if (student.age && student.lastThems.length)
    //             Server.pickGroup(
    //                 student.selectDiscipline,
    //                 student.level,
    //                 student.age,
    //                 student.lastThems
    //             )
    //         else notification.showError(
    //             'Ошибка',
    //             'Поиск группы не возможен, так как не установен возраст ребенка и последняя пройденная тема'
    //         )
    //     } else notification.showError(
    //         'Ошибка',
    //         'Подготовка данных для поиска группы не возможна, так как не выбрана дисциплина, студент или уровень знаний'
    //     )
    // }, [student.selectDiscipline])
    return (
        <section className={styles.wrapper}>
            <StartForm setStatus={setStatus} setFindStudents={setFindStudents} />
            <AnimatePresence>
                {status &&
                    <ResultFind
                        findStudentsState={[findStudents, setFindStudents]}
                        statusState={[status, setStatus]}
                    />
                }
                {student.student
                    && (student.selectDiscipline.length
                    ? <SelectLevelKnowledge />
                    :
                    <SelectDisciplines />)
                }
            </AnimatePresence>
        </section>
    )
}

export default observer(StartPage)