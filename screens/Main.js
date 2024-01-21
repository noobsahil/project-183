import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Platform, 
  Image, 
  ScrollView, 
  TouchableOpacity 
} from "react-native";
import { Camera } from "expo-camera";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as FaceDetector from "expo-face-detector";
import Filter10 from '../components/Filter10';
import Filter11 from '../components/Filter11';
import Filter12 from '../components/Filter12';

var data = [
  {"id":10, "image":require("../assets/hats/other-pic1.png")},
  {"id":11, "image":require("../assets/hats/other-pic2.png")},
  {"id":12, "image":require("../assets/hats/other-pic3.png")},
]

export default class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hasCameraPermission: null,
      faces: [],
      current_filter: "filter_10"
    };

    this.onFacesDetected = this.onFacesDetected.bind(this);
  };
  
  async componentDidMount(){
    const { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
  };

  onFacesDetected({ faces }){
    this.setState({ faces: faces });
    //console.log(this.state.faces);
  };

  onFacesDetectionError = (error)=>{
    console.log(error);
  }

  render(){
    const {hasCameraPermission} = this.state;
    if (hasCameraPermission === null){
      return <View/>;
    };
    if (hasCameraPermission === false){
      return(
        <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
          <Text style={styles.noAccessText}>very no access to camera</Text>
        </View>  
      );
    };
    return(
      <View style={styles.container}>
      <SafeAreaView style={styles.iosSafeArea}/>
        <StatusBar backgroundColor="#000"/>
        <View style={styles.headingContainer}>
          <Image
            style={{width: 75, height: 75}}
            source={require('../assets/logo2.png')}
          />
          <Text style={styles.titleText}>  DisguiseCam</Text>
        </View>
        <View style={styles.middleContainer}>
          <Camera
            style={styles.cameraStyle}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassififcations: FaceDetector.FaceDetectorClassifications.all
            }}
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFacesDetectionError}
          />
          {this.state.faces.map(face=>{
            if (this.state.current_filter === "filter_10"){
              return <Filter10 key={`face-id-${face.faceID}`} face={face}/>
            } 
            else if (this.state.current_filter === "filter_11"){
              return <Filter11 key={`face-id-${face.faceID}`} face={face}/>
            }
            else if (this.state.current_filter === "filter_12"){
              return <Filter12 key={`face-id-${face.faceID}`} face={face}/>
            }

          })}
            
        </View>
        <View style={styles.filterContainer}>
          <ScrollView style={{flexDirection:"row"}} horizontal showsHorizontalScrollIndicator={false}>
            {
              data.map(filter_data=>{
                return <TouchableOpacity style={styles.filterImageContainer} onPress={()=>{
                  this.setState({current_filter:`filter_${filter_data.id}`})
                }}>
                  <Image source={filter_data.image} style={{height:45, width:60}}/>
                </TouchableOpacity>
              })
            }
          </ScrollView>
        </View>
    </View>
    );
  };
};

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  iosSafeArea:{
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
  },
  headingContainer:{
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  noAccessText:{
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText:{
    fontSize: 30,
  },
  middleContainer:{
    flex: 0.75
  },
  cameraStyle:{
    flex: 1,
    width: "100%", 
    alignSelf: "center",
  },
  filterContainer:{
    flex: 0.2,
  },
  filterImageContainer:{
    height: RFPercentage(8),
    width: RFPercentage(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal:10
  },
});