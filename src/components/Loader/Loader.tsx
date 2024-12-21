import { FC } from 'react'
import styles from './Loader.module.css'
import { motion } from "framer-motion";

const Loader: FC = () => {
    return (
        <motion.section
            className={styles.wrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <img src="%PUBLIC_URL%/svg/loader.svg" alt="loader" />
        </motion.section>
    )
}

export default Loader