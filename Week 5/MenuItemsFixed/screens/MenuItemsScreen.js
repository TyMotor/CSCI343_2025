import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Title from '../components/Title';
import MenuItem from '../components/MenuItem';

export default function menuItemsScreen(props) {
  // Setting Safe Area Screen Boundaries
  const insets = useSafeAreaInsets();

  const [menuItems, setMenuItems] = useState([
    {
      name: "Nedrick's Nuclear Nachos",
      image: require("../assets/images/nachos.jpg"),
      price: "$37",
      id: 1,
    },
    {
      name: "Children Crying Chili",
      image: require("../assets/images/chili.jpg"),
      price: "$2",
      id: 2,
    },
    {
      name: "Connor's Corned Cow",
      image: require("../assets/images/cornedbeef.jpg"),
      price: "$353 Billion",
      id: 3,
    },
    {
      name: "Interesting Italic Italian",
      image: require("../assets/images/italian.jpg"),
      price: "$10.99",
      id: 4,
    },
    {
      name: "Radical Root Beer Float",
      image: require("../assets/images/rootbeerfloat.jpg"),
      price: "$0.25",
      id: 5,
    },
  ])

  return (<View
      style={[
      styles.rootContainer,
      {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
      },
      ]}
  >
  <View style={styles.titleContainer}>
      <Title>Menu</Title>
  </View>

  <View style={styles.listContainer}>
    <FlatList
    data={menuItems}
    keyExtractor={(item,index) => {
      return item.id;
    }}
    alwaysBounceVertical={false}
    showsVerticalScrollIndicator={false}
    renderItem={(itemData) => {
      return (
        <MenuItem 
        name={itemData.item.name}
        image={itemData.item.image}
        price={itemData.item.price}
        />
      )
    }}
    />
  </View>

  <View style={styles.buttonContainer}>
    <Button title="Main Menu" onPress={props.onNext} color="#645600ff"/>
  </View>
  </View>);
}


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center"
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center"
  },
  listContainer: {
    flex: 7,
    width: 380
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 40,
    width: 150,
 }
});