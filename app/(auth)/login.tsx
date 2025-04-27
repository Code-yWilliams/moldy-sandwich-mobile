import React from "react";
import { TouchableOpacity } from "react-native";
import ThemedFormInput from "../../components/ThemedFormInput";
import { ThemedText } from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import { Link } from "expo-router";
import { authStyles } from "../../styles/authStyles";

const Login = () => {
  return (
    <>
      <ThemedText style={authStyles.welcomeText}>omg ur back 🫶</ThemedText>
      <ThemedFormInput
        placeholder="Enter your email"
        label="Email"
        style={authStyles.input}
      />
      <ThemedFormInput
        placeholder="Enter your Password"
        label="Password"
        style={authStyles.input}
      />
      <ThemedButton
        title="Come on in baby ✨"
        onPress={() => console.log("login")}
        variant="primary"
        style={authStyles.actionButton}
      />
      <TouchableOpacity
        onPress={() => console.log("forgot password")}
        style={authStyles.forgotPasswordTouchableOpacity}
      >
        <ThemedText style={authStyles.forgotPasswordText}>
          I suck and I forgot my password 🙈
        </ThemedText>
      </TouchableOpacity>
      <ThemedText style={authStyles.alternateActionText}>
        No account? 🤨 R u kiddin?
      </ThemedText>
      <Link href="/sign-up" asChild replace>
        <ThemedButton
          title="Sign up instead!"
          onPress={() => console.log("sign up")}
          style={authStyles.alternateActionButton}
        />
      </Link>
    </>
  );
};

export default Login;
