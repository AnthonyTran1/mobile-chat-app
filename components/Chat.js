import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation, db }) => {
  const { name, backgroundColor, userID } = route.params;
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newLists = [];
      documentsSnapshot.forEach((doc) => {
        // console.log(new Date(doc.data().createdAt.seconds * 1000));
        newLists.push({
          ...doc.data(),
          id: doc.id,
          createdAt: new Date(doc.data().createdAt.seconds * 1000),
        });
      });
      setMessages(newLists);
    });

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  return (
    <View
      style={[styles.container, (styles.backgroundColor = { backgroundColor })]}
    >
      {/* <Text>Hello Chat!</Text> */}

      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => {
          onSend(messages);
          Keyboard.dismiss();
        }}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: "20%",
  },
});

export default Chat;
