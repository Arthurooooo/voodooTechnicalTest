import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFeaturedPhotos } from '../services/UnsplashService';

const HomeScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState<{ [key: string]: boolean }>({});
  const [isSelectionMode, setIsSelectionMode] = useState(false);


  useEffect(() => {
    getFeaturedPhotos().then((fetchedPhotos) => {
      setPhotos(fetchedPhotos);
    });
  }, []);


  const handleSelectPhoto = (id: string) => {
    const isAlreadySelected = !!selectedPhotos[id];
    const newSelectedPhotos = { ...selectedPhotos, [id]: !isAlreadySelected };
    setSelectedPhotos(newSelectedPhotos);
    setIsSelectionMode(Object.values(newSelectedPhotos).some(isSelected => isSelected));
  };

  const handleLongPress = (id: string) => {
    handleSelectPhoto(id);
  };

  const handlePress = (id: string) => {
    if (isSelectionMode) {
      handleSelectPhoto(id);
    }
  };

  const handleShare = () => {
    console.log('Share these photos:', selectedPhotos);
  };

  const renderItem = ({ item }: { item: { id: string, uri: string } }) => {
    const isSelected = !!selectedPhotos[item.id];
    const marginAdjustment = isSelected ? 4 : 5;
    const borderRadiusStyle = { borderRadius: isSelected ? 10 : 0 };

    return (
      <View style={[styles.imageContainer, borderRadiusStyle]}>
        <View
          style={[
            styles.borderView,
            borderRadiusStyle,
            {
              borderColor: isSelected ? 'blueviolet' : 'transparent',
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => handlePress(item.id)}
            onLongPress={() => handleLongPress(item.id)}
            style={[
              styles.imageContainer,
              {
                borderColor: isSelected ? 'blueviolet' : 'transparent',
                borderWidth: isSelected ? 4 : 0,
                margin: marginAdjustment,
                borderRadius: 10,
              },
            ]}
          >
            <Image source={{ uri: item.uri }} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
      />
      {isSelectionMode && (
        <View style={styles.footer}>
          <Button onPress={handleShare} title="Partager" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 2,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  borderView: {
    flex: 1,
    borderWidth: 4,
    borderColor: 'transparent',
    margin: -4,
  },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    backgroundColor: 'white',
  },
});

export default HomeScreen;
