import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Modal,
  ScrollView,
  Dimensions,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/BrowseProductsStyles';
import BottomNavigationBar from '../components/BottomNavbar';
import { Animated } from 'react-native';
import axios from 'axios';

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
    outputRange: ['#e1e1e1', '#f0f0f0'],
  });

  return (
    <View style={styles.productContainer}>
      <Animated.View style={[styles.productImage, styles.skeleton, { backgroundColor }]} />
      <Animated.View style={[styles.productName, styles.skeleton, {width: '70%', height: 20}, { backgroundColor }]} />
      <Animated.View style={[styles.productPrice, styles.skeleton, {width: '40%', height: 18}, { backgroundColor }]} />
      <Animated.View style={[styles.productDescription, styles.skeleton, {height: 16}, { backgroundColor }]} />
      <View style={styles.sellerContainer}>
        <Animated.View style={[styles.sellerImage, styles.skeleton, { backgroundColor }]} />
        <Animated.View style={[styles.sellerName, styles.skeleton, {width: '60%', height: 16}, { backgroundColor }]} />
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
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortOrder, setSortOrder] = useState('');

  const categories = [
    'Bags', 'Shoes', 'Jewelry', 'Toys', 'Watches', 
    'Automatic and Parts', 'Electronics and Gadgets', 'Clothing', 
    'Eyewear', 'Musical Instrument', 'Trading Cards', 'Artworks', 
    'Rare Coins', 'Books and Comic Books', 'Stamps', 'Antiques', 
    'Music', 'Movie', 'Sports', 'Others'
  ];

  const priceRanges = [
    { label: '1 - 5k', min: 1, max: 5000 },
    { label: '5k - 10k', min: 5000, max: 10000 },
    { label: '10k - 50k', min: 10000, max: 50000 },
    { label: '50k+', min: 50000, max: null }
  ];

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const applyFilters = () => {
    setShowFilterModal(false);
    setShowSkeleton(true);
    setLastListingId('');
    setHasMore(true);
    fetchProducts();
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '' });
    setSortOrder('');
    applyFilters();
  };

  const fetchProducts = async (loadMore = false) => {
    if ((isLoading && !loadMore) || (loadMore && !hasMore)) return;

    loadMore ? setIsLoadingMore(true) : setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_ENDPOINT, {
        ...API_PARAMS,
        last_listing_id: loadMore ? lastListingId : '',
        categories: selectedCategories,
        min: priceRange.min,
        max: priceRange.max,
        sort: sortOrder
      });

      if (response.status === 200) {
        if (response.data && response.data.xchange && Array.isArray(response.data.xchange)) {
          setProducts(prevProducts =>
            loadMore
              ? [...prevProducts, ...response.data.xchange]
              : response.data.xchange
          );

          if (response.data.xchange.length > 0) {
            setLastListingId(
              response.data.xchange[response.data.xchange.length - 1].listing_id
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

    const FilterModal = () => {
    const [slideAnim] = useState(new Animated.Value(Dimensions.get('window').width));

    useEffect(() => {
      if (showFilterModal) {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(slideAnim, {
          toValue: Dimensions.get('window').width,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }, [showFilterModal]);

    return (
      <Modal
        visible={showFilterModal}
        animationType="none"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              transform: [{ translateX: slideAnim }],
              width: '80%',
              marginLeft: '20%',
              shadowColor: '#000',
              shadowOffset: { width: -2, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 10,
            }
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>The Xch</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Sort</Text>
              <View style={styles.sortOptions}>
                <TouchableOpacity 
                  style={[styles.sortButton, sortOrder === 'Category' && styles.activeSort]}
                  onPress={() => setSortOrder('Category')}
                >
                  <Text style={sortOrder === 'Category' ? styles.activeSortText : styles.sortText}>Category</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.sortButton, sortOrder === 'ASC' && styles.activeSort]}
                  onPress={() => setSortOrder('ASC')}
                >
                  <Text style={sortOrder === 'ASC' ? styles.activeSortText : styles.sortText}>ASC</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.sortButton, sortOrder === 'DESC' && styles.activeSort]}
                  onPress={() => setSortOrder('DESC')}
                >
                  <Text style={sortOrder === 'DESC' ? styles.activeSortText : styles.sortText}>DESC</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Daily Disc</Text>
              <Text style={[styles.sectionTitle, { fontSize: 14, marginBottom: 10 }]}>Filter by Category</Text>
              <View style={styles.categoryContainer}>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      selectedCategories.includes(category) && styles.selectedCategory,
                      { width: '45%', margin: '2%' }
                    ]}
                    onPress={() => toggleCategory(category)}
                  >
                    <Text style={selectedCategories.includes(category) ? styles.selectedCategoryText : styles.categoryText}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Value Range</Text>
              <View style={styles.priceInputContainer}>
                <TextInput
                  style={[styles.priceInput, { flex: 1 }]}
                  placeholder="Min"
                  keyboardType="numeric"
                  value={priceRange.min}
                  onChangeText={text => setPriceRange({...priceRange, min: text})}
                />
                <Text style={styles.priceRangeSeparator}>-</Text>
                <TextInput
                  style={[styles.priceInput, { flex: 1 }]}
                  placeholder="Max"
                  keyboardType="numeric"
                  value={priceRange.max}
                  onChangeText={text => setPriceRange({...priceRange, max: text})}
                />
              </View>
              <View style={styles.priceRangeContainer}>
                {priceRanges.map(range => (
                  <TouchableOpacity
                    key={range.label}
                    style={[
                      styles.priceRangeButton,
                      priceRange.min === range.min && priceRange.max === range.max && styles.selectedCategory
                    ]}
                    onPress={() => setPriceRange({ min: range.min, max: range.max })}
                  >
                    <Text style={priceRange.min === range.min && priceRange.max === range.max ? styles.selectedCategoryText : styles.priceRangeText}>
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.priceRangeButton}
                  onPress={() => setPriceRange({ min: '', max: '' })}
                >
                  <Text style={styles.priceRangeText}>Clear</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View style={styles.filterActions}>
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
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
      
      <TouchableOpacity style={styles.searchBar}>
        <Text style={styles.searchText}>Tell us what you're looking for.</Text>
      </TouchableOpacity>
      
      <View style={styles.discoveryHeader}>
        <Text style={styles.discoveryText}>Daily Discovery</Text>
        <TouchableOpacity 
          style={styles.filterText}
          onPress={() => setShowFilterModal(true)}
        >
          <Text style={styles.filterTextContent}>Filter</Text>
          <Image 
            source={require('../assets/filter_icon.png')} 
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>
      
      {showSkeleton || isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
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
      
      <FilterModal />
      <BottomNavigationBar />
    </View>
  );
};

export default BrowseProducts;