import { CSSProperties, FC, useContext, useEffect } from 'react'
import styles from './Notification.module.css'
import { GlobalData } from '../../..'
import { observer } from 'mobx-react-lite'
import { motion } from "framer-motion";
import { StatusNtf } from '../../../stores/ntf';

const setStatusStyles: {[key: number]: CSSProperties} = {
    [StatusNtf.info]: {
        '--main_color': 'rgb(53, 172, 172)',
        '--second_color': 'rgb(31, 129, 129)',
        backgroundColor: 'rgba(26, 124, 131, 0.466)',
    } as CSSProperties, 
    [StatusNtf.error]: {
        '--main_color': 'rgb(202, 17, 33)',
        '--second_color': 'rgb(175, 0, 15)',
        backgroundColor: 'rgba(131, 26, 35, 0.466)',
    } as CSSProperties, 
}

const Notification: FC = () => {
    const { notification } = useContext(GlobalData)
    useEffect(() => {
        const autodestruction = setTimeout(() => notification.hide(), 5000)
        return () => clearTimeout(autodestruction);
    }, [])
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.wrapper}
            style={setStatusStyles[notification.status]}
        >
            <header>
                <h1>{notification.title}</h1>
                <div onClick={() => notification.hide()}>
                    &times;
                </div>
            </header>
            <p>{notification.text}</p>
        </motion.section>
    )
}

export default observer(Notification)