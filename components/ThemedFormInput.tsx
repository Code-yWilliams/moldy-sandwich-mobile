import { View } from "react-native";
import ThemedTextInput, { ThemedTextInputProps } from "./ThemedTextInput";
import { ThemedText } from "./ThemedText";

interface ThemedFormInputProps extends ThemedTextInputProps {
  label?: string;
  error?: string;
}

const ThemedFormInput = ({
  error,
  label,
  style,
  ...props
}: ThemedFormInputProps) => {
  return (
    <View style={style}>
      {label && <ThemedText>{label}</ThemedText>}
      <ThemedTextInput
        {...props}
        style={{
          backgroundColor: error ? "rgb(255, 200, 200)" : "transparent",
        }}
      />
      {error && (
        <ThemedText style={{ color: "red", fontSize: 10 }}>{error}</ThemedText>
      )}
    </View>
  );
};

export default ThemedFormInput;
