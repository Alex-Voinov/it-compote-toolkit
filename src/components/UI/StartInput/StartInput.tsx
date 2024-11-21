import { FC, Dispatch, SetStateAction } from 'react'
import styles from './StartInput.module.css'


interface IStartInput {
    placeholder: string,
    type: string,
    state: [string, Dispatch<SetStateAction<string>>],
}

const StartInput: FC<IStartInput> = ({ placeholder, type, state }) => {

    const [content, setContent] = state;

    return (
        <input
            autoComplete='none'
            className={styles.wrapper}
            placeholder={placeholder}
            type={type}
            value={content}
            onChange={e => setContent(e.target.value)}
        />
    )
}

export default StartInput