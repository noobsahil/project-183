import React from "react";
import { Image, View } from "react-native";

const Filter12 = ({face:{
  bounds:{
    size:{width:faceWidth, height:faceHeight}
  },
  leftEyePosition,
  rightEyePosition,
  noseBasePosition
}})=>{
  const filterWidth  = faceWidth;
  const filterHeight = faceHeight;

  const transformAngle = (
    angleRad = Math.atan(
      (rightEyePosition.y-leftEyePosition.y)/
      (rightEyePosition.x-leftEyePosition.x)
    )
  )=>angleRad*180/ Math.PI

  return(
    <View style={{
      position: "absolute", 
      left: leftEyePosition.x-filterWidth*0.35, 
      top: leftEyePosition.y-filterHeight*0.75
    }}>
      <Image
        source={require("../assets/hats/other-pic3.png")}
        style={{
          width:filterWidth, 
          height:filterHeight, 
          resizeMode:"contain", 
          transform:[{rotate:`${transformAngle()}deg`}]
        }}
      />
    </View>
  );
};

export default Filter12;