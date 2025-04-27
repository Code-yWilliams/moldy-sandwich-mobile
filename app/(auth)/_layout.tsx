import { BlurView } from "expo-blur";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
} from "react-native-reanimated";
import {
  View,
  StyleSheet,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import { Slot } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const COLORS = (colorScheme: ColorSchemeName) => ({
  neonRed: colorScheme === "dark" ? "#FF174433" : "#FF174466",
  neonPurple: colorScheme === "dark" ? "#7C4DFF33" : "#7C4DFF66",
  neonBlue: colorScheme === "dark" ? "#00B0FF33" : "#00B0FF66",
  neonYellow: colorScheme === "dark" ? "#FFEA0033" : "#FFEA0066",
  neonMagenta: colorScheme === "dark" ? "#D500F933" : "#D500F966",
});

const BLOBS = (colorScheme: ColorSchemeName) =>
  [
    {
      size: 340,
      speedMultiplier: 0.4,
      rangeX: 250,
      rangeY: 200,
      color: COLORS(colorScheme).neonRed,
    },
    {
      size: 290,
      speedMultiplier: 0.3,
      rangeX: -280,
      rangeY: 180,
      color: COLORS(colorScheme).neonPurple,
    },
    {
      size: 350,
      speedMultiplier: 0.25,
      rangeX: 200,
      rangeY: -220,
      color: COLORS(colorScheme).neonBlue,
    },
    {
      size: 260,
      speedMultiplier: 0.35,
      rangeX: -230,
      rangeY: -190,
      color: COLORS(colorScheme).neonYellow,
    },
    {
      size: 290,
      speedMultiplier: 0.28,
      rangeX: -180,
      rangeY: 240,
      color: COLORS(colorScheme).neonMagenta,
    },
  ] as const;

const ANIMATION_CONFIG = {
  baseSpeed: 30000,
  startXRange: 200,
  startYRangeEarly: { min: -600, max: -200 },
  startYRangeLate: { min: 200, max: 600 },
} as const;

interface AuthLayoutProps {
  title: string;
  formHeight?: number;
  children: React.ReactNode;
}

const AuthLayout = () => {
  const colorScheme = useColorScheme();

  const blobs = BLOBS(colorScheme).map(() => ({
    translateX: useSharedValue(0),
    translateY: useSharedValue(0),
  }));

  useEffect(() => {
    blobs.forEach((blob, index) => {
      const config = BLOBS(colorScheme)[index];

      const startX =
        Math.random() * ANIMATION_CONFIG.startXRange -
        ANIMATION_CONFIG.startXRange / 2;
      const startY =
        index < 2
          ? Math.random() *
              (ANIMATION_CONFIG.startYRangeEarly.max -
                ANIMATION_CONFIG.startYRangeEarly.min) +
            ANIMATION_CONFIG.startYRangeEarly.min
          : Math.random() *
              (ANIMATION_CONFIG.startYRangeLate.max -
                ANIMATION_CONFIG.startYRangeLate.min) +
            ANIMATION_CONFIG.startYRangeLate.min;

      blob.translateX.value = startX;
      blob.translateY.value = startY;

      blob.translateX.value = withRepeat(
        withTiming(config.rangeX, {
          duration:
            ANIMATION_CONFIG.baseSpeed *
            config.speedMultiplier *
            (1 + Math.random() * 0.5),
          easing: Easing.inOut(Easing.sin),
        }),
        -1,
        true
      );

      blob.translateY.value = withRepeat(
        withTiming(config.rangeY, {
          duration:
            ANIMATION_CONFIG.baseSpeed *
            1.5 *
            config.speedMultiplier *
            (1 + Math.random() * 0.5),
          easing: Easing.inOut(Easing.sin),
        }),
        -1,
        true
      );
    });
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      {blobs.map((blob, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [
            { translateX: blob.translateX.value },
            { translateY: blob.translateY.value },
          ],
        }));

        return (
          <Animated.View
            key={index}
            style={[
              {
                ...styles.blob,
                width: BLOBS(colorScheme)[index].size,
                height: BLOBS(colorScheme)[index].size,
                borderRadius: BLOBS(colorScheme)[index].size / 2,
                backgroundColor: BLOBS(colorScheme)[index].color,
              },
              animatedStyle,
            ]}
          />
        );
      })}

      <View style={[styles.formContainer]}>
        <BlurView
          tint="systemChromeMaterial"
          intensity={colorScheme === "light" ? 30 : 100}
          style={styles.blurView}
        >
          <View style={styles.formInnerContainer}>
            <Slot />
          </View>
        </BlurView>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingInline: 24,
    flexDirection: "column",
  },
  blob: {
    position: "absolute",
  },
  formContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  blurView: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 50,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 20,
  },
  formInnerContainer: {
    flexDirection: "column",
    margin: 0.5,
    borderRadius: 15,
    padding: 32,
  },
});

export default AuthLayout;
