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
import SuitableGroups from '../../components/SuitableGroups/SuitableGroups'


const StartPage: FC = () => {
    const { student } = useContext(GlobalData)
    const [status, setStatus] = useState('');
    const [findStudents, setFindStudents] = useState<IStudent | IStudent[] | null>(null);
    return (
        <section className={styles.wrapper}>
            {(status || student.student) && <div
                className={styles.back}
                onClick={() => {
                    if (Array.isArray(student.suitableGroups)) {
                        student.suitableGroups = null
                        return;
                    }
                    if (student.level.length > 0) {
                        student.level = ''
                        return;
                    }
                    if (student.selectDiscipline.length) {
                        student.selectDiscipline = ''
                        return;
                    }
                    if (student.student) {
                        student.student = null;
                        return;
                    }
                    if (status) {
                        setStatus('')
                        return;
                    }
                }}
            >
                <img src="%PUBLIC_URL%/svg/back.svg" alt="go back" />
            </div>}
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
            </AnimatePresence>
            {(student.level.length > 0 && !Array.isArray(student.suitableGroups)) && <PickGroup />}
            {Array.isArray(student.suitableGroups) && <SuitableGroups />}
        </section>
    )
}

export default observer(StartPage)