import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { styles } from '../styles/BrowseProductsStyles';
import BottomNavigationBar from '../components/BottomNavbar';

const BrowseProducts = () => {

  const products = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: '$99.99',
      description: 'Premium sound quality with noise cancellation',
      image: 'https://m.media-amazon.com/images/I/61vD07Z0XpL._AC_UF1000,1000_QL80_.jpg',
      seller: {
        name: 'AudioTech',
        profilePic: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: '$199.99',
      description: 'Track your fitness and stay connected',
      image: 'https://m.media-amazon.com/images/I/71Swqqe7XAL._AC_UF1000,1000_QL80_.jpg',
      seller: {
        name: 'TechGadgets',
        profilePic: 'https://randomuser.me/api/portraits/women/44.jpg'
      }
    },
    {
      id: '3',
      name: 'Bluetooth Speaker',
      price: '$59.99',
      description: 'Portable speaker with 20h battery life',
      image: 'https://m.media-amazon.com/images/I/61B8GE8KVAL._AC_UF1000,1000_QL80_.jpg',
      seller: {
        name: 'SoundMaster',
        profilePic: 'https://randomuser.me/api/portraits/men/75.jpg'
      }
    },
    {
      id: '4',
      name: 'Laptop Backpack',
      price: '$49.99',
      description: 'Durable and water-resistant',
      image: 'https://m.media-amazon.com/images/I/71SdA3+NPUL._AC_UF1000,1000_QL80_.jpg',
      seller: {
        name: 'TravelGear',
        profilePic: 'https://randomuser.me/api/portraits/women/63.jpg'
      }
    },
    {
      id: '5',
      name: 'Wireless Earbuds',
      price: '$79.99',
      description: 'True wireless with charging case',
      image: 'https://m.media-amazon.com/images/I/61O+rN8YYNL._AC_UF1000,1000_QL80_.jpg',
      seller: {
        name: 'SoundTech',
        profilePic: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    },
    {
      id: '6',
      name: 'Fitness Tracker',
      price: '$89.99',
      description: 'Heart rate monitor and step counter',
      image: 'https://m.media-amazon.com/images/I/61S2KdoGNnL._AC_UF1000,1000_QL80_.jpg',
      seller: {
        name: 'FitGear',
        profilePic: 'https://randomuser.me/api/portraits/women/33.jpg'
      }
    }
  ];

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage} 
        resizeMode="cover"
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <View style={styles.sellerContainer}>
        <Image 
          source={{ uri: item.seller.profilePic }} 
          style={styles.sellerImage} 
        />
        <Text style={styles.sellerName}>{item.seller.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>The XChange</Text>
        <Image 
          source={require('../assets/bell_icon.png')}
          style={styles.notificationIcon}
        />
      </View>
      
      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar}>
        <Text style={styles.searchText}>Tell us what you're looking for.</Text>
      </TouchableOpacity>
      
      {/* Daily Discovery Header */}
      <View style={styles.discoveryHeader}>
        <Text style={styles.discoveryText}>Daily Discovery</Text>
        <TouchableOpacity style={styles.filterText}>
          <Text>Filter</Text>
          <Image 
            source={require('../assets/filter_icon.png')} 
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>
      
      {/* Product List */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
      
      {/* Bottom Navigation */}
      <BottomNavigationBar />
    </View>
  );
};

export default BrowseProducts;
