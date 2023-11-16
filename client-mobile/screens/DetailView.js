import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GET_BEV_BY_ID } from "../config/apolloQuery";

function DetailView({ route }) {
  const { id } = route.params;

  const { loading, error, data } = useQuery(GET_BEV_BY_ID, {
    variables: {beverageId: id}
  });

  const beverageById = data?.beverage

  if(loading) return (
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <ActivityIndicator size={"large"} color={'green'}></ActivityIndicator>
    </View>
    )
  
    if(error) return (
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <Text>{error.message}</Text>
    </View>
    )

  return (
    <View style={{ flex: 1, backgroundColor: "#EEEEEE", position: "relative" }}>
      <View style={{ height: 350, position: "relative" }}>
        <Image
          source={{
            uri: beverageById?.imgUrl,
          }}
          style={{ width: "100%", objectFit: "cover", height: "106%" }}
        ></Image>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              position: "absolute",
              fontSize: 20,
              bottom: 90,
              paddingHorizontal: 25,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {beverageById?.name}
          </Text>
          <Text
            style={{
              position: "absolute",
              fontSize: 15,
              bottom: 70,
              paddingHorizontal: 25,
              color: "white",
              fontWeight: "400",
            }}
          >
            {beverageById?.price}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
          gap: 20,
          position: "relative",
          bottom: 20,
          backgroundColor: "#EEEEEE",
          borderTopStartRadius: 50,
          borderTopEndRadius: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{ display: "flex", justifyContent: "flex-start", gap: 20 }}
        >
          <View style={{ paddingBottom: 10, alignItems: "center" }}>
            <View
              style={{
                paddingHorizontal: 10,
                backgroundColor: "gray",
                height: 40,
                width: "90%",
                marginTop: 20,
                borderRadius: 30,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {beverageById?.Ingredients?.map((element, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.textIngredients,
                        {
                          borderRightWidth:
                            i !== beverageById.Ingredients.length - 1 ? 1 : 0,
                          borderColor: "white",
                        },
                      ]}
                    >
                      {element.name}{" "}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <ScrollView contentContainerStyle={{ display: "flex", justifyContent: "flex-start", gap: 20, borderBottomWidth: 1}}>
            <View style={{ gap: 3 }}>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Created By</Text>
                <Text style={{ fontSize: 14 }}>{beverageById?.User?.email}</Text>
                <View style={{ height: 1, backgroundColor: "gray" }}></View>
            </View>
            <View style={{ gap: 3 }}>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Categories</Text>
                <Text style={{ fontSize: 16 }}>{beverageById?.Category?.name}</Text>
                <View style={{ height: 1, backgroundColor: "gray" }}></View>
            </View>
            <View style={{ gap: 3 }}>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Description</Text>
                <Text style={{ fontSize: 16 }}>{beverageById?.description}</Text>
                <View style={{ height: 1, backgroundColor: "gray" }}></View>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{width:"100%", justifyContent:'center', alignItems:'center'}}>
        <Pressable
          style={{
            width: "80%",
            height: 50,
            backgroundColor: "#034E2C",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
            marginBottom: 25
          }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>Order Now</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textIngredients: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default DetailView;
