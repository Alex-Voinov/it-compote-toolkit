import { FC, useContext } from 'react'
import styles from './SelectLevelKnowledge.module.css'
import { GlobalData } from '../..'

const setButtonTexts = [
    'Easy',
    'Easy-medium',
    'Medium',
    'Medium-hard',
    'Hard',
]

const SelectLevelKnowledge: FC = () => {
    const { student } = useContext(GlobalData)
    const { FirstName, LastName, Disciplines } = student.student!
    const buttons = []
    let buffer = []
    for (let level of setButtonTexts) {
        buffer.push(
            <button
                onClick={
                    e => {
                        e.preventDefault();
                        student.setLevel(level);
                    }
                }>
                {level}
            </button>
        )
        if (buffer.length === 2) {
            buttons.push(<div>
                {buffer}
            </div>)
            buffer = []
        }
    }
    if (buffer) buttons.push(
        <div style={{ justifyContent: 'center' }}>
            {buffer}
        </div>
    )
    return (
        <section className={styles.wrapper}>
            <header>
                <div>Найденные дисциплины</div>
                <div>{`${FirstName} ${LastName}`}</div>
            </header>
            <main>
                {Disciplines.length ? Disciplines.map(discipline => <div
                    className={styles.disciplineRow}
                >
                    <div>
                        {discipline.Discipline}
                    </div>
                    <div>
                        {discipline.Level?discipline.Level:'Не указано'}
                    </div>
                </div>)
                    : <div className={styles.notFound}>
                        У студента не найдено ни одной активной или завершенной дисциплины.
                    </div>}
            </main>
            <div className={styles.buttonBlock}>
                {buttons}
            </div>
        </section>
    )
}

export default SelectLevelKnowledge