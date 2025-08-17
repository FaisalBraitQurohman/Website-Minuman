// src/fontLoader.js
import WebFont from 'webfontloader';

export const loadFonts = () => {
    return new Promise((resolve) => {
        WebFont.load({
            google: {
                families: ['Antonio:100..700'] // Font dari Google Fonts
            },
            custom: {
                families: ['ProximaNova, sans-serif'], // Font lokal Anda
                urls: ['/index.css'] // Path ke CSS tempat @font-face didefinisikan
            },
            active: () => {
                resolve(); // Beri tahu bahwa font sudah aktif
            }
        });
    });
};