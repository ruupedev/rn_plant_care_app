const headers = {
  Authorization: `Token ${process.env.EXPO_PUBLIC_PLANTBOOK_API_KEY}`,
};

export async function getPlantCare(scientificName: string) {
  try {
    const res = await fetch(
      `https://open.plantbook.io/api/v1/plant/detail/${scientificName}/?include=care`,
      {
        method: "GET",
        headers: headers,
      },
    );
    const json = await res.json();
    const instructions = [json.watering, json.sunlight];

    return instructions;
  } catch (error) {
    console.log("ERROR!", error);
  }
}
