import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Camera, useCameraDevice, CameraPosition, CameraDevice } from 'react-native-vision-camera';

const MyCameraView = () => {
  const cameraRef = useRef<Camera>(null);
  const [cameraType, setCameraType] = useState<CameraPosition>('back');
  const [device, setDevice] = useState<CameraDevice | null>(null);

  setDevice(useCameraDevice(cameraType) || null);


  const takePhoto = async () => {
    if (cameraRef.current && device) {
      try {
        const photo = await cameraRef.current.takePhoto();
        console.log(photo);
      } catch (error) {
        console.error("Erreur lors de la capture de la photo:", error);
      }
    }
  };


  const switchCamera = () => {
    setCameraType(prevType => (prevType === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      {device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          ref={cameraRef}
          photo={true}
        />
      )}
      <View style={styles.controls}>
        <TouchableOpacity onPress={takePhoto} style={styles.captureButton} />
        <TouchableOpacity onPress={switchCamera} style={styles.switchButton}>
          <Text>Changer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    marginHorizontal: 20,
  },
  switchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default MyCameraView;
