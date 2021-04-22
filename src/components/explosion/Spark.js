import React, { useEffect, useRef, memo } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

const easeOut = Easing.bezier(0, 0, 0.58, 1);

const Spark = memo(({ startX, startY, distance, radians, size, duration, color, animating }) => {
  const sizeTiming = useRef(new Animated.Value(0)).current;
  const opacityTiming = useRef(new Animated.Value(0)).current;
  const translateTiming = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current = Animated.parallel(
      [
        Animated.sequence([
          Animated.timing(opacityTiming, {
            toValue: 1,
            duration: duration * 0.2,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(opacityTiming, {
            toValue: 2,
            delay: duration * 0.8,
            duration: duration * 0.2,
            easing: easeOut,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(translateTiming, {
          toValue: 1,
          duration: duration * 0.4,
          easing: easeOut,
          useNativeDriver: true,
        }),
        Animated.timing(sizeTiming, {
          toValue: 1,
          delay: duration * 0.2,
          duration: duration * 0.8,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ],
      { stopTogether: false }
    );
  }, []);
  useEffect(() => {
    if (animationRef.current) {
      if (animating) {
        opacityTiming.setValue(0);
        sizeTiming.setValue(0);
        translateTiming.setValue(0);
        animationRef.current.start();
      } else {
        animationRef.current.reset();
      }
    }
  }, [animating]);
  const translateX = translateTiming.interpolate({
    inputRange: [0, 1],
    outputRange: [0, distance * Math.sin(radians)],
  });
  const translateY = translateTiming.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -distance * Math.cos(radians)],
  });
  const opacity = opacityTiming.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });
  const scale = sizeTiming.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.001],
  });
  return (
    <Animated.View
      style={[
        styles.spark,
        {
          transform: [{ translateX }, { translateY }, { scale }],
          opacity,
          backgroundColor: color,
          bottom: startY,
          left: startX,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );
});

export default Spark;

const styles = StyleSheet.create({
  spark: {
    position: 'absolute',
  },
});
