import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  StyleSheet, 
  Dimensions 
} from 'react-native';

const BrowseProducts = () => {
  // Sample product data with mock image URLs
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
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productContainer: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 16,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f5f5f5', // Fallback background while loading
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#e0e0e0', 
  },
  sellerName: {
    fontSize: 12,
    color: '#666',
  },
});

export default BrowseProducts;