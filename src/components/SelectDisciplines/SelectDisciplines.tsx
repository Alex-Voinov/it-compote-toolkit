import { FC, useContext, useState } from 'react'
import { GlobalData } from '../..'
import styles from './SelectDisciplines.module.css'
import { motion } from "framer-motion";

const SelectDisciplines: FC = () => {
    const { student } = useContext(GlobalData)
    const [disciplineNumber, setDisciplineNumber] = useState(-1);
    return (
        <motion.section
            className={styles.wrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h1>Выбор дисциплины</h1>
            <div>
                {
                    student.disciplines.length
                        ? student.disciplines.map((discipline, numberRow) => <div
                            className={styles.row}
                            style={numberRow === disciplineNumber ? { backgroundColor: '#5a3183' } : {}}
                            onClick={() => setDisciplineNumber(numberRow)}
                        >
                            {discipline}
                        </div>)
                        : 'Дисциплины не загружены'
                }
            </div>
            <button
                disabled={disciplineNumber === -1}
                className={disciplineNumber === -1 ? styles.blockButton : ''}
                onClick={e => {
                    e.preventDefault();
                    student.setSelectDiscipline(disciplineNumber)
                }}
            >
                Выбрать
            </button>
        </motion.section>
    )
}

export default SelectDisciplines