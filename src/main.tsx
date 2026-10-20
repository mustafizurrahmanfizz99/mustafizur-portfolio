try{localStorage.removeItem('mr_portfolio_full_cms_v2');sessionStorage.removeItem('mr_portfolio_auth_v2');}catch(e){}
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
