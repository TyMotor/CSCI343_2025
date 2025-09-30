import { Image, View, StyleSheet, Text } from "react-native";
import Colors from "../constants/colors";

export default function MenuItem(props){
    return (
    <View style={styles.itemContainer}>
        <View style={styles.nameContainer}>
            <Text style={styles.name}>{props.name}</Text>
        </View>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={props.image} />
        </View>
        <View style={styles.priceContainer}>
            <Text style={styles.price}>{props.price}</Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        marginBottom: 20
    },
    nameContainer: {
        backgroundColor: Colors.primary500,
        borderWidth: 3,
        borderRadius: 5
    },
    name: {
        fontSize: 30,
        textAlign: "center",
        fontFamily: "kinder-surf"
    },
    imageContainer: {
        alignItems: "center",
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: "black"
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "cover"
    },
    priceContainer: {
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: Colors.primary500
    },
    price: {
        fontSize: 30,
        textAlign: "center",
        fontFamily: "kinder-surf"
    }
})