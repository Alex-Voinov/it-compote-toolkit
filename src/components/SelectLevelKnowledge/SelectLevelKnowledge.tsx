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
    return (
        <section className={styles.wrapper}>
            <header>
                <div>Найденные дисциплины</div>
                <div>{`${FirstName} ${LastName}`}</div>
            </header>
            <main>
                {Disciplines.map(discipline => <div>
                    {discipline.Discipline}: {discipline.Level}
                </div>)}
            </main>
            <div className={styles.buttonBlock}>
                {setButtonTexts.map(level => <button
                    onClick={
                        e => {
                            e.preventDefault();
                            student.setLevel(level);
                        }
                    }>
                    {level}
                </button>)}
            </div>
        </section>
    )
}

export default SelectLevelKnowledge