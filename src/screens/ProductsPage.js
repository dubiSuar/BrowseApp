import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BottomNavigationBar from '../components/BottomNavbar';
import {styles} from '../styles/ProductsPageStyles';

const ProductsPage = ({route, navigation}) => {
  const {item} = route.params;
  const [expandedSections, setExpandedSections] = useState({
    specification: true,
    provenance: false,
    description: false,
  });

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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
          source={{uri: item.item_image || 'https://picsum.photos/300/300'}}
          style={styles.productImage}
          resizeMode="contain"
        />

        {/* Product Info */}
        <View style={styles.productInfoContainer}>
          <Text style={styles.brandText}>{item.brand || 'No Brand'}</Text>
          <Text style={styles.modelText}>{item.model || 'No Model'}</Text>
          <Text style={styles.priceText}>
            {item.currency || 'HKD'}{' '}
            {item.selling_price ? item.selling_price.toLocaleString() : '0'}
          </Text>

          {/* Seller Info */}
          <View style={styles.sellerContainer}>
            <Image
              source={{
                uri:
                  item.lister_image ||
                  'https://randomuser.me/api/portraits/women/44.jpg',
              }}
              style={styles.sellerImage}
            />
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>
                {item.lister_name || 'Unknown seller'}
              </Text>
              <Text style={styles.sellerId}>
                AC-{item.lister_id || '0000000000'}
              </Text>
              <Text style={styles.sellerLocation}>
                {item.lister_location || 'Location not specified'}
              </Text>
              <Text style={styles.sellerJoined}>
                Joined: {item.joined_date || 'January 2025'}
              </Text>
            </View>
          </View>
        </View>

        {/* Specification Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('specification')}>
            <Text style={styles.sectionTitle}>Specification</Text>
            <Text style={styles.dropdownIcon}>
              {expandedSections.specification ? '−' : '+'}
            </Text>
          </TouchableOpacity>

          {expandedSections.specification && (
            <View style={styles.sectionContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>
                  {item.category || 'Not specified'}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Brand</Text>
                <Text style={styles.detailValue}>
                  {item.brand || 'Not specified'}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Model</Text>
                <Text style={styles.detailValue}>
                  {item.model || 'Not specified'}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Appraised Value</Text>
                <Text style={styles.detailValue}>
                  {item.currency || 'HKD'}{' '}
                  {item.selling_price
                    ? item.selling_price.toLocaleString()
                    : '0'}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Provenance Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('provenance')}>
            <Text style={styles.sectionTitle}>Provenance</Text>
            <Text style={styles.dropdownIcon}>
              {expandedSections.provenance ? '−' : '+'}
            </Text>
          </TouchableOpacity>

          {expandedSections.provenance && (
            <View style={styles.sectionContent}>
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
                  <Text style={styles.detailValue}>L-1000001685</Text>
                </View>
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
              {expandedSections.description ? '−' : '+'}
            </Text>
          </TouchableOpacity>

          {expandedSections.description && (
            <View style={styles.sectionContent}>
              <Text style={styles.descriptionText}>
                {item.description || 'No description available for this item.'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomNavigationBar />
    </View>
  );
};

export default ProductsPage;
