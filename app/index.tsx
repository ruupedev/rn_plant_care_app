import { Alert, FlatList, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Card, FAB, IconButton, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useState, useCallback } from "react";
import { Image } from "expo-image";

import { styles } from "../styles/style";
import { getPlants, deletePlant } from "../services/plants";
import { Plant } from "../types/plant";

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
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission to camera required");
      return;
    }
    const res = await ImagePicker.launchCameraAsync();
    if (!res.canceled) {
      router.push({
        pathname: "/add",
        params: { imageUri: res.assets[0].uri },
      });
    }
  };

  const showDetails = async (id: string) => {
    router.push({
      pathname: `/plant/${id}`,
    });
  };

  const onAddPress = () => {
    Alert.alert("Add plant", "Choose image source", [
      { text: "Camera", onPress: takePhoto },
      { text: "Gallery", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const onDeletePlant = (id: string) => {
    Alert.alert("Delete Plant", "This cannot be undone", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => setPlants(await deletePlant(id)),
      },
    ]);
  };

  const [plants, setPlants] = useState<Plant[]>([]);
  useFocusEffect(
    useCallback(() => {
      getPlants().then(setPlants);
    }, []),
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Card style={styles.plantCard} onPress={() => showDetails(item.id)}>
              <Card.Content style={styles.resultRow}>
                <Image
                  source={item.imageUri}
                  style={styles.resultImage}
                  contentFit="cover"
                />
                <View style={styles.resultText}>
                  <Text variant="titleMedium">{item.name}</Text>
                  <Text variant="bodySmall" style={styles.scientific}>
                    {item.scientificName}
                  </Text>
                </View>
                <IconButton
                  icon="delete-outline"
                  onPress={() => onDeletePlant(item.id)}
                />
              </Card.Content>
            </Card>
          )}
        />
        <FAB style={styles.fab} small icon="plus" onPress={onAddPress} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
