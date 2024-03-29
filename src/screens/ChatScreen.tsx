import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';


type ChatItem = {
  profilePicture: string;
  author: string;
  message: string;
  lastPhotoShared: string;
};

type NavigationPropType = NavigationProp<ParamListBase, 'Camera'>;




const ChatMockData = [
  {
    id: 1,
    message: 'Look at my new haircut ! 😊',
    author: 'John',
    profilePicture: 'https://randomuser.me/api/portraits/men/73.jpg',
    lastPhotoShared: '2024-03-28T02:47:30Z'
  },
  {
    id: 2,
    message: 'lol I was not ready for this 😂',
    author: 'Jane',
    profilePicture: 'https://randomuser.me/api/portraits/women/12.jpg',
    lastPhotoShared: '2024-03-28T11:41:23Z'
  },
  {
    id: 3,
    message: "I didn't got to take pictures from yesterday's party, do you have some ?",
    author: 'Lucas',
    profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastPhotoShared: '2024-03-27T23:12:00Z'
  },
  {
    id: 4,
    message: 'Ahahah that face expression is SO you 😂',
    author: 'Dan',
    profilePicture: 'https://randomuser.me/api/portraits/men/45.jpg',
    lastPhotoShared: '2024-03-26T21:30:00Z'
  },
  {
    id: 5,
    message: 'Someboy had a rough night ! 😆',
    author: 'Elisa',
    profilePicture: 'https://randomuser.me/api/portraits/women/23.jpg',
    lastPhotoShared: '2024-03-27T19:00:00Z'
  },
  {
    id: 6,
    message: 'We just adopted a new cat!! Look at him 😍',
    author: 'Elie',
    profilePicture: 'https://randomuser.me/api/portraits/men/56.jpg',
    lastPhotoShared: '2024-03-27T17:00:00Z'
  },
  {
    id: 7,
    message: 'I love this place, we should go there together next time !',
    author: 'Laura',
    profilePicture: 'https://randomuser.me/api/portraits/women/45.jpg',
    lastPhotoShared: '2024-03-24T15:00:00Z'
  },
  {
    id: 8,
    message: 'Yooo, just got a new tattoo, what do you think ?',
    author: 'Mia',
    profilePicture: 'https://randomuser.me/api/portraits/women/56.jpg',
    lastPhotoShared: '2024-03-26T13:00:00Z'
  },
  {
    id: 9,
    message: 'Looking great today 😊',
    author: 'Ike',
    profilePicture: 'https://randomuser.me/api/portraits/men/78.jpg',
    lastPhotoShared: '2024-03-21T11:00:00Z'
  },
  {
    id: 10,
    message: "Who's that girl behind you ?",
    author: 'Lola',
    profilePicture: 'https://randomuser.me/api/portraits/women/78.jpg',
    lastPhotoShared: '2024-03-27T09:00:00Z'
  }
];

const ChatScreen = () => {
  const navigation = useNavigation<NavigationPropType>();

  const isChatBlocked = (lastPhotoShared: string) => {
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    return new Date(lastPhotoShared).getTime() < oneDayAgo;
  };

  const handlePressCameraButton = () => {
    console.log('Camera button pressed');
    navigation.navigate('Camera');
  };

  const renderItem = ({ item }: { item: ChatItem }) => (
    <View style={styles.chatItem}>
      <Image source={{ uri: item.profilePicture }} style={styles.profilePic} />
      <View style={styles.textContainer}>
        <Text style={styles.author}>{item.author}</Text>
        <View style={styles.messageBubble}>
          <Text style={styles.message}>{item.message}</Text>
          {isChatBlocked(item.lastPhotoShared) && (
            <BlurView
              style={styles.blurred}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
          )}
        </View>
      </View>
      {isChatBlocked(item.lastPhotoShared) && (
        <TouchableOpacity style={styles.cameraButton} onPress={() => handlePressCameraButton()}>
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ChatMockData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-start',
    position: 'relative',
  },
  textContainer: {
    flex: 1,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  author: {
    fontWeight: 'bold',
  },
  messageBubble: {
    position: 'relative',
    backgroundColor: '#f0f0f0',
    padding: 3,
    borderRadius: 15,
  },
  message: {
    color: 'gray',
  },
  blurred: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  cameraButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blueviolet',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;