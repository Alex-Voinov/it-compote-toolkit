import { FC, useContext } from 'react'
import styles from './SuitableGroups.module.css'
import { GlobalData } from '../..'
import { observer } from 'mobx-react-lite'


const SuitableGroups: FC = () => {
    const { student } = useContext(GlobalData)
    const suitableGroups = student.suitableGroups!;
    return (
        <section className={styles.wrapper}>
            <h1>Результат поиска</h1>
            <main>
                {suitableGroups.length > 0
                    ? student.suitableGroups!.map(group => <div
                        className={styles.row}
                        key={group.groupId}
                    >
                        <div className={styles.idBlock}>
                            <a href={`https://it-school.t8s.ru/Learner/Group/${group.groupId}`} target="_blank">{group.groupId}</a>
                        </div>
                        <div className={styles.groupContent}>
                            <h1>{group.lastTheme}</h1>
                            <h1>Средний возраст: {group.overAge}</h1>
                            {group.startTime && <h1>Время начала занятий: {group.startTime}</h1>}
                            {group.weekday && group.weekday.map((day, number) => <h1 key={day}>
                                {//@ts-ignore
                                    `${day} (${group.weekdaysName[number]}) ${group.weekday?.length !== number + 1 ? "," : ""}`}
                            </h1>)
                            }
                        </div>
                    </div>)
                    : <div className={styles.notResult}>
                        Подходящих групп не найденно
                    </div>
                }
            </main>
            <button onClick={e => {
                e.preventDefault();
                student.clearSuitableGroups()
                student.clear();
            }}>
                Новый запрос
            </button>
        </section>
    )
}

export default observer(SuitableGroups)