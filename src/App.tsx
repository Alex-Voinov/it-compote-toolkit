import { FC, useContext, useEffect } from 'react';
import StartPage from './pages/StartPage/StartPage';
import { GlobalData } from '.';
import Notification from './components/UI/Notification/Notification';
import { observer } from 'mobx-react-lite';
import { AnimatePresence } from "framer-motion";


const App: FC = () => {
  const { student, notification } = useContext(GlobalData)
  useEffect(() => {
    student.uploadDisciplines().then(
      disciplines => notification.showInfo(
        'Успешно',
        `Коллечество загруженных дисциплин из hollohop: ${disciplines?.length}.`
      )
    ).catch(
      (error) => notification.showError(
        'Ошибка',
        `Дисциплины из hollohop не загружены: ${error.message ? error.message : 'код ошибки не получен'}.`
      )
    )
    student.getTopicsAcrossDisciplines()
  }, [])
  return (
    <>
      <StartPage />
      {notification.exist() && <AnimatePresence>
        <Notification />
      </AnimatePresence>
      }
    </>
  );
}

export default observer(App);
