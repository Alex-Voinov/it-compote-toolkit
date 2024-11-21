import { FC, useState, Dispatch, SetStateAction } from 'react'
import StartInput from '../StartInput/StartInput'
import Server from '../../../servies/Server'
import styles from './StartForm.module.css'
import IStudent from '../../../models/Student'
import Loader from '../../Loader/Loader'


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
    return (
        <form className={styles.wrapper}>
            {isLoading&&<Loader/>}
            <h1>Запись в группу</h1>
            <p>Заполните информацию ниже</p>
            {inputs}
            <button onClick={e => {
                e.preventDefault()
                setLoading(true)
                Server.getStudent(...(inputsStates.map(state => state[0]) as [string, string, string])).then(result => {
                    setLoading(false)
                    if (result.data.status && result.data.studentsData) {
                        setStatus(result.data.status)
                        setFindStudents(result.data.studentsData)
                    }
                })
            }}>Подтвердить</button>
        </form>
    )
}

export default StartForm