import { ButtonProps, Pressable, Text, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { forwardRef } from "react";

interface ThemedButtonProps extends ButtonProps {
  style?: ViewStyle;
  variant?: "primary" | "outlined";
}

const ThemedButton = forwardRef<View, ThemedButtonProps>(
  ({ title, onPress, style, variant = "primary" }, ref) => {
    const gradientColors = ["rgb(147, 51, 234)", "rgb(236, 72, 153)"] as const;

    if (variant === "outlined") {
      return (
        <View
          style={{
            height: 60,
            borderRadius: "20",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 10,
            backgroundColor: "#fff",
            ...style,
          }}
        >
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Pressable
              onPress={onPress}
              style={({ pressed }) => ({
                borderRadius: 10,
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.5 : 1,
              })}
              ref={ref}
            >
              <Text
                style={{
                  color: gradientColors[0],
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {title}
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      );
    }

    return (
      <View
        style={{
          height: 60,
          borderRadius: 50,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 10,
          backgroundColor: "#fff",
          overflow: "hidden",
          ...style,
        }}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Pressable
            onPress={onPress}
            style={({ pressed }) => ({
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed
                ? "rgba(255, 255, 255, 0.5)"
                : "transparent",
              opacity: pressed ? 0.5 : 1,
              paddingHorizontal: 20,
            })}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              {title}
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    );
  }
);

export default ThemedButton;
