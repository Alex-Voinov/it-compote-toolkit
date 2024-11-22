import { createContext, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import Student from './stores/student';
import Ntf from './stores/ntf';

const student = new Student();
const notification = new Ntf()

export const GlobalData = createContext<{
  student: Student,
  notification: Ntf,
}>
  ({
    student,
    notification
  })


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);


