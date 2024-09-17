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
      <Text>Mobile Chat App</Text>

      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder="Your Name"
      />

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
        onPress={() =>
          navigation.navigate("Chat", {
            name: name,
            backgroundColor: backgroundColor,
          })
        }
      >
        <Text style={[styles.chattingButton]}>Start Chatting</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
  },
  backgroundColor: {
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
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
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderBlockColor: "black",
    backgroundColor: "blue",
    color: "#FFFFFF",
  },
});

export default Start;
