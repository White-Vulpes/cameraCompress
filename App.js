
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';



export default function App() {
  const [status, reqPermission] = ImagePicker.useCameraPermissions();
  const [permissionResponse, Permission] = MediaLibrary.usePermissions();
  
  if(!status){
    return <View/>
  }

  if(!permissionResponse){
    return <View/>
  }

  if(!status.granted){
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={reqPermission} style={{alignItems: 'center',
                                                          backgroundColor: '#DC0000',
                                                          borderRadius: 15,
                                                          padding: 10,
                                                          height: 45,
                                                          width: 200,}}>
          <Text style={{fontSize: 16, alignContent: 'center'}}>Please Grant Camera Permission</Text></TouchableOpacity>
      </View>
    );
  }

  if(!permissionResponse.granted){
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={Permission} style={{alignItems: 'center',
                                                        backgroundColor: '#850000',
                                                        borderRadius: 15,
                                                        padding: 10,
                                                        height: 45,
                                                        width: 200,}}>
            <Text style={{fontSize: 16, alignContent: 'center'}}>Please Give Storage Permission</Text></TouchableOpacity>
      </View>
    );
  }

  let takePic = async () => {
    let result = await ImagePicker.launchCameraAsync({quality: 0.5}).then((result) => {return result});
    const asset = await MediaLibrary.createAssetAsync(result.assets[0].uri);
    const album = await MediaLibrary.getAlbumAsync('Download');
    if (album == null) {
      await MediaLibrary.createAlbumAsync('Download', asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder='Please enter file name'></TextInput>
      <TouchableOpacity onPress={takePic} style={styles.button}><Text style={{fontSize: 16, alignContent: 'center'}}>Take Picture</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FFDB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#FFDB89',
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 30,
    height: 45,
    width: 200,
  },

  heading: {
    fontSize: 40,
    color: '#DC0000',
    bottom: 20,
  },

  camera: {
    height: '70%',
    width: '100%',
  },

  takePicView: {
      top: 20,
      width: '100%',
      alignItems: 'center'
  },

  takePic: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: 'white'
  },

  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#FFDB89',
    color: 'black',
    borderRadius: 6,
    backgroundColor: '#FFF6C3',
  }
});
