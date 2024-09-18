import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  ImageBackground,
} from "react-native";
import { useState } from "react";

const image = { uri: require("../assets/Background-Image.png") };

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#090C08");

  return (
    <ImageBackground
      source={image.uri}
      resizeMode="cover"
      style={[styles.image, styles.container]}
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
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        />
        <Text style={styles.chooseBGColor}>Choose Background Color:</Text>
        <View style={[styles.backgroundContainer]}>
          <TouchableOpacity
            style={[styles.backgroundColor, styles.color1]}
            onPress={() => setBackgroundColor("#090C08")}
          ></TouchableOpacity>
          <TouchableOpacity
            style={[styles.backgroundColor, styles.color2]}
            onPress={() => setBackgroundColor("#474056")}
          ></TouchableOpacity>
          <TouchableOpacity
            style={[styles.backgroundColor, styles.color3]}
            onPress={() => setBackgroundColor("#8A95A5")}
          ></TouchableOpacity>
          <TouchableOpacity
            style={[styles.backgroundColor, styles.color4]}
            onPress={() => setBackgroundColor("#B9C6AE")}
          ></TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.chattingButton]}
          onPress={() =>
            navigation.navigate("Chat", {
              name: name,
              backgroundColor: backgroundColor,
            })
          }
        >
          <Text style={styles.startChatting}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
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
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: 300,
    color: "#757083",
    opacity: 0.5,
  },
  backgroundColor: {
    // borderWidth: 1,
    // alignItems: "center",
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
    height: 70,
    backgroundColor: "#757083",
  },

  startChatting: {
    fontSize: 16,
    fontWeight: 600,
    color: "#FFFFFF",
    textAlign: "center",
    paddingTop: 20,
  },
  chooseBGColor: {
    paddingTop: 20,
    fontSize: 16,
    fontWeight: 300,
    color: "#757083",
  },
});

export default Start;
