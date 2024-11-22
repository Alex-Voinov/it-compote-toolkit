import { FC, useContext, useState } from 'react'
import { GlobalData } from '../..'
import styles from './SelectDisciplines.module.css'
import { motion } from "framer-motion";
import { observer } from 'mobx-react-lite';

const SelectDisciplines: FC = () => {
    const { student, notification } = useContext(GlobalData)
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
                        :
                        <div className={styles.notLoaded}>
                            <h1>Дисциплины не загружены</h1>
                            <button onClick={() => {
                                student.uploadDisciplines().then(
                                    disciplines => notification.showInfo(
                                        'Успешно',
                                        `Коллечество загруженных дисциплин из hollohop: ${disciplines?.length}.`
                                    )
                                ).catch(
                                    (error) => notification.showError(
                                        'Ошибка',
                                        `Дисциплины из hollohop не загружены: ${error.message ? error.message : 'код ошибки не получен'}.`
                                    )
                                )
                            }}>Загрузить</button>
                        </div>
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

export default observer(SelectDisciplines)