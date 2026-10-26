import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/style";

export default function DetailsScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>TÄNNE JUTTUJA</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
