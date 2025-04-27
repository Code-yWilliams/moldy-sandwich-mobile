import React from "react";
import ThemedFormInput from "../../components/ThemedFormInput";
import { ThemedText } from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import { Link } from "expo-router";
import { authStyles } from "../../styles/authStyles";

const SignUp = () => {
  return (
    <>
      <ThemedText style={authStyles.welcomeText}>sign up 💕 or else</ThemedText>
      <ThemedFormInput
        placeholder="Enter your email"
        label="Email"
        style={authStyles.input}
      />
      <ThemedFormInput
        placeholder="Enter a password"
        label="Password"
        style={authStyles.input}
      />
      <ThemedFormInput
        placeholder="Can you repeat that? Louder."
        label="Password Confirmation"
        style={authStyles.input}
      />
      <ThemedButton
        title="Sell your soul 🤗"
        onPress={() => console.log("sign up")}
        variant="primary"
        style={authStyles.actionButton}
      />
      <ThemedText style={authStyles.alternateActionText}>
        Have an account? That's hot 🫦
      </ThemedText>
      <Link href="/login" asChild replace>
        <ThemedButton
          title="Login instead!"
          onPress={() => console.log("login")}
          style={authStyles.alternateActionButton}
        />
      </Link>
    </>
  );
};

export default SignUp;
