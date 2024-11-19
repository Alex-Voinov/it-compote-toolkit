import { FC, useState, Dispatch, SetStateAction } from 'react'
import StartInput from '../StartInput/StartInput'

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
        placeholder: 'Номер телефона',
    }
]

const StartForm: FC = () => {
    const inputsStates = new Array(setInputs.length).fill('').map(useState) as [string, Dispatch<SetStateAction<string>>][]
    const inputs = setInputs.map(
        (inputData, number) => <StartInput
            type={inputData.type}
            placeholder={inputData.placeholder}
            state={inputsStates[number]}
        />
    )
    return (
        <form>
            {inputs}
            <button onClick={e => {
                e.preventDefault()
                // запрос на сервер
            }}>Подтвердить</button>
        </form>
    )
}

export default StartForm