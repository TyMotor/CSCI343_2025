import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import RecipesScreen from "./screens/RecipesScreen";
import AddRecipesScreen from "./screens/AddRecipeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Colors from "./constants/colors";

export default function App() {
  //Setting up the custom fonts
  const [fontsLoaded] = useFonts({
    jerimisRegular: require("./assets/fonts/Jerimis-Regular.ttf"),
    pencilStory: require("./assets/fonts/PencilStory.otf"),
    simpleRoutine: require("./assets/fonts/SimpleRoutine.otf"),
    vivalaBlack: require("./assets/fonts/VivalaBlack-Bold.ttf"),
  });

  const [currentScreen, setCurrentScreen] = useState("");
  const [currentID, setCurrentID] = useState(4);
  const [currentRecipes, setCurrentRecipes] = useState([
    {
      id: 1,
      title: "Chicken Orzo",
      text: "This food is so freaking good",
    },
    {
      id: 2,
      title: "Indian BBQ Bowl",
      text: "Chicken, choola ranch, peppers,\nand more!",
    },
    {
      id: 3,
      title: "Mac 'n Cheese",
      text: "Noodles and cheese mixed together",
    },
  ]);

  function homeScreenHandler() {
    setCurrentScreen("");
  }

  function recipesScreenHandler() {
    setCurrentScreen("recipes");
  }

  function addRecipeScreenHandler() {
    setCurrentScreen("add");
  }

  function addRecipeHandler(enteredRecipeTitle, enteredRecipeText) {
    setCurrentRecipes((currentRecipes) => [
      ...currentRecipes,
      { id: currentID, title: enteredRecipeTitle, text: enteredRecipeText },
    ]);
    setCurrentID(currentID + 1);
    recipesScreenHandler();
  }

  function deleteRecipeHandler(id) {
    setCurrentRecipes((currentRecipes) => {
      return currentRecipes.filter((item) => item.id !== id);
    });
  }

  let screen = <HomeScreen onNext={recipesScreenHandler} />;

  if (currentScreen === "recipes") {
    screen = (
      <RecipesScreen
        onHome={homeScreenHandler}
        onAdd={addRecipeScreenHandler}
        onDelete={deleteRecipeHandler}
        currentRecipes={currentRecipes}
      />
    );
  }

  if (currentScreen === "add") {
    screen = (
      <AddRecipesScreen
        onCancel={recipesScreenHandler}
        onAdd={addRecipeHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaProvider style={styles.container}>{screen}</SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary800,
    alignItems: "center",
    justifyContent: "center",
  },
});
