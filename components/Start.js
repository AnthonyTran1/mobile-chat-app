import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useState } from "react";

const image = { uri: require("../assets/Background-Image.png") };
const icon = require("../assets/user-icon.png");

const Start = ({ navigation }) => {
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          name: name,
          backgroundColor: backgroundColor,
          userID: result.user.uid,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#090C08");
  const [selectedColor, setSelectedColor] = useState();

  return (
    <ImageBackground
      source={image.uri}
      resizeMode="cover"
      style={[styles.image, styles.appBGcontainer]}
    >
      <Text style={styles.appTitle}>Mobile Chat App</Text>

      <View
        style={{
          width: "88%",
          height: "44%",
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={[styles.textInputContainer]}>
          <Image style={styles.imageBackground} source={icon} />
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          />
        </View>

        <View
          style={{
            alignSelf: "flex-start",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Text style={styles.chooseBGColor}>Choose Background Color:</Text>
          <View style={[styles.backgroundContainer]}>
            <TouchableOpacity
              style={[
                styles.backgroundColor,
                styles.color1,
                selectedColor === "#090C08" && styles.focused,
              ]}
              onPress={() => {
                setBackgroundColor("#090C08");
                setSelectedColor("#090C08");
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.backgroundColor,
                styles.color2,
                selectedColor === "#474056" && styles.focused,
              ]}
              onPress={() => {
                setBackgroundColor("#474056");
                setSelectedColor("#474056");
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.backgroundColor,
                styles.color3,
                selectedColor === "#8A95A5" && styles.focused,
              ]}
              onPress={() => {
                setBackgroundColor("#8A95A5");
                setSelectedColor("#8A95A5");
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.backgroundColor,
                styles.color4,
                selectedColor === "#B9C6AE" && styles.focused,
              ]}
              onPress={() => {
                setBackgroundColor("#B9C6AE");
                setSelectedColor("#B9C6AE");
              }}
            ></TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={[styles.chattingButton]} onPress={signInUser}>
          <Text style={styles.startChatting}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  appBGcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 45,
    fontWeight: 600,
    color: "#FFFFFF",
    marginBottom: "66%",
  },
  backgroundContainer: {
    flexDirection: "row",
    justifyContent: "right",
    paddingTop: 15,
    paddingBottom: 35,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  textInput: {
    position: "relative",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    zIndex: 1,
    paddingLeft: 50,
    width: "100vw%",
  },
  backgroundColor: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  color1: {
    backgroundColor: "#090C08",
  },
  color2: {
    backgroundColor: "#474056",
  },
  color3: {
    backgroundColor: "#8A95A5",
  },
  color4: {
    backgroundColor: "#B9C6AE",
  },
  chattingButton: {
    marginTop: 20,
    width: "88%",
    backgroundColor: "#757083",
  },

  startChatting: {
    fontSize: 16,
    fontWeight: 600,
    color: "#FFFFFF",
    textAlign: "center",
    padding: 20,
  },
  chooseBGColor: {
    paddingTop: 20,
    fontSize: 16,
    fontWeight: 300,
    color: "#757083",
  },
  textInputContainer: {
    position: "relative",
    width: "90%",
  },
  imageBackground: {
    position: "absolute",
    opacity: 0.5,
    top: 15,
    left: 18,
    right: 0,
    bottom: 0,
  },
  focused: {
    borderWidth: 4,
    borderColor: "red",
  },
});

export default Start;
