import { Text, View, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import Colors from "../constants/colors";

export default function NavButton(props) {
    const { width, height } = useWindowDimensions();
    return (
        <Pressable
        onPress={props.onPress}
        // Providing android ripple gives visual response to being clicked
        android_ripple={{ color: Colors.accent500 }}
        style={({ pressed }) => pressed && styles.pressedItem}
        >
            <View style={styles.buttonContainer}>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, {fontSize: width * 0.07}]}>{props.children}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 300,
        width:1000,
        maxWidth: "70%",
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: Colors.primary500
    },
    pressedItem: {
        opacity: 0.5
    },
    text: {
        padding: 8,
        fontSize: 25,
        textAlign: "center",
        fontFamily: "Mountain",
        colors: Colors.primary300
    }
})