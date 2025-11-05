import { View, StyleSheet, FlatList } from "react-native";
import NewsItem from "./ListItem";

export default function List(props) {
  function renderNewsItem(itemData) {
    const newsItemProps = {
      id: itemData.item.id,
      headline: itemData.item.headline,
      date: itemData.item.date,
      imageUrl: itemData.item.imageUrl,
      author: itemData.item.author,
      agency: itemData.item.agency,
      description: itemData.item.description,
      listIndex: itemData.index,
    };

    return <NewsItem {...newsItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={props.items}
        keyExtractor={(item) => item.id}
        renderItem={renderNewsItem}
        showVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
  },
});
