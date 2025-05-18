// wag i delete to
// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   Image, 
//   ScrollView, 
//   StyleSheet, 
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert
// } from 'react-native';
// import axios from 'axios';
// import BottomNavigationBar from '../components/BottomNavbar';
// import { styles } from '../styles/ProductsPageStyles';

// const API_ENDPOINT = 'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/Xchange';
// const API_PARAMS = {
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJuYmYiOjE3NDYxOTI1MTQsImV4cCI6MTc0ODc4NDUxNCwiaXNzIjoiWHVyMzRQMSIsImF1ZCI6Ilh1cjQ0UFAifQ.QD-fcLXtznCfkTIYkbOQfc5fXfxYgw_mOziKWpUHddk',
//   version_number: '2.2.6',
//   user_type: 'Xpert',
//   search: '',
//   categories: [],
//   last_listing_id: '',
//   sort: '',
//   min: '',
//   max: '',
//   last_row_value: ''
// };

// const ProductsPage = ({ route, navigation }) => {
//   const { itemId } = route.params;
//   const [product, setProduct] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchProductDetails = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(API_ENDPOINT, {
//         ...API_PARAMS,
//         search: '',
//         last_listing_id: '',
//       });

//       if (response.status === 200 && response.data && response.data.xchange) {
//         const foundProduct = response.data.xchange.find(
//           item => item.item_id === itemId
//         );
        
//         if (foundProduct) {
//           setProduct(foundProduct);
//         } else {
//           setError('Product not found');
//         }
//       } else {
//         setError('Invalid response from server');
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to fetch product');
//       console.error('API error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProductDetails();
//   }, [itemId]);

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#6200ee" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity
//           style={styles.retryButton}
//           onPress={fetchProductDetails}>
//           <Text style={styles.retryButtonText}>Try Again</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   if (!product) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Product not available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Image 
//           source={{ uri: product.item_image || 'https://picsum.photos/300/300' }} 
//           style={styles.productImage} 
//           resizeMode="contain"
//         />
        
//         <View style={styles.productInfoContainer}>
//           <Text style={styles.brandText}>{product.brand || 'HUNTER HUNTER'}</Text>
//           <Text style={styles.modelText}>{product.model || 'PHOTOCARD'}</Text>
//           <Text style={styles.priceText}>HKD {product.selling_price ? product.selling_price.toLocaleString() : '1,200.00'}</Text>
          
//           <View style={styles.sellerContainer}>
//             {product.lister_image && (
//               <Image 
//                 source={{ uri: product.lister_image }} 
//                 style={styles.sellerImage} 
//               />
//             )}
//             <View style={styles.sellerInfo}>
//               <Text style={styles.sellerName}>{product.lister_name || 'mantra'}</Text>
//               <Text style={styles.sellerId}>AC-{product.lister_id || '1000000007'}</Text>
//               <Text style={styles.sellerLocation}>{product.lister_location || 'Metro Manila, Philippines'}</Text>
//             </View>
//           </View>
//         </View>
        
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Provenance</Text>
          
//           <View style={styles.provenanceItem}>
//             <Text style={styles.provenanceSubtitle}>Registration</Text>
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Date</Text>
//               <Text style={styles.detailValue}>May 02, 2025</Text>
//             </View>
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Registered by</Text>
//               <Text style={styles.detailValue}>Jennie Kim</Text>
//             </View>
//           </View>
          
//           <View style={styles.provenanceItem}>
//             <Text style={styles.provenanceSubtitle}>Certification</Text>
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Date</Text>
//               <Text style={styles.detailValue}>May 02, 2025</Text>
//             </View>
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Type</Text>
//               <Text style={styles.detailValue}>Listed</Text>
//             </View>
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Certified by</Text>
//               <Text style={styles.detailValue}>Jennie Kim</Text>
//             </View>
//             <View style={styles.detailRow}>
//               <Text style={styles.detailLabel}>Control Number</Text>
//               <Text style={styles.detailValue}>L-1000001665</Text>
//             </View>
//           </View>
//         </View>
        
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Specification</Text>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Category</Text>
//             <Text style={styles.detailValue}>{product.category || 'Trading Cards'}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Brand</Text>
//             <Text style={styles.detailValue}>{product.brand || 'HUNTER HUNTER'}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Model</Text>
//             <Text style={styles.detailValue}>{product.model || 'PHOTOCARD'}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Appraised Value</Text>
//             <Text style={styles.detailValue}>HKD {product.selling_price ? product.selling_price.toLocaleString() : '1,200'}</Text>
//           </View>
//         </View>
//       </ScrollView>
      
//       <BottomNavigationBar />
//     </View>
//   );
// };


 

// export default ProductsPage;

// wag i delete yung taas na comment shits


// static data lang tow sa baba
import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native';
import BottomNavigationBar from '../components/BottomNavbar';

import { styles } from '../styles/ProductsPageStyles';

const ProductsPage = ({ route, navigation }) => {
  // Static product data
  const product = {
    item_id: '12345',
    item_image: 'https://picsum.photos/300/300',
    brand: 'HUNTER HUNTER',
    model: 'PHOTOCARD',
    selling_price: 1200,
    category: 'Trading Cards',
    lister_image: 'https://randomuser.me/api/portraits/women/44.jpg',
    lister_name: 'mantra',
    lister_id: '1000000007',
    lister_location: 'Metro Manila, Philippines'
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image 
          source={{ uri: product.item_image }} 
          style={styles.productImage} 
          resizeMode="contain"
        />
        
        <View style={styles.productInfoContainer}>
          <Text style={styles.brandText}>{product.brand}</Text>
          <Text style={styles.modelText}>{product.model}</Text>
          <Text style={styles.priceText}>HKD {product.selling_price.toLocaleString()}</Text>
          
          <View style={styles.sellerContainer}>
            <Image 
              source={{ uri: product.lister_image }} 
              style={styles.sellerImage} 
            />
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>{product.lister_name}</Text>
              <Text style={styles.sellerId}>AC-{product.lister_id}</Text>
              <Text style={styles.sellerLocation}>{product.lister_location}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Provenance</Text>
          
          <View style={styles.provenanceItem}>
            <Text style={styles.provenanceSubtitle}>Registration</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>May 02, 2025</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Registered by</Text>
              <Text style={styles.detailValue}>Jennie Kim</Text>
            </View>
          </View>
          
          <View style={styles.provenanceItem}>
            <Text style={styles.provenanceSubtitle}>Certification</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>May 02, 2025</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Type</Text>
              <Text style={styles.detailValue}>Listed</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Certified by</Text>
              <Text style={styles.detailValue}>Jennie Kim</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Control Number</Text>
              <Text style={styles.detailValue}>L-1000001665</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Specification</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>{product.category}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Brand</Text>
            <Text style={styles.detailValue}>{product.brand}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Model</Text>
            <Text style={styles.detailValue}>{product.model}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Appraised Value</Text>
            <Text style={styles.detailValue}>HKD {product.selling_price.toLocaleString()}</Text>
          </View>
        </View>
      </ScrollView>
      
      <BottomNavigationBar />
    </View>
  );
};



export default ProductsPage;