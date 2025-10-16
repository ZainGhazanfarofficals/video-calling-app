import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function StyledButton({
    title,
    onPress,
    style,
}:{
    title: string;
    onPress: ()=>void;
    style?:any
}) {
  return (
    <TouchableOpacity
    style={{
        backgroundColor: "white",
        padding: 12,
        borderRadius: 5,
        width:"100%",
        ...style,
    }}
    
    >
      <Text
       onPress={onPress}
       style={{
        color:"#50C878",
        fontSize:16,
        textAlign:"center",
        fontWeight:"bold"
      }}>{title}</Text>
    </TouchableOpacity>
  )
}