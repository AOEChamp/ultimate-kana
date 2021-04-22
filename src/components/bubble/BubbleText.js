import React, { useState, useRef, memo } from 'react';
import { Dimensions } from 'react-native';
import useInterval from 'react-useinterval';

import BubbleLetter from './BubbleLetter';

const GOLDEN_RATIO = 0.618033988749895;

// https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
const generateRandomPastelColor = () => {
  const hue = Math.floor((Math.random() * 360 + GOLDEN_RATIO * 360) % 360);
  const sat = 20 + Math.floor(Math.random() * 70);
  const val = 20 + Math.floor(Math.random() * 30);
  return `hsl(${hue}, ${sat}%, ${val}%)`;
};

// Based on https://github.com/blakazulu/Ngx-Sbz-Text-Animation
const BubbleText = memo(
  ({ maxFontSize, minFontSize, maxOffest, maxDuration, textPool, fontFamily }) => {
    const keyRef = useRef(0);
    const [bubbles, setBubbles] = useState([]);
    const { height, width } = Dimensions.get('window');

    useInterval(() => {
      const duration = Math.floor(Math.random() * maxDuration);
      const font = Array.isArray(fontFamily)
        ? fontFamily[Math.floor(Math.random() * fontFamily.length)]
        : fontFamily;
      setBubbles((oldBubbles) => [
        ...oldBubbles,
        {
          key: keyRef.current++,
          duration,
          offset: Math.floor(Math.random() * ((maxOffest / 100) * width)),
          position: Math.round(Math.random()) ? 'left' : 'right',
          fontSize: minFontSize + Math.floor(Math.random() * (maxFontSize - minFontSize)),
          text: textPool[Math.floor(Math.random() * textPool.length)],
          color: generateRandomPastelColor(),
          font,
        },
      ]);
      setTimeout(() => setBubbles((oldBubbles) => oldBubbles.slice(1)), duration);
    }, 100);

    return (
      <>
        {bubbles.map(({ key, duration, offset, position, fontSize, text, color, font }) => (
          <BubbleLetter
            key={key}
            height={height}
            duration={duration}
            offset={offset}
            position={position}
            fontSize={fontSize}
            text={text}
            color={color}
            fontFamily={font}
          />
        ))}
      </>
    );
  }
);

BubbleText.displayName = 'BubbleText';

export default BubbleText;
