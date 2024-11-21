import { createContext, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import Store from './store';

const store = new Store();

export const GlobalData = createContext<{
  store: Store,
}>
  ({
    store,
  })


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);


