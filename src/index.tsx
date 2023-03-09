import { createRoot } from 'react-dom/client';
import "antd/dist/antd.css";
import "./index.css";
import Form from './form';

const test: any = document.getElementById('container'); 
createRoot(test).render(<Form />);
