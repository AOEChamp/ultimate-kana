import React, { useState, useEffect, memo } from 'react';
import { Dimensions } from 'react-native';

import Spark from './Spark';

const COLORS = ['#f7b54a', '#e6395b'];

const randFloat = (min, max) => Math.random() * (max - min) + min;

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const Explosion = memo(
  ({
    minSize,
    maxSize,
    minDuration,
    maxDuration,
    startX,
    startY,
    minDistance,
    maxDistance,
    sparkCount,
    degreeRange,
    animating,
  }) => {
    const [sparks, setSparks] = useState([]);

    useEffect(() => {
      if (!animating || sparks.length === 0) {
        const newSparks = [];
        for (let i = 0; i < sparkCount; i++) {
          const duration = randInt(minDuration, maxDuration);
          const distance = randInt(minDistance, maxDistance);
          const size = randInt(minSize, maxSize);
          const color = COLORS[randInt(0, COLORS.length)];
          const radians = ((Math.PI * degreeRange) / 100) * randFloat(-1, 1);
          newSparks.push({
            key: i,
            duration,
            distance,
            color,
            size,
            radians,
          });
        }
        setSparks(newSparks);
      }
    }, [animating]);

    return (
      <>
        {sparks.map(({ key, duration, distance, color, size, radians }) => (
          <Spark
            key={key}
            duration={duration}
            distance={distance}
            size={size}
            color={color}
            startX={startX}
            startY={startY}
            radians={radians}
            animating={animating}
          />
        ))}
      </>
    );
  }
);

Explosion.displayName = 'Explosion';

export const DefaultExplosion = ({ animating }) => {
  const { height, width } = Dimensions.get('window');
  return (
    <Explosion
      startX={width / 2}
      startY={height / 4}
      minSize={9}
      maxSize={11}
      minDistance={60}
      maxDistance={150}
      minDuration={500}
      maxDuration={700}
      sparkCount={80}
      degreeRange={30}
      animating={animating}
    />
  );
};
