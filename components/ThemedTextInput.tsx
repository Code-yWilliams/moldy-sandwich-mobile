import { BlurView, BlurViewProps } from "expo-blur";
import { useRef } from "react";
import {
  Pressable,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";

export interface ThemedTextInputProps extends Omit<TextInputProps, "style"> {
  style?: ViewStyle;
  tint?: BlurViewProps["tint"];
}

const ThemedTextInput = ({
  placeholder,
  value,
  onChangeText,
  style,
  tint,
  ...props
}: ThemedTextInputProps) => {
  const inputRef = useRef<TextInput>(null);

  const colorScheme = useColorScheme();

  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          width: "100%",
          height: 60,
          marginVertical: 8,
          borderRadius: 50,
          ...style,
        }}
      >
        <BlurView
          tint="systemChromeMaterial"
          intensity={30}
          style={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
            borderRadius: 50,
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 16,
          }}
        >
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={{
              fontSize: 16,
              color: colorScheme === "light" ? "black" : "white",
            }}
            placeholderTextColor={
              colorScheme === "dark"
                ? "rgba(255, 255, 255, 0.3)"
                : "rgba(0, 0, 0, 0.3)"
            }
            ref={inputRef}
            {...props}
          />
        </BlurView>
      </View>
    </Pressable>
  );
};

export default ThemedTextInput;
