import React from 'react';
import { Asset } from 'expo';
import * as opentype from 'opentype.js';

export const LoadFonts = {
    'HiraKakuPro': require('../assets/fonts/HiraKakuPro-W3.otf'),
    'HiraMinoPro': require('../assets/fonts/HiraMinoPro-W3.otf'),
    'NotoSansCJK': require('../assets/fonts/NotoSansCJKjp-Regular.otf'),
}

export const JSFonts = {}

export const JapaneseFonts = [
    'System',
    'HiraKakuPro',
    'HiraMinoPro',
    'NotoSansCJK',
]

export function loadFontAsync(fontModule) {
    return new Promise((resolve, reject) => {
        const file = Asset.fromModule(fontModule)

        opentype.load(file.uri, function (err, font) {
            if (err) {
                return reject(err);
            }
            resolve(font);
        });
    });
}

export function loadAllFonts() {
    let promises = [];
    Object.keys(LoadFonts).forEach(fontName => {
        let promise = loadFontAsync(LoadFonts[fontName])
            .then((font) => {
                JSFonts[fontName] = font;
            });
        promises.push(promise);
    });
    return Promise.all(promises);
}
