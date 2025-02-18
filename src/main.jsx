import { createRoot } from 'react-dom/client'
import './index.css'
import { MainLayout } from './layout/MainLayout.jsx'
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')).render(
    <MainLayout />
 
)
