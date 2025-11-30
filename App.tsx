import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/context/AuthContext';
import CommuniteyFeed from './src/screens/CommunityFeedScreen';
/**
 * Sample React Native App 
*
* @format
*/

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';  

const Stack = createStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>    
  );
}  

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={CommuniteyFeed}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="Details"
            component={DetailScreen}
            options={{ title: 'Details' }}
          /> */}    
        </Stack.Navigator>
      </NavigationContainer>  
    </AuthProvider>    
  );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },  
});  

export default App;


// import DetailScreen from './src/screens/DetailScreen';

