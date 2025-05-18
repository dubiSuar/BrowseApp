import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, StatusBar, Animated, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Video from 'react-native-video';
import { styles, splashStyles } from './src/styles/AppStyles';
import LoginScreen from './src/screens/LoginScreen';
import BrowseProducts from './src/screens/BrowseProducts';
import ProductsPage from './src/screens/ProductsPage';

const Stack = createStackNavigator();

const SplashScreen = ({ onComplete }) => {
  return (
    <View style={splashStyles.container}>
      <Video
        source={require('./src/assets/xure_splashscreen.mp4')}
        style={splashStyles.video}
        muted={true}
        repeat={false}
        resizeMode="cover"
        onEnd={onComplete}
        onError={(error) => console.log('Video error:', error)}
      />
    </View>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      fadeOut();
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    fadeOut();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => setIsLoading(false));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <Animated.View style={{ flex: 1, width: '100%', opacity: fadeAnim }}>
            <SplashScreen onComplete={handleVideoEnd} />
          </Animated.View>
        ) : (
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
  <Stack.Screen 
    name="Login" 
    component={LoginScreen}
    options={{ headerShown: false }}
  />
  <Stack.Screen 
    name="BrowseProducts" 
    component={BrowseProducts} 
    options={{ headerShown: false }}
  />
  <Stack.Screen 
    name="ProductsPage" 
    component={ProductsPage} 
    options={{ headerShown: false }}
  />
</Stack.Navigator>
          </NavigationContainer>
        )}
      </SafeAreaView>
    </>
  );
};

export default App;
