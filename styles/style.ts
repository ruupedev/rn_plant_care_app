import { StyleSheet } from "react-native";

export const colors = {
  primary: "#2e7d32",
  onPrimary: "#fff",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 16,
    bottom: 16,
  },
  image: {
    width: "90%",
    aspectRatio: 1,
    borderRadius: 12,
    margin: 20,
  },
  thumbnail: {
    width: "60%",
    aspectRatio: 1,
    borderRadius: 12,
    margin: 20,
  },
});
