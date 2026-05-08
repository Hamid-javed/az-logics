import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useIsFocused, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBarWrapper } from '../../../components/reuseables';
import { CustomerCard, DashboardHeader } from '../../../components';
import { SCREEN_NAME } from '../../../enums/AppEnums';
import { COLOR, hp, TEXT_STYLE } from '../../../enums/StyleGuide';
import { useAppSelector } from '../../../redux/hooks';
import { getMembersService } from '../../../apis/Apis';
import Label from '../../../components/reuseables/label/Label';

const CustomersScreen = () => {
  const route = useRoute();
  const userProfile = useAppSelector((state: any) => state.appReducer.user);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [filter, setFilter] = useState<any>({});
  const [filterTitle, setFilterTitle] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const isFocused = useIsFocused();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    hasMore: false,
    totalPages: 0,
  });
  // Track if filter was set from navigation params
  const filterFromParamsRef = useRef(false);
  // Track previous focus state to detect when screen comes into focus
  const prevFocusedRef = useRef(false);
  // Debounce search timer
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const fetchMembers = async (
    page: number = 1,
    showLoading: boolean = true,
    searchQuery?: string,
  ) => {
    if (showLoading) setLoading(true);

    try {
      const merchantId = userProfile?.merchant_id;
      if (!merchantId) {
        console.error('Merchant ID not found');
        return;
      }

      const token = await AsyncStorage.getItem('access_token');

      // Map filter object to API parameters
      // Extract specific boolean parameters that have dedicated API params
      const isActive =
        filter?.is_active !== undefined ? filter.is_active : null;
      const isBalance = filter?.balance !== undefined ? filter.balance : null;
      const isPayOnline =
        filter?.is_pay_online !== undefined ? filter.is_pay_online : null;

      // Create metricCardFilter with remaining filter properties
      // These will be spread into query params (is_paid, is_paid_today, is_on_whatsapp, is_new, is_supply_given_today, etc.)
      const metricCardFilter: any = {};
      if (filter && typeof filter === 'object') {
        Object.keys(filter).forEach(key => {
          // Skip already handled parameters
          if (
            key !== 'is_active' &&
            key !== 'balance' &&
            key !== 'is_pay_online'
          ) {
            metricCardFilter[key] = filter[key];
          }
        });
      }

      const response = await getMembersService(
        merchantId, // merchantId
        '', // flag (empty for customers)
        page, // page number
        searchQuery, // search query
        10, // limit
        null, // isSupplyBalance
        isBalance, // isBalance
        metricCardFilter, // metricCardFilter (contains is_paid, is_paid_today, is_on_whatsapp, etc.)
        null, // selectedListItem
        isActive, // isActive
        isPayOnline, // isPayOnline
        token || undefined, // token
      );

      if (response.success && response.data) {
        // For now, just set the members
        if (page === 1) {
          setMembers(response.data.results || []);
        } else {
          setMembers(prev => [...prev, ...(response.data.results || [])]);
        }

        // Update pagination
        setPagination(prev => ({
          ...prev,
          totalPages: Math.ceil((response.data.count || 0) / 10),
          hasMore: response.data.next ? true : false,
        }));
      } else {
        console.error('Members API Error:', response.error);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      setPagination(prev => ({ ...prev, hasMore: false }));
    } finally {
      setLoading(false);
    }
  };

  // Handle route params for filters from dashboard
  useEffect(() => {
    const params = route.params as any;

    if (params) {
      const hasFilter = params.filter && Object.keys(params.filter).length > 0;
      const hasFilterTitle =
        params.filterTitle && params.filterTitle.trim() !== '';

      if (hasFilter || hasFilterTitle) {
        // New params with filter from dashboard card click - set the filter
        if (params.filter) {
          setFilter(params.filter);
          filterFromParamsRef.current = true;
        }
        if (params.filterTitle) {
          setFilterTitle(params.filterTitle);
        }
      }
    }
  }, [route.params]);

  // Handle screen focus - clear filter when coming back via tab navigation
  useEffect(() => {
    const params = route.params as any;
    const hasFilterInParams =
      params?.filter && Object.keys(params.filter).length > 0;

    // When screen comes into focus
    if (isFocused) {
      // If screen was previously not focused and we're coming back without new filter params,
      // it means user navigated away and came back via tab - clear the filter
      if (
        !prevFocusedRef.current &&
        !hasFilterInParams &&
        filterFromParamsRef.current
      ) {
        setFilter({});
        setFilterTitle('');
        filterFromParamsRef.current = false;
      }
      prevFocusedRef.current = true;
    } else {
      // Screen lost focus
      prevFocusedRef.current = false;
    }
  }, [isFocused, route.params]);

  useEffect(() => {
    if (userProfile?.merchant_id) {
      // Reset pagination on mount or when filter/search changes
      setPagination({
        page: 1,
        limit: 10,
        hasMore: false,
        totalPages: 0,
      });
      setMembers([]); // Clear existing members when filter/search changes
      // Fetch first page
      fetchMembers(1);
    }
  }, [userProfile?.merchant_id, filter, searchText]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleLoadMore = () => {
    if (!loading && pagination.hasMore) {
      const nextPage = pagination.page + 1;
      setPagination(prev => ({ ...prev, page: nextPage }));
      fetchMembers(nextPage, false);
    }
  };

  const handleToggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    if (isSelectMode) {
      // Clear selection when exiting select mode
      setSelectedCustomers([]);
    }
  };

  const handleCustomerToggle = (customerId: string) => {
    setSelectedCustomers(prev => {
      if (prev.includes(customerId)) {
        return prev.filter(id => id !== customerId);
      } else {
        return [...prev, customerId];
      }
    });
  };

  // Debounced search handler
  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text);

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for debounced search
    searchTimeoutRef.current = setTimeout(() => {
      // Reset pagination and fetch with new search
      setPagination({
        page: 1,
        limit: 10,
        hasMore: false,
        totalPages: 0,
      });
      setMembers([]);
      if (userProfile?.merchant_id) {
        fetchMembers(1, true, text.trim() || undefined);
      }
    }, 500); // 500ms debounce delay
  }, [userProfile?.merchant_id]);

  const handleClearFilter = () => {
    // Clear filter, title, and search
    setFilter({});
    setFilterTitle('');
    setSearchText('');
    // Reset pagination and clear members
    setPagination({
      page: 1,
      limit: 10,
      hasMore: false,
      totalPages: 0,
    });
    setMembers([]);
    // Force fetch without filter by using empty object
    // We need to fetch immediately with empty filter, not wait for state update
    if (userProfile?.merchant_id) {
      // Create a temporary fetch with empty filter
      const fetchWithoutFilter = async () => {
        setLoading(true);
        try {
          const token = await AsyncStorage.getItem('access_token');

          const response = await getMembersService(
            userProfile.merchant_id,
            '', // flag (empty for customers)
            1, // page number
            undefined, // search
            10, // limit
            null, // isSupplyBalance
            null, // isBalance (no filter)
            {}, // metricCardFilter (empty - no filters)
            null, // selectedListItem
            null, // isActive (no filter)
            null, // isPayOnline (no filter)
            token || undefined, // token
          );

          if (response.success && response.data) {
            setMembers(response.data.results || []);
            setPagination(prev => ({
              ...prev,
              totalPages: Math.ceil((response.data.count || 0) / 10),
              hasMore: response.data.next ? true : false,
            }));
          } else {
            console.error('Members API Error:', response.error);
          }
        } catch (error) {
          console.error('Error fetching members:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchWithoutFilter();
    }
  };

  const handleFilterApply = (filterParams: any, title: string) => {
    // Update filter state - this will trigger useEffect to fetch with new filters
    setFilter(filterParams);
    setFilterTitle(title);
  };

  return (
    <StatusBarWrapper style={styles.container} translucent={true}>
      <DashboardHeader
        screenType={SCREEN_NAME.CUSTOMERS}
        onSelectCustomersPress={handleToggleSelectMode}
        filterTitle={filterTitle}
        onClearFilter={handleClearFilter}
        onFilterApply={handleFilterApply}
        searchText={searchText}
        onSearchChange={handleSearchChange}
      />
      {loading && members.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLOR.purple} />
        </View>
      ) : !loading && members.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Label style={styles.emptyText} color={COLOR.lightGrey}>
            No results found
          </Label>
        </View>
      ) : (
        <FlatList
          data={members}
          renderItem={({ item }) => (
            <CustomerCard
              member={item}
              isSelectMode={isSelectMode}
              isSelected={selectedCustomers.includes(item.id)}
              onCheckboxPress={() => handleCustomerToggle(item.id)}
              onSupplyPress={() => {
                console.log('Supply pressed for:', item.code);
              }}
              onCashPress={() => {
                console.log('Cash pressed for:', item.code);
              }}
              onWhatsAppPress={() => {
                console.log('WhatsApp pressed for:', item.code);
              }}
            />
          )}
          keyExtractor={item => item.id || item.code}
          contentContainerStyle={styles.listContent}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            loading && members.length > 0 ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={COLOR.purple} />
              </View>
            ) : null
          }
        />
      )}
    </StatusBarWrapper>
  );
};

export default CustomersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  listContent: {
    paddingVertical: hp(1),
    paddingBottom: hp(3),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(10),
  },
  emptyText: {
    ...TEXT_STYLE.textMedium,
  },
  footerLoader: {
    paddingVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
