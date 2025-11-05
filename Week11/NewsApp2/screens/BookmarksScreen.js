import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { BookmarksContext } from '../store/context/bookmarks-context';
import { NEWS } from '../data/dummy_data';
import List from '../components/List/List';
import Colors from '../constants/colors';
import NewsItem from '../components/List/ListItem';

export default function BookmarksScreen() {
  const bookmarkedNewsCtx = useContext(BookmarksContext);
  const bookmarkedNews = NEWS.filter((listingItem) => {
    return bookmarkedNewsCtx.ids.includes(listingItem.id);
  });

  if (bookmarkedNews.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You have no saved listings yet.</Text>
      </View>
    );
  } else {
    return <List items={bookmarkedNews} />;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary300
  }
});
