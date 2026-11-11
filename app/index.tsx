import { Alert, Text } from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import { styles } from "../styles/style";
import type { Plant } from "../types/plant";

export default function HomeScreen() {
 /*  const [image, setImage] = useState<string | null>(null); */
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission to media library required");
      return;
    }

    let res = await ImagePicker.launchImageLibraryAsync();

    if (!res.canceled) {
      /*     setImage(res.assets[0].uri); */
      router.push({
        pathname: "/add",
        params: { imageUri: res.assets[0].uri },
      });
    }

    console.log(res);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Link href="/details">Avaa details</Link>
        <FAB style={styles.fab} small icon="plus" onPress={pickImage} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
