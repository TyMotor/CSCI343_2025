import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Modal, Pressable, SafeAreaView, Results, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  //create state management variables
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [ballAnswer, setBallAnswer] = useState("");

  //List of 8 ball answers
  const responses = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
  ];


  function openBallModal(){
    shake8Ball();
    setModalIsVisible(true);
  }
  
  function closeBallModal(){
    setModalIsVisible(false);
  }

  function shake8Ball() {
    const randomIndex = Math.floor(Math.random() * responses.length);
    setBallAnswer(responses[randomIndex]);
  }

  return (
    <>
    <StatusBar style='auto'/>
    <SafeAreaView style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Magic 8 Ball</Text>      
      </View>
      
      <Text style={styles.userInputLabel}>Enter your question:</Text>
          <TextInput
          style={styles.userInput}
          placeholder="Enter a 'yes' or 'no' question"
          onChangeText={setUserQuestion}
          value={userQuestion}
          keyboardType="default"
          />

      <View style={styles.shakeButtonContainer}>
        <Pressable
        android_ripple={{color: "white"}}
        onPress={openBallModal}
        style={({pressed}) => {return pressed && styles.pressedButton;}}
        >
          <View style={styles.shakeButton}>
            <Text style={styles.shakeButtonText}>Shake Magic 8 Ball</Text>
          </View>
        </Pressable>
      </View>

      <Modal visible={modalIsVisible}>
        <SafeAreaView style={styles.modalRoot}>
          <View style={styles.userQuestionContainer}>
            <Text style={styles.userQuestionText}>Your question:</Text>
              <Text style={styles.userQuestionText2}>{userQuestion}</Text>
          </View>

          <View style={styles.ballAnswerContainer}>
            <Text style={styles.ballAnswerText}>Answer:</Text>
            <Text style={styles.ballAnswerText2}>{ballAnswer}</Text>
          </View>

          <View style={styles.closeButtonContainer}>
            <View style={styles.closeButton}>
              <Button title="Close" color="black" onPress={closeBallModal} />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#b274caff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    backgroundColor: "black",
    width: "90%",
    justifyContent: "center",
    margin: "80",
    borderWidth: 3,
    borderRadius: 25
  },
  title: {
    fontSize: 40,
    color: "purple",
    textAlign: "center"
  },
  shakeButtonContainer: {
    flex: 1,
    justifyContent: "center"
  },
  shakeButton: {
    backgroundColor: "black",
    borderRadius: 60,
    padding: 10
  },
  shakeButtonText: {
    fontSize: 25,
    color: "purple",
  },
  pressedButton: {
    opacity: 0.5
  },
  modalRoot: {
    flex: 1,
    backgroundColor: "#b274caff",
    alignItems: "center"
  },
  userInputLabel: {
    fontSize: 25,
    color: "Purple",
    textAlign: "center",
    marginTop: 20,
    padding: 15
  },
  userInput: {
    borderWidth: 1,
    borderColor: "purple",
    backgroundColor: "white",
    color: "black",
    borderRadius: 6,
    width: "90%",
    padding: 12,
    marginBottom: 30
  },
 userQuestionContainer: {
  flex: 1,
  backgroundColor: "Purple",
  borderColor: "Black",
  margin: 15,
  justifyContent: "center"
 },
 userQuestionText: {
    marginTop: 100,
    fontSize: 35,
    color: "white",
    textAlign: "center"
 },
  userQuestionText2: {
    fontSize: 20,
    color: "black",
    textAlign: "center"
 },
  ballAnswerContainer: {
    flex: 1,
    backgroundColor: "Purple",
    borderColor: "Black"
  },
  ballAnswerText: {
    fontSize: 35,
    color: "white",
    textAlign: "center"
  },
  ballAnswerText2: {
    fontSize: 20,
    color: "black",
    textAlign: "center"
  },

  
  closeButtonContainer : {
    marginBottom: 40,
  },
  closeButton: {
    width: "30%",
  }
});
