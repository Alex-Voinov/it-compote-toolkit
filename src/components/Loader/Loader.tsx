import { FC } from 'react'
import styles from './Loader.module.css'

const Loader: FC = () => {
    return (
        <section className={styles.wrapper}>
            <img src="/svg/loader.svg" alt="loader" />
        </section>
    )
}

export default Loader