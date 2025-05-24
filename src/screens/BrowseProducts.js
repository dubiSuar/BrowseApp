import React, {useState, useEffect} from 'react';
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
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles/BrowseProductsStyles';
import BottomNavigationBar from '../components/BottomNavbar';
import {Animated} from 'react-native';
import axios from 'axios';

const API_ENDPOINT =
  'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/Xchange';
const API_PARAMS = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJuYmYiOjE3NDYxOTI1MTQsImV4cCI6MTc0ODc4NDUxNCwiaXNzIjoiWHVyMzRQMSIsImF1ZCI6Ilh1cjQ0UFAifQ.QD-fcLXtznCfkTIYkbOQfc5fXfxYgw_mOziKWpUHddk',
  version_number: '2.2.6',
  user_type: 'Xpert',
  search: '',
  categories: [],
  last_listing_id: '',
  sort: '',
  min: '',
  max: '',
  last_row_value: '',
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
      ]),
    ).start();

    return () => pulseAnim.stopAnimation();
  }, []);

  const backgroundColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e1e1e1', '#f0f0f0'],
  });

  return (
    <View style={styles.productContainer}>
      <Animated.View
        style={[styles.productImage, styles.skeleton, {backgroundColor}]}
      />
      <Animated.View
        style={[
          styles.productName,
          styles.skeleton,
          {width: '70%', height: 20},
          {backgroundColor},
        ]}
      />
      <Animated.View
        style={[
          styles.productPrice,
          styles.skeleton,
          {width: '40%', height: 18},
          {backgroundColor},
        ]}
      />
      <Animated.View
        style={[
          styles.productDescription,
          styles.skeleton,
          {height: 16},
          {backgroundColor},
        ]}
      />
      <View style={styles.sellerContainer}>
        <Animated.View
          style={[styles.sellerImage, styles.skeleton, {backgroundColor}]}
        />
        <Animated.View
          style={[
            styles.sellerName,
            styles.skeleton,
            {width: '60%', height: 16},
            {backgroundColor},
          ]}
        />
      </View>
    </View>
  );
};

//=0=0=0=0=0=0=0=0=0=0=0=0
// filters 
//=0=0=0=0=0=0=0=0=0=0=0=0
const FilterModal = ({
  visible,
  onClose,
  categories,
  brands,
  models,
  selectedCategories,
  selectedBrands,
  selectedModels,
  toggleCategory,
  toggleBrand,
  toggleModel,
  priceRange,
  setPriceRange,
  sortOrder,
  setSortOrder,
  applyFilters,
  clearFilters,
  loadingBrands,
  loadingModels,
}) => {
  const [slideAnim] = useState(new Animated.Value(Dimensions.get('window').width));
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [localSelectedCategory, setLocalSelectedCategory] = useState('Category');

  const priceRanges = [
    {label: '1 - 5k', min: 1, max: 5000},
    {label: '5k - 10k', min: 5000, max: 10000},
    {label: '10k - 50k', min: 10000, max: 50000},
    {label: '50k+', min: 50000, max: null},
  ];

  useEffect(() => {
    if (visible) {
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
  }, [visible]);

  const handleCategorySelect = (category) => {
    setLocalSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const renderFilterContent = () => {
    switch (localSelectedCategory) {
      case 'Category':
        return (
          <View style={styles.categoryContainer}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategories.includes(category) &&
                    styles.selectedCategory,
                  {width: '45%', margin: '2%'},
                ]}
                onPress={() => toggleCategory(category)}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    selectedCategories.includes(category)
                      ? styles.selectedCategoryText
                      : styles.categoryText,
                    {flexShrink: 1},
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      
      case 'Brand':
        if (loadingBrands) {
          return (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#6200ee" />
              <Text style={styles.loadingText}>Loading brands...</Text>
            </View>
          );
        }
        return (
          <View style={styles.categoryContainer}>
            {brands.map(brand => (
              <TouchableOpacity
                key={brand}
                style={[
                  styles.categoryButton,
                  selectedBrands.includes(brand) &&
                    styles.selectedCategory,
                  {width: '45%', margin: '2%'},
                ]}
                onPress={() => toggleBrand(brand)}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={[
                    selectedBrands.includes(brand)
                      ? styles.selectedCategoryText
                      : styles.categoryText,
                    {flexShrink: 1},
                  ]}>
                  {brand}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      
      case 'Model':
        if (loadingModels) {
          return (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#6200ee" />
              <Text style={styles.loadingText}>Loading models...</Text>
            </View>
          );
        }
        return (
          <ScrollView style={{maxHeight: 200}}>
            <View style={styles.categoryContainer}>
              {models.map((model, index) => (
                <TouchableOpacity
                  key={`${model}-${index}`}
                  style={[
                    styles.categoryButton,
                    selectedModels.includes(model) &&
                      styles.selectedCategory,
                    {width: '90%', margin: '2%'},
                  ]}
                  onPress={() => toggleModel(model)}>
                  <Text
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    style={[
                      selectedModels.includes(model)
                        ? styles.selectedCategoryText
                        : styles.categoryText,
                      {flexShrink: 1},
                    ]}>
                    {model}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        );
      
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}>
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{translateX: slideAnim}],
            width: '80%',
            marginLeft: '20%',
            shadowColor: '#000',
            shadowOffset: {width: -2, height: 0},
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 10,
          },
        ]}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Sort</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>×</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {/* Category Dropdown Section */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Filter By</Text>
            <TouchableOpacity
              style={styles.categoryDropdownButton}
              onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}>
              <Text style={styles.categoryDropdownText}>
                {localSelectedCategory || 'Select Filter Type'}
              </Text>
              <Image
                source={
                  showCategoryDropdown
                    ? require('../assets/arrow_up.png')
                    : require('../assets/arrow_down.png')
                }
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>

            {showCategoryDropdown && (
              <View style={styles.categoryDropdownList}>
                <ScrollView nestedScrollEnabled={true} style={{maxHeight: 150}}>
                  <TouchableOpacity
                    style={[
                      styles.categoryDropdownItem,
                      localSelectedCategory === 'Category' && styles.selectedCategory,
                    ]}
                    onPress={() => handleCategorySelect('Category')}>
                    <Text
                      style={
                        localSelectedCategory === 'Category'
                          ? styles.selectedCategoryText
                          : styles.categoryText
                      }>
                      Category
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.categoryDropdownItem,
                      localSelectedCategory === 'Brand' && styles.selectedCategory,
                    ]}
                    onPress={() => handleCategorySelect('Brand')}>
                    <Text
                      style={
                        localSelectedCategory === 'Brand'
                          ? styles.selectedCategoryText
                          : styles.categoryText
                      }>
                      Brand
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.categoryDropdownItem,
                      localSelectedCategory === 'Model' && styles.selectedCategory,
                    ]}
                    onPress={() => handleCategorySelect('Model')}>
                    <Text
                      style={
                        localSelectedCategory === 'Model'
                          ? styles.selectedCategoryText
                          : styles.categoryText
                      }>
                      Model
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            )}
          </View>

          {/* Sort Section */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Sort</Text>
            <View style={styles.sortOptions}>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortOrder === 'ASC' && styles.activeSort,
                ]}
                onPress={() => setSortOrder('ASC')}>
                <Text
                  style={
                    sortOrder === 'ASC'
                      ? styles.activeSortText
                      : styles.sortText
                  }>
                  ASC
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortOrder === 'DESC' && styles.activeSort,
                ]}
                onPress={() => setSortOrder('DESC')}>
                <Text
                  style={
                    sortOrder === 'DESC'
                      ? styles.activeSortText
                      : styles.sortText
                  }>
                  DESC
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dynamic Filter Section */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Filter by {localSelectedCategory}</Text>
            {renderFilterContent()}
          </View>

          {/* Value Range Section */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Value Range</Text>
            <View style={styles.priceInputContainer}>
              <TextInput
                style={[styles.priceInput, {flex: 1}]}
                placeholder="Min"
                keyboardType="numeric"
                value={priceRange.min}
                onChangeText={text =>
                  setPriceRange({...priceRange, min: text})
                }
              />
              <Text style={styles.priceRangeSeparator}>-</Text>
              <TextInput
                style={[styles.priceInput, {flex: 1}]}
                placeholder="Max"
                keyboardType="numeric"
                value={priceRange.max}
                onChangeText={text =>
                  setPriceRange({...priceRange, max: text})
                }
              />
            </View>
            <View style={styles.priceRangeContainer}>
              {priceRanges.map(range => (
                <TouchableOpacity
                  key={range.label}
                  style={[
                    styles.priceRangeButton,
                    priceRange.min === range.min &&
                      priceRange.max === range.max &&
                      styles.selectedCategory,
                  ]}
                  onPress={() =>
                    setPriceRange({min: range.min, max: range.max})
                  }>
                  <Text
                    style={
                      priceRange.min === range.min &&
                      priceRange.max === range.max
                        ? styles.selectedCategoryText
                        : styles.priceRangeText
                    }>
                    {range.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.filterActions}>
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

//=0=0=0=0=0=0=0=0=0=0=0=0
//products
//=0=0=0=0=0=0=0=0=0=0=0=0
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
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [priceRange, setPriceRange] = useState({min: '', max: ''});
  const [sortOrder, setSortOrder] = useState('');
  const [showInput, setShowInput] = useState(false);

  // Brand and Model data
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);

  //search
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const categories = [
    'Bags',
    'Shoes',
    'Jewelry',
    'Toys',
    'Watches',
    'Automatic and Parts',
    'Electronics and Gadgets',
    'Clothing',
    'Eyewear',
    'Musical Instrument',
    'Trading Cards',
    'Artworks',
    'Rare Coins',
    'Books and Comic Books',
    'Stamps',
    'Antiques',
    'Music',
    'Movie',
    'Sports',
    'Others',
  ];

  const toggleCategory = category => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category],
    );
  };

  const toggleBrand = brand => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand],
    );
  };

  const toggleModel = model => {
    setSelectedModels(prev =>
      prev.includes(model)
        ? prev.filter(m => m !== model)
        : [...prev, model],
    );
  };

  const fetchBrandsAndModels = async () => {
    setLoadingBrands(true);
    setLoadingModels(true);

    try {
      const response = await axios.post(API_ENDPOINT, {
        ...API_PARAMS,
        last_listing_id: '',
        categories: [],
        min: '',
        max: '',
        sort: '',
        search: '',
      });

      if (response.status === 200 && response.data && response.data.xchange && Array.isArray(response.data.xchange)) {
        const uniqueBrands = [...new Set(
          response.data.xchange
            .map(item => item.brand)
            .filter(brand => brand && brand.trim() !== '')
        )].sort();

        const uniqueModels = [...new Set(
          response.data.xchange
            .map(item => item.model)
            .filter(model => model && model.trim() !== '')
        )].sort();

        setBrands(uniqueBrands);
        setModels(uniqueModels);
      }
    } catch (err) {
      console.error('Error fetching brands and models:', err);
    } finally {
      setLoadingBrands(false);
      setLoadingModels(false);
    }
  };

  const applyFilters = () => {
    setShowFilterModal(false);
    setShowSkeleton(true);
    setLastListingId('');
    setHasMore(true);

    fetchProducts(false, {
      selectedCategories,
      selectedBrands,
      selectedModels,
      priceRange,
      sortOrder,
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedModels([]);
    setPriceRange({min: '', max: ''});
    setSortOrder('');
  };

  const fetchProducts = async (loadMore = false, filters = {}) => {
    if ((isLoading && !loadMore) || (loadMore && !hasMore)) return;

    loadMore ? setIsLoadingMore(true) : setIsLoading(true);
    setError(null);

    try {
      // Build filter parameters
      let filterCategories = filters.selectedCategories || selectedCategories;
      
      // Add brand filtering logic
      let brandFilter = filters.selectedBrands || selectedBrands;
      let modelFilter = filters.selectedModels || selectedModels;

      const response = await axios.post(API_ENDPOINT, {
        ...API_PARAMS,
        last_listing_id: loadMore ? lastListingId : '',
        categories: filterCategories,
        min: filters.priceRange?.min ?? priceRange.min,
        max: filters.priceRange?.max ?? priceRange.max,
        sort: filters.sortOrder || sortOrder,
        search: filters.searchQuery ?? searchQuery,
      });

      if (response.status === 200) {
        console.log('API response:', response.data);
        if (
          response.data &&
          response.data.xchange &&
          Array.isArray(response.data.xchange)
        ) {
          let filteredProducts = response.data.xchange;

          // Apply brand filter if selected
          if (brandFilter.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
              brandFilter.includes(product.brand)
            );
          }

          // Apply model filter if selected
          if (modelFilter.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
              modelFilter.includes(product.model)
            );
          }

          setProducts(prevProducts =>
            loadMore
              ? [...prevProducts, ...filteredProducts]
              : filteredProducts,
          );

          if (filteredProducts.length > 0) {
            setLastListingId(
              filteredProducts[filteredProducts.length - 1].listing_id,
            );
          }

          setHasMore(filteredProducts.length > 0);
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

  const handleSearch = () => {
    setLastListingId('');  
    setHasMore(true);
    fetchProducts(false, { searchQuery: query }); 
    setShowInput(false);  
  };

  useEffect(() => {
    setShowSkeleton(true);
    fetchProducts();
    fetchBrandsAndModels(); // Fetch brands and models on component mount
  }, []);

  //Instant Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); 

    return () => {
      clearTimeout(handler); 
    };
  }, [query]);

  useEffect(() => {
    setLastListingId('');
    setHasMore(true);
    fetchProducts(false, { searchQuery: debouncedQuery });
  }, [debouncedQuery]);

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

  //=0=0=0=0=0=0=0=0=0=0=0=0
  //pag render ng items
  //=0=0=0=0=0=0=0=0=0=0=0=0
  const renderProduct = ({item}) => {
    console.log('Product Item Parameters:', JSON.stringify(item, null, 2));
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => navigation.navigate('ProductsPage', {item: item})}>
        <Image
          source={{uri: item.item_image || 'https://picsum.photos/300/300'}}
          style={styles.productImage}
          resizeMode="cover"
        />
        <Text style={styles.productPrice}>PHP {item.selling_price || '0'}</Text>
        <Text style={styles.productName}>
          {item.model || item.brand || 'No Name'}
        </Text>
        <View style={styles.sellerContainer}>
          {item.lister_image ? (
            <Image
              source={{uri: item.lister_image}}
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
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
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

      {showInput ? (
        <TextInput
          style={styles.searchInput}
          placeholder="Search for something..."
          value={query}
          onChangeText={setQuery}
          autoFocus
          onSubmitEditing={() => {
            handleSearch();
            setShowInput(false); // close input after search
          }}
          returnKeyType="search"
        />
      ) : (
        <TouchableOpacity style={styles.searchBar} onPress={() => setShowInput(true)}>
          <Text style={styles.searchText}>
            {query.trim() === '' ? "Tell us what you're looking for." : query}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.discoveryHeader}>
        <Text style={styles.discoveryText}>Daily Discovery</Text>
        <TouchableOpacity
          style={styles.filterText}
          onPress={() => setShowFilterModal(true)}>
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
          keyExtractor={item => item.toString()}
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
          keyExtractor={item =>
            item.listing_id
              ? item.listing_id.toString()
              : Math.random().toString()
          }
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

      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        categories={categories}
        brands={brands}
        models={models}
        selectedCategories={selectedCategories}
        selectedBrands={selectedBrands}
        selectedModels={selectedModels}
        toggleCategory={toggleCategory}
        toggleBrand={toggleBrand}
        toggleModel={toggleModel}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
        loadingBrands={loadingBrands}
        loadingModels={loadingModels}
      />
      <BottomNavigationBar />
    </View>
  );
};

export default BrowseProducts;