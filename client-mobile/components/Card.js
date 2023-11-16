import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import {
  Button,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function Card({ beverage }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        height: 230,
        backgroundColor: "white",
        borderRadius: 15,
        marginRight: 10,
        marginBottom: 10,
        overflow: "hidden",
      }}
    >
        
      <TouchableOpacity
        style={{ width: "100%",
        height:150}}
        onPress={() => navigation.navigate("Detail", { id: beverage.id })}
      >
        <Image
          source={{ uri: beverage.imgUrl }}
          style={{
            height: "100%",
            objectFit: "cover",
            borderRadius: 20,
          }}
        ></Image>
      </TouchableOpacity>
      <View
        style={{
          paddingHorizontal: 10,
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
          height:60,
          alignItems:'center',
        }}
      >
        <View style={{ gap: 2, width:'100%', marginTop:10, display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
            <View style ={{width: '60%'}}>
                <Text style={{ fontSize: 15, fontWeight: "600"}}>
                    {beverage.name}
                </Text>
                <Text style={{ fontSize: 12 }}>IDR {beverage.price}</Text>
            </View>
        <Pressable
          style={{
            backgroundColor: "#034E2C",
            borderRadius: 30,
            height: 40,
            width: 40,
            paddingTop:5
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
            +
          </Text>
        </Pressable>
        </View>
      </View>
    </View>
  );
}

export default Card;
