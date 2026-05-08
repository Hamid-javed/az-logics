import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBarWrapper } from '../../../components/reuseables'
import { DashboardHeader, StaffItem } from '../../../components'
import { SCREEN_NAME } from '../../../enums/AppEnums'
import { COLOR, hp, TEXT_STYLE } from '../../../enums/StyleGuide'
import { useAppSelector } from '../../../redux/hooks'
import { getMembersService } from '../../../apis/Apis'
import Label from '../../../components/reuseables/label/Label'

const StaffsScreen = () => {
  const userProfile = useAppSelector((state: any) => state.appReducer.user)
  const [staffs, setStaffs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    hasMore: false,
    totalPages: 0,
  })

  const fetchStaffs = async (page: number = 1, showLoading: boolean = true) => {
    if (showLoading) setLoading(true)

    try {
      const merchantId = userProfile?.merchant_id
      if (!merchantId) {
        console.error('Merchant ID not found')
        return
      }

      const token = await AsyncStorage.getItem('access_token')
      
      // Process search text - remove leading zeros (same as web)
      const processedSearch = debouncedSearch.replace(/^0+/, '')
      
      // Call getMembersService with flag="Staff" (similar to web implementation)
      const response = await getMembersService(
        merchantId,
        'Staff',      // flag - REQUIRED for staff list (same as web)
        page,         // page number
        processedSearch || undefined,    // search - passed to backend
        10,           // limit (page_size)
        null,         // isSupplyBalance
        null,         // isBalance
        {},           // metricCardFilter
        null,         // selectedListItem
        null,         // isActive
        null,         // isPayOnline
        token || undefined
      )

      console.log('Staff API Response:', response)

      if (response.success && response.data) {
        console.log('Staff Count:', response.data.count)
        console.log('Staff Results:', response.data.results)
        
        // For mobile: append for pagination (similar to web's mobile logic)
        if (page === 1) {
          setStaffs(response.data.results || [])
        } else {
          setStaffs(prev => [...prev, ...(response.data.results || [])])
        }

        // Update pagination state
        setPagination(prev => ({
          ...prev,
          totalPages: Math.ceil((response.data.count || 0) / 10),
          hasMore: response.data.next ? true : false,
        }))
      } else {
        console.error('Staff API Error:', response.error)
      }
    } catch (error) {
      console.error('Error fetching staffs:', error)
      setPagination(prev => ({ ...prev, hasMore: false }))
    } finally {
      setLoading(false)
    }
  }

  // Debounced search handler (1 second delay, same as web)
  useEffect(() => {
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    // Set new timeout for debounced search
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(searchText)
    }, 1000)

    // Cleanup timeout on unmount
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchText])

  // Handle search change callback
  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text)
    // Reset to page 1 when search changes
    setPagination(prev => ({ ...prev, page: 1 }))
  }, [])

  // Initial mount and search change effect
  useEffect(() => {
    if (userProfile?.merchant_id) {
      // Reset pagination and clear staffs when search changes
      setPagination({
        page: 1,
        limit: 10,
        hasMore: false,
        totalPages: 0,
      })
      setStaffs([])
      // Fetch first page with search
      fetchStaffs(1)
    }
  }, [userProfile?.merchant_id, debouncedSearch])

  const handleLoadMore = () => {
    if (!loading && pagination.hasMore) {
      const nextPage = pagination.page + 1
      setPagination(prev => ({ ...prev, page: nextPage }))
      fetchStaffs(nextPage, false)
    }
  }

  const renderStaffCard = ({ item }: { item: any }) => <StaffItem item={item} />

  return (
    <StatusBarWrapper style={styles.container} translucent={true}>
      <DashboardHeader 
        screenType={SCREEN_NAME.STAFFS}
        searchText={searchText}
        onSearchChange={handleSearchChange}
      />
      {loading && staffs.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLOR.purple} />
        </View>
      ) : !loading && staffs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Label style={styles.emptyText} color={COLOR.lightGrey}>
            No staff found
          </Label>
        </View>
      ) : (
        <FlatList
          data={staffs}
          renderItem={renderStaffCard}
          keyExtractor={(item) => item.id || item.code}
          contentContainerStyle={styles.listContent}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            loading && staffs.length > 0 ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={COLOR.purple} />
              </View>
            ) : null
          }
        />
      )}
    </StatusBarWrapper>
  )
}

export default StaffsScreen

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
})