import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  notificationDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#c4a675',
  },
  searchBar: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchText: {
    color: '#999',
  },
  discoveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  discoveryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterTextContent: {
    color: '#c4a675',
  },
  filterIcon: {
    width: 16,
    height: 16,
    marginLeft: 4,
    tintColor: '#c4a675',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 80,
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
    backgroundColor: '#f5f5f5',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#d4b88d',
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
    paddingVertical: 12,
    height: 60,
  },
  navItem: {
    alignItems: 'center',
  },
  centerNavButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#d4b88d',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  // skeleton css
skeleton: {
  backgroundColor: '#e1e1e1',
  borderRadius: 4,
  overflow: 'hidden',
},
footer: {
  padding: 10,
  alignItems: 'center',
},
errorText: {
  color: 'red',
  marginBottom: 10,
  textAlign: 'center',
},
retryButton: {
  backgroundColor: '#6200ee',
  padding: 10,
  borderRadius: 5,
},
retryButtonText: {
  color: 'white',
  fontWeight: 'bold',
},

// filter css
modalContainer: {
  flex: 1,
  backgroundColor: '#fff',
  padding: 16,
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
},
modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
  paddingBottom: 10,
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
},
closeButton: {
  fontSize: 24,
  color: '#666',
},
filterSection: {
  marginBottom: 20,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
  paddingBottom: 10,
},
sectionTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
},
sortOptions: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 10,
},
sortButton: {
  paddingHorizontal: 16,
  paddingVertical: 8,
  marginRight: 10,
  marginBottom: 10,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#ddd',
},
activeSort: {
  backgroundColor: '#c4a675',
  borderColor: '#c4a675',
},
sortText: {
  color: '#333',
},
activeSortText: {
  color: '#fff',
},
categoryContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},
categoryButton: {
  padding: 10,
  marginBottom: 8,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#ddd',
  alignItems: 'center',
},
selectedCategory: {
  backgroundColor: '#c4a675',
  borderColor: '#c4a675',
},
categoryText: {
  color: '#333',
},
selectedCategoryText: {
  color: '#fff',
},
priceInputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},
priceInput: {
  flex: 1,
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 4,
  padding: 8,
  marginHorizontal: 5,
},
priceRangeSeparator: {
  marginHorizontal: 5,
},
priceRangeContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},
priceRangeButton: {
  padding: 10,
  marginBottom: 8,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#ddd',
  minWidth: '45%',
  alignItems: 'center',
},
priceRangeText: {
  color: '#333',
},
filterActions: {
  flexDirection: 'row',
  justifyContent: 'center',
  paddingTop: 10,
  borderTopWidth: 1,
  borderTopColor: '#eee',
},
clearButton: {
  padding: 12,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#c4a675',
  flex: 1,
  marginRight: 10,
  alignItems: 'center',
},
applyButton: {
  padding: 12,
  borderRadius: 4,
  backgroundColor: '#c4a675',
  flex: 1,
  alignItems: 'center',
},
clearButtonText: {
  color: '#c4a675',
},
applyButtonText: {
  color: '#fff',
},

});