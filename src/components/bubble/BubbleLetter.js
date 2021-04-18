import React, { useEffect, useRef, memo } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

const BubbleLetter = memo(
  ({ height, duration, offset, position, fontSize, text, color, fontFamily }) => {
    const timing = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const easeInOut = Easing.bezier(0.42, 0, 0.58, 1);
      const animation = Animated.timing(timing, {
        toValue: 100,
        duration,
        easing: easeInOut,
        useNativeDriver: true,
      });
      animation.start();
    }, []);
    const translateY = timing.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -height],
    });
    const opacity = timing.interpolate({
      inputRange: [0, 25, 50, 75, 100],
      outputRange: [0, 1, 1, 0.75, 0],
    });
    return (
      <Animated.Text
        style={[
          styles.text,
          {
            transform: [{ translateY }],
            [position]: offset,
            fontSize,
            opacity,
            color,
            fontFamily,
          },
        ]}
      >
        {text}
      </Animated.Text>
    );
  }
);

export default BubbleLetter;

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    bottom: 0,
  },
});
