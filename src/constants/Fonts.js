import React from 'react';
import { Asset } from 'expo';
import * as opentype from 'opentype.js';

export const LoadFonts = {
    'NotoSansCJK': require('../assets/fonts/NotoSansCJKjp-Regular.otf'),
    'Arkipelago': require('../assets/fonts/Arkipelago.otf'),
}

export const SVGFonts = {
    'HiraKakuPro': require('../assets/fonts/HiraKakuPro-W3-Kana.otf'),
    'HiraMinoPro': require('../assets/fonts/HiraMinoPro-W3-Kana.otf'),
}

export const FontList = [
    'System',
    'HiraKakuPro',
    'HiraMinoPro',
    'NotoSansCJK',
]

function loadSVGFontAsync(fontModule) {
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

export function loadAllSVGFonts() {
    let promises = [];
    Object.keys(SVGFonts).forEach(fontName => {
        let promise = loadSVGFontAsync(SVGFonts[fontName])
            .then((font) => {
                SVGFonts[fontName] = font;
            });
        promises.push(promise);
    });
    return Promise.all(promises);
}
