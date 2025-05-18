import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/BrowseProductsStyles';
import BottomNavigationBar from '../components/BottomNavbar';
import { Animated } from 'react-native';
import axios from 'axios';

// API configuration
const API_ENDPOINT = 'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/Xchange';
const API_PARAMS = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJuYmYiOjE3NDYxOTI1MTQsImV4cCI6MTc0ODc4NDUxNCwiaXNzIjoiWHVyMzRQMSIsImF1ZCI6Ilh1cjQ0UFAifQ.QD-fcLXtznCfkTIYkbOQfc5fXfxYgw_mOziKWpUHddk',
  version_number: '2.2.6',
  user_type: 'Xpert',
  search: '',
  categories: [],
  last_listing_id: '',
  sort: '',
  min: '',
  max: '',
  last_row_value: ''
};

// Skeleton Loading Component
// const ProductSkeleton = () => (
//   <View style={styles.productContainer}>
//     <View style={[styles.productImage, styles.skeleton]} />
//     <View style={[styles.productName, styles.skeleton, {width: '70%', height: 20}]} />
//     <View style={[styles.productPrice, styles.skeleton, {width: '40%', height: 18}]} />
//     <View style={[styles.productDescription, styles.skeleton, {height: 16}]} />
//     <View style={styles.sellerContainer}>
//       <View style={[styles.sellerImage, styles.skeleton]} />
//       <View style={[styles.sellerName, styles.skeleton, {width: '60%', height: 16}]} />
//     </View>
//   </View>
// );
const ProductSkeleton = () => {
  const pulseAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();

    return () => pulseAnim.stopAnimation();
  }, []);

  const backgroundColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e1e1e1', '#f0f0f0'], // Light to lighter gray
  });

  return (
    <View style={styles.productContainer}>
      <Animated.View 
        style={[
          styles.productImage, 
          styles.skeleton,
          { backgroundColor }
        ]} 
      />
      <Animated.View 
        style={[
          styles.productName, 
          styles.skeleton, 
          {width: '70%', height: 20},
          { backgroundColor }
        ]} 
      />
      <Animated.View 
        style={[
          styles.productPrice, 
          styles.skeleton, 
          {width: '40%', height: 18},
          { backgroundColor }
        ]} 
      />
      <Animated.View 
        style={[
          styles.productDescription, 
          styles.skeleton, 
          {height: 16},
          { backgroundColor }
        ]} 
      />
      <View style={styles.sellerContainer}>
        <Animated.View 
          style={[
            styles.sellerImage, 
            styles.skeleton,
            { backgroundColor }
          ]} 
        />
        <Animated.View 
          style={[
            styles.sellerName, 
            styles.skeleton, 
            {width: '60%', height: 16},
            { backgroundColor }
          ]} 
        />
      </View>
    </View>
  );
};
const BrowseProducts = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastListingId, setLastListingId] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const fetchProducts = async (loadMore = false) => {
    if ((isLoading && !loadMore) || (loadMore && !hasMore)) return;

    loadMore ? setIsLoadingMore(true) : setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_ENDPOINT, {
        ...API_PARAMS,
        last_listing_id: loadMore ? lastListingId : '',
      });

      if (response.status === 200) {
        if (response.data && response.data.xchange && Array.isArray(response.data.xchange)) {
          setProducts(prevProducts =>
            loadMore
              ? [...prevProducts, ...response.data.xchange]
              : response.data.xchange,
          );

          if (response.data.xchange.length > 0) {
            setLastListingId(
              response.data.xchange[response.data.xchange.length - 1].listing_id,
            );
          }

          setHasMore(response.data.xchange.length > 0);
        } else if (
          typeof response.data === 'string' &&
          (response.data.includes('Account is suspended') ||
            response.data.includes('Account is deleted') ||
            response.data.includes('Version not compatible') ||
            response.data.includes('IDX12741'))
        ) {
          setError(response.data);
          Alert.alert(
            'Error',
            `${response.data}. You will now be logged out of this app.`,
          );
          setProducts([]);
        } else {
          setError('Invalid response format from server');
          setProducts([]);
        }
      } else {
        setError('Failed to fetch products');
        setProducts([]);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching products');
      setProducts([]);
      console.error('API error:', err);
    } finally {
      loadMore ? setIsLoadingMore(false) : setIsLoading(false);
      setIsRefreshing(false);
      setShowSkeleton(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setShowSkeleton(true);
    setLastListingId('');
    setHasMore(true);
    fetchProducts();
  };

  useEffect(() => {
    setShowSkeleton(true);
    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore && products.length > 0) {
      fetchProducts(true);
    }
  };

  const renderFooter = () => {
    if (!hasMore && products.length > 0) {
      return (
        <View style={styles.footer}>
          <Text>No more products to load</Text>
        </View>
      );
    }
    return isLoadingMore ? (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#6200ee" />
      </View>
    ) : null;
  };

  const renderProduct = ({ item }) => {
      console.log('Product Item Parameters:', JSON.stringify(item, null, 2));
    return (
      <TouchableOpacity 
        style={styles.productContainer}
        onPress={() => navigation.navigate('ProductsPage', { itemId: item.item_id })}
      >
        <Image 
          source={{ uri: item.item_image || 'https://picsum.photos/300/300' }} 
          style={styles.productImage} 
          resizeMode="cover"
        />
        <Text style={styles.productPrice}>₱{item.selling_price || '0'}</Text>
        <Text style={styles.productName}>{item.model || item.brand || 'No Name'}</Text>
        <View style={styles.sellerContainer}>
          {item.lister_image ? (
            <Image 
              source={{ uri: item.lister_image }} 
              style={styles.sellerImage} 
            />
          ) : null}
          <Text style={styles.sellerName} numberOfLines={1}>
            {item.lister_name || 'Unknown seller'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>The XChange</Text>
        <View style={styles.notificationContainer}>
          <Image 
            source={require('../assets/bell_icon.png')}
            style={styles.notificationIcon}
          />
          <View style={styles.notificationDot} />
        </View>
      </View>
      
      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar}>
        <Text style={styles.searchText}>Tell us what you're looking for.</Text>
      </TouchableOpacity>
      
      {/* Daily Discovery Header */}
      <View style={styles.discoveryHeader}>
        <Text style={styles.discoveryText}>Daily Discovery</Text>
        <TouchableOpacity style={styles.filterText}>
          <Text style={styles.filterTextContent}>Filter</Text>
          <Image 
            source={require('../assets/filter_icon.png')} 
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>
      
      {/* Product List */}
      {showSkeleton || isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]} // Dummy data for skeleton
          renderItem={() => <ProductSkeleton />}
          keyExtractor={(item) => item.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#6200ee']}
              tintColor="#6200ee"
            />
          }
        />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.listing_id ? item.listing_id.toString() : Math.random().toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#6200ee']}
              tintColor="#6200ee"
            />
          }
        />
      )}
      
      {/* Bottom Navigation */}
      <BottomNavigationBar />
    </View>
  );
};

export default BrowseProducts;