import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  productImage: {
    width: '100%',
    height: 350,
    backgroundColor: '#fff',
  },
  productInfoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  brandText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  modelText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginBottom: 15,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sellerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: '#e0e0e0',
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  sellerId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  sellerLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  sellerJoined: {
    fontSize: 13,
    color: '#999',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  dropdownIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  provenanceItem: {
    marginBottom: 20,
  },
  provenanceSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  buyButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextOffer: {
    color: '#000',
  },
  buttonTextBuy: {
    color: '#fff',
  },

  sortButton: {
  padding: 10,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  flex: 1,
  marginHorizontal: 5,
  alignItems: 'center',
},
activeSort: {
  borderColor: '#6200ee',
  backgroundColor: '#6200ee',
},
sortText: {
  color: '#333',
},
activeSortText: {
  color: '#fff',
},
loadingContainer: {
  justifyContent: 'center',
  alignItems: 'center',
},
errorContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
errorText: {
  color: 'red',
  marginBottom: 20,
  textAlign: 'center',
},
retryText: {
  color: '#6200ee',
  fontWeight: 'bold',
},
descriptionBy: {
  marginTop: 10,
  fontStyle: 'italic',
  textAlign: 'right',
  color: '#666',
},
 specificationFooter: {
    alignItems: 'flex-end',
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  watermarkText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#999',
  }

  

});

export default styles;