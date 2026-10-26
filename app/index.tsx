import { Text } from "react-native";
import { Link } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/style";

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Link href="/details">Avaa details</Link>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
