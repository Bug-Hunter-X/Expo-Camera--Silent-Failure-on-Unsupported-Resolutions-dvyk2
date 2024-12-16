import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const bugSolution = () => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);
  const [supportedResolutions, setSupportedResolutions] = React.useState([]);
  const [selectedResolution, setSelectedResolution] = React.useState(null);
  const [cameraRef, setCameraRef] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      // Fetch supported resolutions
      const resolutions = await cameraRef?.getSupportedRatiosAsync();
      setSupportedResolutions(resolutions);
      setSelectedResolution(resolutions[0]); // Default resolution
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;  
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={ref => setCameraRef(ref)}
        style={styles.camera}
        type={type}
        ratio={selectedResolution}
      />
       <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            );
          }}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default bugSolution;