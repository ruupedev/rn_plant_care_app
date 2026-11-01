import { useLocalSearchParams } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { styles } from "../styles/style";
import { Alert, Text, Button } from "react-native";
import { File } from "expo-file-system";
import { useState } from "react";

const apiKeys = {
  plantNetApiKey: process.env.EXPO_PUBLIC_PLANTNET_API_KEY,
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
        <Button onPress={identify} title="Fetch" />
        <Text>{result?.score}</Text>
        <Text>{result?.species.scientificNameWithoutAuthor}</Text>
        <Text>{result?.species.commonNames[0]}</Text>
        <Image
          source={result?.images?.[0]?.url.s}
          style={styles.thumbnail}
        ></Image>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
