import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBarWrapper } from '../../../components/reuseables'
import { DashboardHeader, TransactionItem } from '../../../components'
import { SCREEN_NAME } from '../../../enums/AppEnums'
import { COLOR, hp, wp } from '../../../enums/StyleGuide'
import { useAppSelector } from '../../../redux/hooks'
import { getTransactionsService, Transaction } from '../../../apis/Apis'

const TransactionScreen = () => {
  console.log('TransactionScreen mounting')
  const userProfile = useAppSelector((state: any) => state.appReducer.user)
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    hasMore: false,
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = date.toLocaleString('default', { month: 'short' })
    const time = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    return `${day} ${month}, ${time}`
  }

  const mapTransactionToItem = (item: Transaction) => {
    return {
      id: item.id,
      name: item.merchant_membership?.nickname || item.merchant_membership?.member?.user?.first_name || 'Unknown',
      transactionId: item.merchant_membership?.member?.code || '',
      amount: item.value,
      date: formatDate(item.created_at),
      avatarColor: '#E6F6FF', // You might want to assign specific colors based on something
      originalItem: item
    }
  }

  const fetchTransactions = async (page: number = 1, showLoading: boolean = true) => {
    if (showLoading) setLoading(true)

    try {
      const merchantId = userProfile?.merchant_id
      if (!merchantId) {
        console.error('Merchant ID not found')
        return
      }

      const token = await AsyncStorage.getItem('access_token')

      const response = await getTransactionsService(
        merchantId,
        page,
        10, // limit
        '', // search
        'this_year', // range
        token || undefined
      )

      if (response.success && response.data) {
        const newTransactions = response.data.results.map(mapTransactionToItem)

        if (page === 1) {
          setTransactions(newTransactions)
        } else {
          setTransactions(prev => [...prev, ...newTransactions])
        }

        setPagination(prev => ({
          ...prev,
          hasMore: response.data?.next ? true : false,
        }))
      } else {
        console.error('Transactions API Error:', response.error)
      }
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userProfile?.merchant_id) {
      // Reset and fetch
      setPagination(prev => ({ ...prev, page: 1, hasMore: false }))
      fetchTransactions(1)
    }
  }, [userProfile?.merchant_id])

  const handleLoadMore = () => {
    if (!loading && pagination.hasMore) {
      const nextPage = pagination.page + 1
      setPagination(prev => ({ ...prev, page: nextPage }))
      fetchTransactions(nextPage, false)
    }
  }

  return (
    <StatusBarWrapper style={styles.container} translucent={true}>
      <DashboardHeader screenType={SCREEN_NAME.TRANSACTION} />
      <View style={styles.listContainer}>
        {loading && transactions.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLOR.purple} />
          </View>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <TransactionItem item={item} />}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading && transactions.length > 0 ? (
                <View style={{ padding: 10 }}>
                  <ActivityIndicator size="small" color={COLOR.purple} />
                </View>
              ) : null
            }
          />
        )}
      </View>
    </StatusBarWrapper>
  )
}

export default TransactionScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  listContainer: {
    flex: 1,
    marginTop: -hp(2),
  },
  contentContainer: {
    paddingBottom: hp(12),
    paddingTop: hp(1),
  }
})