import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import BottomNavigationBar from '../components/BottomNavbar';
import {styles} from '../styles/ProductsPageStyles';
import axios from 'axios';

const ProductsPage = ({route, navigation}) => {
  const {item} = route.params;
  const [expandedSections, setExpandedSections] = useState({
    specification: true,
    provenance: false,
    description: false,
  });
  const [itemDetails, setItemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // XchangeDetails API endpoint and parameters
  const API_ENDPOINT =
    'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/XchangeDetails';
  const API_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJuYmYiOjE3NDYxOTI1MTQsImV4cCI6MTc0ODc4NDUxNCwiaXNzIjoiWHVyMzRQMSIsImF1ZCI6Ilh1cjQ0UFAifQ.QD-fcLXtznCfkTIYkbOQfc5fXfxYgw_mOziKWpUHddk';

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fixed parameter names to match the API requirements
      const params = {
        current_owner_code: item.lister_code || "MC-1000000000", // Changed from member_code to current_owner_code
        current_owner_type: item.lister_type || "Xpert", 
        item_id: Number(item.item_id),
        listing_id: Number(item.listing_id),  // Corrected to match API (capital L)
        token: API_TOKEN,
        user_type: "Xpert",
        version_number: "2.2.6"
      };
      
      console.log('Sending parameters to API:', JSON.stringify(params, null, 2));
      
      const response = await axios.post(API_ENDPOINT, params);

      if (response.status === 200) {
        if (response.data) {
          console.log('Item Details Response:', JSON.stringify(response.data, null, 2));
          setItemDetails(response.data);
        } else {
          setError('Invalid response format from server');
        }
      } else {
        setError('Failed to fetch item details');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching item details');
      console.error('API error:', err);
      
      // Set default itemDetails to prevent app crash and use provided item details
      setItemDetails({
        item_details: [{
          listing_id: 1,
          lister_id: 1,
          lister_type: "Member",
          item_id: 1,
          item_no: "7122100000000024",
          category: "Music Memorabilia",
          brand: "SM Entertainment",
          model: "aespa - 5th Mini Album [Whiplash] (LP/Vinyl version)",
          selling_price: "2588.00",
          currency: "PHP",
          status: "Active",
          preorder: 0,
          verified: false,
          appraised: false,
          authenticated: false,
          listed: true,
        }],
        item_images: [{
          image_link: "https://xureapptestbucket.s3.ap-southeast-1.amazonaws.com/XureApp/public/images/2025/01/22/PH/item/item_MC-1000000000_2025_01_22_08_57_18_178?AWSAccessKeyId=AKIA4BK6Q6EFDJRDMDKV&Expires=1750405926&Signature=IMYTq%2FRV4QNOT5x3eIberWoNBG8%3D"
        }],
        lister_details: {
          member_id: 1,
          member_code: "MC-1000000000",
          username: "almontero",
          account_status: "Basic",
          date_created: "2025-01-22T08:41:03",
          image_link: "https://xureapptestbucket.s3.ap-southeast-1.amazonaws.com/XureApp/public/images/2025/02/06/PH/profile/profile_MC-1000000000_2025_02_06_05_22_55_612?AWSAccessKeyId=AKIA4BK6Q6EFDJRDMDKV&Expires=1750405926&Signature=1V7d3UM7efwVfi8UJzAUPfTUiJs%3D",
          city: "San Juan City",
          state: "Metro Manila"
        },
        specification: [],
        description: [
          {
            description: "Whiplash is the fifth extended play by South Korean girl group Aespa. It was released by SM Entertainment on October 21, 2024, and contains six tracks, including the lead single of the same name.",
            description_by_id: "1",
            description_by: "almontero"
          }
        ],
        provenance: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading item details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchItemDetails}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/back.png')}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Item Details</Text>
          <View style={{width: 30}} />
        </View>

        {/* Product Image */}
        <Image
          source={{
            uri: itemDetails?.item_images?.[0]?.image_link || 
                 item.item_image || 
                 'https://picsum.photos/300/300',
          }}
          style={styles.productImage}
          resizeMode="contain"
        />

        {/* Product Info */}
        <View style={styles.productInfoContainer}>
          <Text style={styles.brandText}>
            {itemDetails?.item_details?.[0]?.brand || item.brand || 'No Brand'}
          </Text>
          <Text style={styles.modelText}>
            {itemDetails?.item_details?.[0]?.model || item.model || 'No Model'}
          </Text>
          <Text style={styles.priceText}>
            {itemDetails?.item_details?.[0]?.currency || item.currency || 'HKD'}{' '}
            {(itemDetails?.item_details?.[0]?.selling_price || item.selling_price || 0).toLocaleString()}
          </Text>

          {/* Seller Info */}
          <View style={styles.sellerContainer}>
            <Image
              source={{
                uri: itemDetails?.lister_details?.image_link || 
                     item.lister_image || 
                     'https://randomuser.me/api/portraits/women/44.jpg',
              }}
              style={styles.sellerImage}
            />
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>
                {itemDetails?.lister_details?.username || item.lister_name || 'Unknown seller'}
              </Text>
              <Text style={styles.sellerId}>
                {itemDetails?.lister_details?.member_code || 
                `AC-${item.lister_id || '0000000000'}`}
              </Text>
              <Text style={styles.sellerLocation}>
                {itemDetails?.lister_details?.city && itemDetails?.lister_details?.state ? 
                  `${itemDetails.lister_details.city}, ${itemDetails.lister_details.state}` : 
                  item.lister_location || 'Location not specified'}
              </Text>
              <Text style={styles.sellerJoined}>
                Joined: {itemDetails?.lister_details?.date_created ? 
                  new Date(itemDetails.lister_details.date_created).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  }) : 
                  'January 2025'}
              </Text>
            </View>
          </View>
        </View>

        {/* Specification Section - Matching Image 2 */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('specification')}>
            <Text style={styles.sectionTitle}>Specification</Text>
            <Text style={styles.dropdownIcon}>
              {expandedSections.specification ? '∧' : '∨'}
            </Text>
          </TouchableOpacity>

          {expandedSections.specification && (
            <View style={styles.sectionContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>
                  {itemDetails?.item_details?.[0]?.category || item.category || 'Trading Cards'}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Brand</Text>
                <Text style={styles.detailValue}>
                  {itemDetails?.item_details?.[0]?.brand || item.brand || 'HUNTER HUNTER'}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Model</Text>
                <Text style={styles.detailValue}>
                  {itemDetails?.item_details?.[0]?.model || item.model || 'PHOTOCARD'}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Appraised Value</Text>
                <Text style={styles.detailValue}>
                  {itemDetails?.item_details?.[0]?.currency || item.currency || 'HKD'}{' '}
                  {(itemDetails?.item_details?.[0]?.selling_price || item.selling_price || 1200).toLocaleString()}
                </Text>
              </View>
              
              {/* Specification footer/watermark */}
              <View style={styles.specificationFooter}>
                <Text style={styles.watermarkText}>mantra</Text>
              </View>
            </View>
          )}
        </View>

        {/* Description Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('description')}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.dropdownIcon}>
              {expandedSections.description ? '∧' : '∨'}
            </Text>
          </TouchableOpacity>

          {expandedSections.description && (
            <View style={styles.sectionContent}>
              {itemDetails?.description && itemDetails.description.length > 0 ? (
                itemDetails.description.map((desc, index) => (
                  <View key={index} style={styles.descriptionItem}>
                    <Text style={styles.descriptionText}>{desc.description}</Text>
                    {desc.description_by && (
                      <Text style={styles.descriptionBy}>
                        - {desc.description_by}
                      </Text>
                    )}
                  </View>
                ))
              ) : (
                <Text style={styles.descriptionText}>
                  No description available for this item.
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Provenance Section - Matching Image 3 */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('provenance')}>
            <Text style={styles.sectionTitle}>Provenance</Text>
            <Text style={styles.dropdownIcon}>
              {expandedSections.provenance ? '∧' : '∨'}
            </Text>
          </TouchableOpacity>

          {expandedSections.provenance && (
            <View style={styles.sectionContent}>
              {/* Registration Block - First item in Provenance */}
              <View style={styles.provenanceItem}>
                <Text style={styles.provenanceSubtitle}>Registration</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.provenanceLabel}>Date</Text>
                  <Text style={styles.provenanceValue}>
                    {itemDetails?.lister_details?.date_created ? 
                      new Date(itemDetails.lister_details.date_created).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }) : 
                      'May 02, 2025'}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.provenanceLabel}>Registered by</Text>
                  <Text style={styles.provenanceValue}>
                    {itemDetails?.lister_details?.username || 'Jennie Kim'}
                  </Text>
                </View>
              </View>

              {/* Certification Block - Second item in Provenance */}
              <View style={styles.provenanceItem}>
                <Text style={styles.provenanceSubtitle}>Certification</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.provenanceLabel}>Date</Text>
                  <Text style={styles.provenanceValue}>
                    {itemDetails?.lister_details?.date_created ? 
                      new Date(itemDetails.lister_details.date_created).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }) : 
                      'May 02, 2025'}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.provenanceLabel}>Type</Text>
                  <Text style={styles.provenanceValue}>
                    {itemDetails?.item_details?.[0]?.lister_type || 'Listed'}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.provenanceLabel}>Certified by</Text>
                  <Text style={styles.provenanceValue}>
                    {itemDetails?.lister_details?.username || 'Jennie Kim'}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.provenanceLabel}>Control Number</Text>
                  <Text style={styles.provenanceValue}>
                    {itemDetails?.lister_details?.member_code || 'L-1000001685'}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomNavigationBar />
    </View>
  );
};

export default ProductsPage;