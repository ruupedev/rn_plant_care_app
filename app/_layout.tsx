import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { colors } from "../styles/style";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.onPrimary,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Kasvini" }} />
        <Stack.Screen name="details" options={{ title: "Tiedot" }} />
      </Stack>
    </PaperProvider>
  );
}
