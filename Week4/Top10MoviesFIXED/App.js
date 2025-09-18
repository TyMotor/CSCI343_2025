import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import Movie from "./Components/Movie";

export default function App() {
  const [movieItems, setMovieItems] = useState([
    {
      name: "The Dark Knight",
      image: require("./assets/images/thedarkknight.jpg"),
      IMDBrating: "9.1",
      id: 1
    },
    {
      name: "Raiders of the Lost Ark",
      image: require("./assets/images/indianajonesark.jpg"),
      IMDBrating: "8.4",
      id: 2
    },
    {
      name: "Monty Python and the Holy Grail",
      image: require("./assets/images/montypythonholygrail.jpg"),
      IMDBrating: "8.2",
      id: 3
    },
    {
      name: "Ferris Bueller's Day Off",
      image: require("./assets/images/ferrisbueller.jpeg"),
      IMDBrating: "7.8",
      id: 4
    },
    {
      name: "Borat: Cultural Learnings of America for Make Benefit Glorious Nation of Kazakhstan",
      image: require("./assets/images/borat.jpg"),
      IMDBrating: "7.4",
      id: 5
    },
    {
      name: "Cars",
      image: require("./assets/images/cars.jpg"),
      IMDBrating: "7.3",
      id: 6
    },
    {
      name: "Top Gun",
      image: require("./assets/images/topgun.jpg"),
      IMDBrating: "7.0",
      id: 7
    },
    {
      name: "Star Wars Episode I: The Phantom Menace",
      image: require("./assets/images/starwarsep1.jpg"),
      IMDBrating: "6.5",
      id: 8
    },
    {
      name: "Zoolander",
      image: require("./assets/images/zoolander.jpg"),
      IMDBrating: "6.5",
      id: 9
    },
    {
      name: "Godzilla (2014)",
      image: require("./assets/images/godzilla.jpg"),
      IMDBrating: "6.4",
      id: 10
    },
  ]);
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Top 10 Movies</Text>
        </View>

        <View style={styles.listContainer}>
          <FlatList
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false} 
          data={movieItems}
          keyExtractor={(item, index) => item.id}
          renderItem={(itemData) => {
            return <Movie 
              name={itemData.item.name} 
              image={itemData.item.image}                 
              IMDBrating={itemData.item.IMDBrating} 
            />
          }}
          />
        </View>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#e78282ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer :{
    justifyContent: "center",
    marginBottom: 20,
    paddingHorizontal: 5,
    borderWidth: 5,
    borderRadius: 10,
    marginTop: 50,
    backgroundColor: "white"
  },
  title:{
    fontSize: 35,
    fontWeight: "bold",
    backgroundColor: "white"
  },
  listContainer :{
    flex: 8,
    width: "90%"
  }
});
