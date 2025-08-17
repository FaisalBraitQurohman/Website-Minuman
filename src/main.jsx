// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { loadFonts } from './fontLoader'; // <-- Impor fungsi loader

loadFonts().then(() => {
    // Kode ini hanya akan berjalan SETELAH semua font dimuat
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
});