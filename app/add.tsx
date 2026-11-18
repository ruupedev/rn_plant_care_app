import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { styles } from "../styles/style";
import { Alert, View } from "react-native";
import { File } from "expo-file-system";
import { useState } from "react";
import { Card, Button, Text } from "react-native-paper";
import { addPlant } from "../types/plant";

const apiKeys = {
  plantNetApiKey: process.env.EXPO_PUBLIC_PLANTNET_API_KEY,
  perenualApiKey: process.env.EXPO_PUBLIC_PERENUAL_API_KEY,
  trefleApiKey: process.env.EXPO_PUBLIC_TREFLE_API_KEY,
};

export default function AddScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  console.log("imageUri:", imageUri);

  const [result, setResult] = useState<any>(null);

  const identify = async () => {
    const form = new FormData();

    form.append("images", new File(imageUri));

    try {
      const res = await fetch(
        `https://my-api.plantnet.org/v2/identify/all?include-related-images=true&api-key=${apiKeys.plantNetApiKey}`,
        {
          method: "POST",
          body: form,
        },
      );
      const json = await res.json();
      console.log(JSON.stringify(json.results[0], null, 2));
      setResult(json.results[0]);
    } catch (error) {
      console.log("ERROR!", error);
    }
  };

  const save = async () => {
    try {
      const id = await addPlant({
        name: result.species.commonNames[0],
        imageUri,
      });
      console.log("Saved with id:", id);
      router.back();
    } catch (error) {
      console.log("Save failed:", error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Image
          style={styles.image}
          source={imageUri}
          /*  placeholder={{ blurhash }} */
          contentFit="cover"
          transition={1000}
        />
        {/*  <Button onPress={identify} title="Fetch" /> */}
        <Button
          mode="contained"
          style={{ width: "90%", margin: "auto" }}
          onPress={identify}
        >
          SEARCH
        </Button>
        {result && (
          <Card style={{ width: "90%", margin: "auto", marginTop: 20 }}>
            <Card.Content style={styles.resultRow}>
              <Image
                source={result.images?.[0]?.url.m}
                style={styles.resultImage}
                contentFit="cover"
              />
              <View style={styles.resultText}>
                <Text variant="titleMedium">
                  {result.species.commonNames[0]}
                </Text>
                <Text variant="bodyMedium" style={styles.scientific}>
                  {result.species.scientificNameWithoutAuthor}
                </Text>
                <Text variant="labelLarge">
                  {Math.round(result.score * 100)} %
                </Text>
                <View style={{ flexDirection: "row", gap: 5, marginTop: 15 }}>
                  <Button mode="contained" onPress={save}>
                    YES
                  </Button>
                  <Button mode="contained">NO</Button>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
