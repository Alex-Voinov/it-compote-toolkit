import { FC, useContext, useState } from 'react'
import StartForm from '../../components/UI/SrartForm/StartForm'
import styles from './StartPage.module.css'
import ResultFind from '../../components/ResultFind/ResultFind'
import IStudent from '../../models/Student'
import { GlobalData } from '../..'
import SelectDisciplines from '../../components/SelectDisciplines/SelectDisciplines'
import { observer } from 'mobx-react-lite';
import { AnimatePresence } from "framer-motion";
import SelectLevelKnowledge from '../../components/SelectLevelKnowledge/SelectLevelKnowledge'
import PickGroup from '../../components/PickGroup/PickGroup'


const StartPage: FC = () => {
    const { student } = useContext(GlobalData)
    const [status, setStatus] = useState('');
    const [findStudents, setFindStudents] = useState<IStudent | IStudent[] | null>(null);
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
                    && !student.level.length
                    && (student.selectDiscipline.length
                        ? <SelectLevelKnowledge />
                        :
                        <SelectDisciplines />)
                }
                {student.level.length > 0 && student.suitableGroups === null && <PickGroup />}
            </AnimatePresence>
        </section>
    )
}

export default observer(StartPage)