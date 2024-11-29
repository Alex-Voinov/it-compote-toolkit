import { FC, useContext, useEffect, useRef, useState } from 'react'
import { GlobalData } from '../..'
import styles from './PickGroup.module.css'
import { observer } from 'mobx-react-lite';
import range from '../../utilities/range';
import { setButtonTexts } from '../SelectLevelKnowledge/SelectLevelKnowledge';
import Loader from '../Loader/Loader';

interface IRowField {
    title: string;
    buttonText: string;
    isComplete?: boolean;
    variables: string[];
    setupNewValue: (val: string) => void;
}

const RowField: FC<IRowField> = ({ title, buttonText, variables, setupNewValue, isComplete = true }) => {
    const [openDropdawn, setOpenDropdawn] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpenDropdawn(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return <div className={styles.row}>
        <div className={styles.title}>{title}</div>
        <button
            style={{ backgroundColor: isComplete ? 'rgb(63, 224, 189)' : 'rgb(107, 107, 107)' }}
            onClick={e => {
                e.preventDefault();
                setOpenDropdawn(true);
            }}
        >
            {buttonText}
        </button>
        {openDropdawn && <div
            ref={dropdownRef}
            className={styles.dropdawn}
        >
            {variables.map(variable => <div onClick={() => {
                setOpenDropdawn(false)
                setupNewValue(variable)
            }}>
                {variable}
            </div>)}
        </div>}
    </div>
};

const PickGroup: FC = () => {
    const { student, notification } = useContext(GlobalData)
    const [loadRequest, setLoadRequest] = useState(false)
    const [faledCheckAutoselectedTheme, setFaledCheckAutoselectedTheme] = useState(false)
    const rowData: IRowField[] = [
        {
            title: 'Возраст',
            buttonText: student.age
                ? student.age.toString()
                : 'Не определен',
            isComplete: Boolean(student.age),
            variables: range(5, 50).map(String),
            setupNewValue: student.setupAge.bind(student),
        },
        {
            title: 'Дисциплина',
            buttonText: student.selectDiscipline,
            variables: student.disciplines,
            setupNewValue: student.setupDiscipline.bind(student),
        },
        {
            title: 'Последняя тема',
            buttonText: student.selectLastTheme
                ? student.selectLastTheme
                : (student.selectDiscipline && student.selectDiscipline in student.lastThems)
                    ? student.lastThems[student.selectDiscipline].Description.replace(/^[\s*]+|[\s*]+$/g, '')
                    : 'Не определена',
            isComplete: Boolean(student.selectLastTheme || !faledCheckAutoselectedTheme && student.selectDiscipline && student.selectDiscipline in student.lastThems),
            variables: (student.selectDiscipline && student.selectDiscipline in student.allTopic)
                ? student.allTopic[student.selectDiscipline].map(
                    str => str.replace(/^[\s*]+|[\s*]+$/g, '')
                ).filter(
                    dis => dis && !(dis.toLowerCase().includes('заглушка'))
                )
                : ['Нет тем по выбранной дисциплине'],
            setupNewValue: student.setupLastTheme.bind(student),
        },
        {
            title: 'Уровень',
            buttonText: student.level,
            variables: setButtonTexts,
            setupNewValue: student.setupLevel.bind(student),
        },
    ]
    const hasAllData = rowData.map(el => !('isComplete' in el) || el.isComplete).every(element => element === true);
    return (
        <div className={styles.wrapper}>
            <h1>Проверка введенных данных</h1>
            <h2>{`Студент: ${student.student?.LastName} ${student.student?.FirstName}`}</h2>
            {rowData.map(RowField)}
            <button
                disabled={!hasAllData}
                className={styles.sendData}
                style={
                    hasAllData ?
                        {
                            backgroundColor: 'rgb(63, 224, 189',
                            cursor: 'pointer'
                        }
                        : {
                            backgroundColor: 'rgb(107, 107, 107)',
                            cursor: 'not-allowed'
                        }
                }
                onClick={e => {
                    e.preventDefault();
                    if (student.selectLastTheme.length || student.checkAutoselectedThemes()) {

                        setLoadRequest(true)
                        student.pickGroup().then(
                            () => {

                            }
                        ).catch().finally(() => {
                            setLoadRequest(false);
                        })
                    }
                    else {
                        setFaledCheckAutoselectedTheme(true);
                        notification.showError('Не удачно', 'Автоопределнная тема не кореектна, укажите другую из списка.')
                    }
                }}
            >
                Найти группы
            </button>
            {loadRequest && <Loader />}
        </div>
    )
}

export default observer(PickGroup)