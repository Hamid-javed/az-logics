import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DashboardCard, DashboardHeader } from '../../../components'
import { useAppSelector } from '../../../redux/hooks'
import { StatusBarWrapper } from '../../../components/reuseables'
import { COLOR, wp } from '../../../enums/StyleGuide'
import { hp } from '../../../enums/StyleGuide'
import { getDashboardMetricsApi } from '../../../apis/Apis'
import { SCREEN_NAME, BOTTOM_TAB_NAVIGATOR } from '../../../enums/AppEnums'
import { aggregateMetrics } from '../../../utils/dataUtils'


const DashboardScreen = () => {
  const navigation = useNavigation<any>()
  const userProfile = useAppSelector((state: any) => state.appReducer.user)
  const [loading, setLoading] = useState(false)
  const [metrics, setMetrics] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardMetrics()
  }, [])

  const fetchDashboardMetrics = async () => {
    const merchantId = userProfile?.merchant_id
    
    if (!merchantId) {
      setError('Merchant ID not found')
      return
    }

    const token = await AsyncStorage.getItem('access_token')
    
    if (!token) {
      setError('Token not found')
      return
    }

    setLoading(true)
    setError(null)

    const result = await getDashboardMetricsApi(merchantId, token)

    if (result.success && result.data) {
      // Process and aggregate metrics for better insights
      const processedMetrics = aggregateMetrics(result.data);
      setMetrics(processedMetrics)
    } else {
      const errorMessage = result.error?.message || 'Failed to fetch dashboard metrics'
      setError(errorMessage)
    }

    setLoading(false)
  }

  const metricsArray = useMemo(() => {
    if (!metrics) return []
    return Object.keys(metrics).map((key) => {
      const metric = metrics[key]
      return {
        id: key,
        title: metric?.name || key,
        value: metric?.value ?? 0,
        icon: metric?.icon || null,
        filter: metric?.filter || null,
      }
    })
  }, [metrics])

  const handleCardClick = (metricData: any) => {
    const filter = metricData?.filter || {}
    const title = metricData?.title || ""
    
    // Navigate to Customer List with filter
    // Since CUSTOMERS tab contains a Stack Navigator, we need to pass params to the stack screen
    navigation.navigate(BOTTOM_TAB_NAVIGATOR, {
      screen: SCREEN_NAME.CUSTOMERS,
      params: {
        screen: SCREEN_NAME.CUSTOMERS, // The screen in the CustomerProfileNavigator stack
        params: {
          filter: filter,
          filterTitle: title,
          showFilterButton: Object.keys(filter).length > 0
        }
      }
    })
  }

  const renderDashboardCard = ({ item }: { item: any }) => {
    return (
      <View style={styles.cardWrapper}>
        <DashboardCard
          title={item.title}
          value={item.value}
          icon={item.icon}
          onPress={() => handleCardClick(item)}
        />
      </View>
    )
  }

  return (
    <StatusBarWrapper style={styles.container} translucent={true}>
      {!loading && !error && metrics && (
        <DashboardHeader metrics={metrics} screenType={SCREEN_NAME.DASHBOARD} />
      )}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLOR.purple} />
          </View>
        ) : !error && metrics ? (
          <FlatList
            data={metricsArray}
            renderItem={renderDashboardCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.flatListContent}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
          />
        ) : null}
    </View>
    </StatusBarWrapper>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  content: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: hp(2),
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    marginTop: hp(1),
  },
  cardWrapper: {
    width: '48%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
