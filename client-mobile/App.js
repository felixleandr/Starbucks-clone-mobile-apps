import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Header, createStackNavigator } from '@react-navigation/stack';
import HomeView from './screens/HomeView';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from './components/Slider';
import DetailView from './screens/DetailView';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './config/apolloClient';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='Detail' component={DetailView}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>

  );
}

function Home() {
  return (
  <View style={{
    flex: 1
  }}>
    <HomeView/>
  </View>
  )
}



// function Header(params){
//   return (
//     <SafeAreaView>
//       <Text style={{backgroundColor: 'red'}}>test</Text>
//     </SafeAreaView>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
