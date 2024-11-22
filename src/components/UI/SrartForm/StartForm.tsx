import { FC, useState, Dispatch, SetStateAction, useContext } from 'react'
import StartInput from '../StartInput/StartInput'
import Server from '../../../servies/Server'
import styles from './StartForm.module.css'
import IStudent from '../../../models/Student'
import Loader from '../../Loader/Loader'
import { GlobalData } from '../../..'


const setInputs = [
    {
        type: 'text',
        placeholder: 'ФИО ученика',
    },
    {
        type: 'email',
        placeholder: 'Email...',
    },
    {
        type: 'tel',
        placeholder: 'Номер телефона...',
    }
]

interface IStartForm {
    setStatus: Dispatch<SetStateAction<string>>,
    setFindStudents: Dispatch<SetStateAction<IStudent | IStudent[] | null>>
}

const StartForm: FC<IStartForm> = ({ setStatus, setFindStudents }) => {
    const { notification } = useContext(GlobalData)
    const [isLoading, setLoading] = useState(false);
    const inputsStates = new Array(setInputs.length).fill('').map(useState) as [string, Dispatch<SetStateAction<string>>][]
    const inputs = setInputs.map(
        (inputData, number) => <StartInput
            type={inputData.type}
            placeholder={inputData.placeholder}
            key={inputData.placeholder}
            state={inputsStates[number]}
        />
    )
    const hasAnyData = inputsStates.map(state => state[0]).some(inputText => inputText.trim() !== '')
    return (
        <form className={styles.wrapper}>
            {isLoading && <Loader />}
            <h1>Запись в группу</h1>
            <p>Заполните информацию ниже</p>
            {inputs}
            <button
                disabled={!hasAnyData}
                onClick={e => {
                    e.preventDefault()
                    setLoading(true)
                    Server.getStudent(...(inputsStates.map(state => state[0]) as [string, string, string])).then(result => {
                        setLoading(false)
                        if (result.data.status && result.data.studentsData) {
                            setStatus(result.data.status)
                            setFindStudents(result.data.studentsData)
                        }
                        else {
                            notification.notifyHHBadResponse();
                        }
                    }).catch(er => {
                        setLoading(false)
                        notification.showError(
                            'Ошибка',
                            `Список студентов из hollohop не загружен: ${er.message ? er.message : 'Код ошибки не получен'}.`
                        )
                    })
                }}>Подтвердить</button>
        </form>
    )
}

export default StartForm