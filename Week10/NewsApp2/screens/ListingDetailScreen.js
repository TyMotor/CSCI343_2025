import { StyleSheet, Text, View, Image } from "react-native";
import { NEWS } from "../data/dummy_data";
import { useLayoutEffect, useState } from "react";
import Colors from "../constants/colors";
import BookmarkButton from "../components/BookmarkButton";

export default function NewsDetailScreen(props) {
  const newsId = props.route.params.newsId;
  const selectedNews = NEWS.find((news) => news.id === newsId);

  const [pressed, setPressed] = useState(false);

  function headerButtonPressHandler() {
    setPressed(!pressed);
  }

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: "See Other News",
      headerRight: () => {
        return (
          <BookmarkButton
            pressed={pressed}
            onPress={headerButtonPressHandler}
          />
        );
      },
    });
  }, [props.navigation, headerButtonPressHandler]);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: selectedNews.imageUrl }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.headline}>{selectedNews.headline}</Text>
        <Text style={styles.date}>{selectedNews.date}</Text>
        <Text style={styles.author}>
          By {selectedNews.author} | {selectedNews.agency}
        </Text>
        <Text style={styles.description}>{selectedNews.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  imageContainer: {
    marginVertical: 10,
    height: 300,
  },
  image: {
    height: "100%",
    resizeMode: "cover",
    borderRadius: 7,
  },
  infoContainer: {
    borderRadius: 7,
    backgroundColor: Colors.primary500o8,
    flex: 1,
    alignItems: "center",
  },
  headline: {
    color: Colors.primary300,
    fontSize: 25,
    fontFamily: "playfairBold",
    paddingBottom: 5,
  },
  date: {
    color: Colors.primary300,
    fontSize: 25,
    fontFamily: "playfair",
    paddingBottom: 5,
  },
  author: {
    color: Colors.primary300,
    textAlign: "center",
    width: "100%",
    fontSize: 15,
    fontFamily: "playfair",
    paddingBottom: 5,
  },
  description: {
    color: Colors.primary300,
    textAlign: "justify",
    width: "90%",
    fontSize: 15,
    fontFamily: "playfair",
  },
});
