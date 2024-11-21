import { FC, useContext, useState } from 'react'
import { GlobalData } from '../..'
import styles from './SelectDisciplines.module.css'

const SelectDisciplines: FC = () => {
    const { store } = useContext(GlobalData)
    const [disciplineNumber, setDisciplineNumber] = useState(-1);
    return (
        <section className={styles.wrapper}>
            <h1>Выбор дисциплины</h1>
            <div>
                {
                    store.disciplines.length
                        ? store.disciplines.map((discipline, numberRow) => <div
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
                className={disciplineNumber === -1 ?  styles.blockButton: ''}
                onClick={e=>{
                    e.preventDefault();
                    store.setSelectDiscipline(disciplineNumber)
                }}
            >
                Выбрать
            </button>
        </section>
    )
}

export default SelectDisciplines