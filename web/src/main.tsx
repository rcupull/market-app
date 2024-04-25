import ReactDOM from 'react-dom/client';

import { App } from './App.tsx';
import { Providers } from './providers.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <App />
  </Providers>,
);
