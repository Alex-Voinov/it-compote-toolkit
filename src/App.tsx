import { FC, useContext, useEffect } from 'react';
import StartPage from './pages/StartPage/StartPage';
import { GlobalData } from '.';



const App: FC = () => {
  const { store } = useContext(GlobalData)
  useEffect(() => {
    store.uploadDisciplines()
  }, [])
  return (
    <section className="App">
      <StartPage />
    </section>
  );
}

export default App;
