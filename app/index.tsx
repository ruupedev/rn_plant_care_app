import { Alert, FlatList, View } from "react-native";
import { Link, router, useFocusEffect } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Card, FAB, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useState, useCallback } from "react";
import { Image } from "expo-image";

import { styles } from "../styles/style";
import { getPlants } from "../types/plant";

export default function HomeScreen() {
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission to media library required");
      return;
    }

    let res = await ImagePicker.launchImageLibraryAsync();

    if (!res.canceled) {
      router.push({
        pathname: "/add",
        params: { imageUri: res.assets[0].uri },
      });
    }

    /*  console.log(res); */
  };

  const [plants, setPlants] = useState<any[]>([]);
  useFocusEffect(
    useCallback(() => {
      getPlants().then(setPlants);
    }, []),
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <Link href="/details">Avaa details</Link> */}
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Card style={styles.plantCard}>
              <Card.Content style={styles.resultRow}>
                <Image
                  source={item.imageUri}
                  style={styles.resultImage}
                  contentFit="cover"
                />
                <Text variant="titleMedium">{item.name}</Text>
              </Card.Content>
            </Card>
          )}
        />
        <FAB style={styles.fab} small icon="plus" onPress={pickImage} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
