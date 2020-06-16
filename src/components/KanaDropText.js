import React from 'react';
import WebViewCanvas from './WebViewCanvas';

const KanaDropText = ({width, height, style}) => {
    const onCanvasLoad = (canvas) => {
        const ctx = canvas.getContext('2d');
        const letters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'.split('');    
        const columnWidth = 10;
        const columns = [];
        for (let i = 0; i < canvas.width / columnWidth; i++) {
          columns[i] = 1;
        }
    
        const draw = () => {
          ctx.fillStyle = 'rgba(255, 255, 255, .1)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          for (let i = 0; i < columns.length; i++) {
            const letter = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillStyle = '#000';
            ctx.fillText(letter, i * columnWidth, columns[i] * columnWidth);
            columns[i]++;
            if (columns[i] * columnWidth > canvas.height && Math.random() > .999) {
              columns[i] = 0;
            }
          }
        }
        setInterval(draw, 30);
    };

    return (
        <WebViewCanvas
            style={style}
            width={width}
            height={height}
            onCanvasLoad={onCanvasLoad}
        />
    );
}

export default KanaDropText;
