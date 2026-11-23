import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { useState, useEffect } from "react";
import { Image } from "expo-image";

import { styles } from "../../styles/style";
import { getPlant } from "../../services/plants";
import { Plant } from "../../types/plant";

export default function plantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [plant, setPlant] = useState<Plant | null>(null);

  useEffect(() => {
    getPlant(id).then(setPlant);
  }, [id]);

  if (!plant) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <Text variant="titleMedium">{plant.name}</Text>
          <Text>{plant.scientificName}</Text>
        </View>
        <Image
          source={plant.imageUri}
          style={styles.detailImage}
          contentFit="cover"
        />
        <View style={{ gap: 16 }}>
          <View>
            <Text variant="titleMedium">Watering</Text>
            <Text>{plant.watering}</Text>
          </View>
          <View>
            <Text variant="titleMedium">Sunlight</Text>
            <Text>{plant.sunlight}</Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
