import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const BottomNavBar = ({ navigation }) => {
  return (
    <>
      <View style={navStyles.bottomNav}>
        <TouchableOpacity style={navStyles.navItem} onPress={() => navigation.navigate('Xhibit')}>
          <Image source={require('../assets/navicons/xhibit.png')} style={navStyles.navIcon} />
          <Text style={navStyles.navLabel}>Xhibit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={navStyles.navItem} onPress={() => navigation.navigate('Xchange')}>
          <Image source={require('../assets/navicons/xchange.png')} style={navStyles.navIcon} />
          <Text style={navStyles.navLabel}>Xchange</Text>
        </TouchableOpacity>

        <View style={{ width: 60 }} /> {/* Placeholder for center circle */}

        <TouchableOpacity style={navStyles.navItem} onPress={() => navigation.navigate('Inventory')}>
          <Image source={require('../assets/navicons/inventory.png')} style={navStyles.navIcon} />
          <Text style={navStyles.navLabel}>Inventory</Text>
        </TouchableOpacity>

        <TouchableOpacity style={navStyles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/navicons/profile.png')} style={navStyles.navIcon} />
          <Text style={navStyles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Center Floating Button */}
      <TouchableOpacity
        style={navStyles.centerNavButton}
        onPress={() => console.log('Center Action')}
      >
        <Image source={require('../assets/curewlogo.png')} style={navStyles.centerIcon} />
      </TouchableOpacity>
    </>
  );
};

const navStyles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: 60,
    paddingHorizontal: 16,
    zIndex: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  navLabel: {
    fontSize: 10,
    color: '#333',
    marginTop: 2,
  },
centerNavButton: {
  position: 'absolute',
  bottom: 30,
  alignSelf: 'center',
  backgroundColor: 'white',
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  shadowOffset: { width: 0, height: 4 }, // Shadow only on the bottom
  shadowOpacity: 0.3,
  shadowRadius: 4,
},

  centerIcon: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
});

export default BottomNavBar;
