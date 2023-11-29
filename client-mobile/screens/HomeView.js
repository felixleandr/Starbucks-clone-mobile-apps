import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import Slider from "../components/Slider";
import { useQuery } from "@apollo/client";
import { GET_BEVS } from "../config/apolloQuery";

export default function HomeView() {

  const { loading, error, data } = useQuery(GET_BEVS)
  console.log(error, 'nando');

  // console.log(loading, error, data, 'ini');
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
  const beverages = data.beverages


  return (
    <View style={styles.container}>
    <ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {" "}
          Good Afternoon !
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "green",
          }}
        >
          {" "}
          Green Level
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 16 }}>Profile</Text>
        <Text style={{ fontSize: 16 }}>Inbox</Text>
        <Text style={{ fontSize: 16 }}>E-Code</Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 3,
          backgroundColor: "gray",
          marginTop: 5,
        }}
      ></View>
      <StatusBar style="auto" />

      <View style={{ flex: 1, backgroundColor: "#EEEEEE" }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 5,
              paddingTop: 20,
              fontWeight: "bold",
              color: "#008001",
              textDecorationLine: "underline",
            }}
          >
            Hello peeps ! Check out what's new on Starbucks !
          </Text>
          <Slider />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 15,
            marginBottom: 10,
          }}
        >
          <Pressable
            style={{
              padding: 6,
              width: 80,
              borderWidth: 1,
              borderRadius: 30,
              borderStyle: "solid",
              borderColor: "black",
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              Details
            </Text>
          </Pressable>
          <Pressable
            style={{
              padding: 6,
              width: 80,
              border: 1,
              borderRadius: 30,
              backgroundColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              Redeem
            </Text>
          </Pressable>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "500", paddingLeft: 15 }}>
            Beverages
          </Text>
          <View style={{ display: "flex", gap: 20 }}>
            
            <FlatList
              data={beverages}
              renderItem={({ item }) => <Card beverage={item} />}
              keyExtractor={(item) => item.name}
              numColumns={2}
              contentContainerStyle={{ rowGap: 10, gap: 10, marginLeft: 10 }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    justifyContent: "start",
    backgroundColor: "white"
  },
  textBar: {
    fontSize: "12",
  },
});
