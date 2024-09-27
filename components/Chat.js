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
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  renderCustomActions,
} from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";
import CustomActions from "./CustomActions";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, backgroundColor, userID } = route.params;
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  let unsubMessages;

  useEffect(() => {
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newLists = [];
        documentsSnapshot.forEach((doc) => {
          newLists.push({
            ...doc.data(),
            id: doc.id,
            createdAt: new Date(doc.data().createdAt.seconds * 1000),
          });
        });
        cacheMessages(newLists);
        setMessages(newLists);
      });
    } else loadCachedLists();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const cacheMessages = async (listsToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(listsToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedLists = async () => {
    const cachedLists = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedLists));
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

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

  const renderCustomActions = (props) => {
    return (
      <CustomActions
        onSend={onSend}
        storage={storage}
        {...props}
        name={name}
        userID={userID}
      />
    );
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View
      style={[styles.container, (styles.backgroundColor = { backgroundColor })]}
    >
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => {
          onSend(messages);
          Keyboard.dismiss();
        }}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
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
