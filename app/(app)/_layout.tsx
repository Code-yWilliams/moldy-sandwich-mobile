import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useAccount } from "@/contexts/accountContext";

export default function AppLayout() {
  const { account, isLoading } = useAccount();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!account) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
