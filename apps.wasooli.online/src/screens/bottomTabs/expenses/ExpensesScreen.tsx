import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DashboardHeader, StatusBarWrapper, Form } from '../../../components'
import { COLOR, hp, wp, TEXT_STYLE } from '../../../enums/StyleGuide'
import { SCREEN_NAME } from '../../../enums/AppEnums'
import { useAppSelector } from '../../../redux/hooks'
import { getExpensesService, Expense, ExpensesResponse } from '../../../apis/Apis'
import Label from '../../../components/reuseables/label/Label'
import { useNavigation } from '@react-navigation/native'

interface TransformedExpense {
  rowIndex: number
  id: string
  type: string
  amount: string
  addedBy: string
  dateOfExpense: string
  createdAt: string
}

const ExpensesScreen = () => {
  const navigation = useNavigation<any>()
  const userProfile = useAppSelector((state: any) => state.appReducer.user)
  const [expenses, setExpenses] = useState<TransformedExpense[]>([])
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
  
  const [selectedMetric, setSelectedMetric] = useState(2) // Default: 2 (last_7_days)
  const [showAddForm, setShowAddForm] = useState(false)
  const prevShowAddFormRef = useRef(false)

  // Format date to readable format: "15 Jan 2024"
  const formatReadableDate = (dateString: string, showYear: boolean = true): string => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      const day = date.getDate()
      const month = date.toLocaleString('en-US', { month: 'short' })
      const year = date.getFullYear()
      return showYear ? `${day} ${month} ${year}` : `${day} ${month}`
    } catch (error) {
      return dateString
    }
  }

  // Helper function to get date filter based on metric index
  const getDateFilterForMetric = (metricIndex: number) => {
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0] // yyyy-MM-dd format
    
    const filters: Array<{ by_date: string; start_date?: string; end_date?: string }> = [
      { // 0: This Year
        by_date: 'this_year',
        start_date: new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0],
        end_date: new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0],
      },
      { // 1: Today
        by_date: 'today',
        start_date: todayStr,
        end_date: todayStr,
      },
      { // 2: Last 7 Days
        by_date: 'last_7_days',
        start_date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end_date: todayStr,
      },
      { // 3: This Month
        by_date: 'this_month',
        start_date: new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0],
        end_date: new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0],
      },
      { // 4: Previous Month
        by_date: 'prev_month',
        start_date: new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0],
        end_date: new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0],
      },
      { // 5: Last Year
        by_date: 'last_year',
        start_date: new Date(today.getFullYear() - 1, 0, 1).toISOString().split('T')[0],
        end_date: new Date(today.getFullYear() - 1, 11, 31).toISOString().split('T')[0],
      },
    ]
    return filters[metricIndex] || filters[2] // Default to last_7_days
  }

  const fetchExpenses = async (
    page: number = 1,
    showLoading: boolean = true,
    currentSearch: string = debouncedSearch,
    metricIndex: number = selectedMetric
  ) => {
    if (!userProfile?.merchant_id) return

    if (showLoading) {
      setLoading(true)
    }

    try {
      const token = await AsyncStorage.getItem('access_token')
      const dateFilter = getDateFilterForMetric(metricIndex)
      
      const response = await getExpensesService(
        userProfile.merchant_id,
        page,
        pagination.limit,
        currentSearch || undefined,
        dateFilter.by_date as any,
        dateFilter.start_date,
        dateFilter.end_date,
        token || undefined
      )

      if (response.success && response.data) {
        const data = response.data as ExpensesResponse
        
        setPagination((prev) => ({
          ...prev,
          totalPages: Math.ceil(data.count / pagination.limit),
          hasMore: data.next !== null,
        }))

        // Transform expenses data
        const transformedExpenses = (data.results || []).map((expense, index) => ({
          rowIndex: (page - 1) * pagination.limit + index + 1,
          id: expense.id,
          type: expense.type || 'Other',
          amount: expense.amount,
          addedBy: expense.added_by || 'Unknown',
          dateOfExpense: formatReadableDate(expense.date_of_expense),
          createdAt: formatReadableDate(expense.created_at),
        }))

        if (page === 1) {
          setExpenses(transformedExpenses)
        } else {
          setExpenses((prev) => [...prev, ...transformedExpenses])
        }

        // Log metrics/totals if available
        if (data.totals) {
          console.log('Expense Metrics:', data.totals)
        }
      } else {
        console.error('Failed to fetch expenses:', response.error)
        if (page === 1) {
          setExpenses([])
        }
      }
    } catch (error) {
      console.error('Error fetching expenses:', error)
      if (page === 1) {
        setExpenses([])
      }
    } finally {
      if (showLoading) {
        setLoading(false)
      }
    }
  }

  // Debounce search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(searchText)
    }, 1000)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchText])

  // Fetch expenses when merchant_id, debouncedSearch, or selectedMetric changes
  useEffect(() => {
    if (userProfile?.merchant_id) {
      setPagination({ page: 1, limit: 10, hasMore: false, totalPages: 0 })
      setExpenses([])
      fetchExpenses(1, true, debouncedSearch, selectedMetric)
    }
  }, [userProfile?.merchant_id, debouncedSearch, selectedMetric])

  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text)
    setPagination((prev) => ({ ...prev, page: 1 }))
  }, [])

  const handleLoadMore = () => {
    if (!loading && pagination.hasMore) {
      const nextPage = pagination.page + 1
      setPagination((prev) => ({ ...prev, page: nextPage }))
      fetchExpenses(nextPage, false, debouncedSearch, selectedMetric)
    }
  }

  const renderExpenseItem = ({ item }: { item: TransformedExpense }) => {
    return (
      <View style={styles.expenseRow}>
        <View style={styles.expenseCell}>
          <Label style={styles.expenseCellText} color={COLOR.black}>
            {item.type}
          </Label>
        </View>
        <View style={styles.expenseCell}>
          <Label style={styles.expenseCellText} color={COLOR.black}>
            {Number(item.amount).toLocaleString()}
          </Label>
        </View>
        <View style={styles.expenseCell}>
          <Label style={styles.expenseCellText} color={COLOR.black}>
            {item.addedBy}
          </Label>
        </View>
        <View style={styles.expenseCell}>
          <Label style={styles.expenseCellText} color={COLOR.black}>
            {item.dateOfExpense}
          </Label>
        </View>
      </View>
    )
  }

  const renderTableHeader = () => {
    return (
      <View style={styles.tableHeader}>
        <View style={styles.expenseCell}>
          <Label style={styles.headerText} color={COLOR.black}>
            Type
          </Label>
        </View>
        <View style={styles.expenseCell}>
          <Label style={styles.headerText} color={COLOR.black}>
            Amount
          </Label>
        </View>
        <View style={styles.expenseCell}>
          <Label style={styles.headerText} color={COLOR.black}>
            Added
          </Label>
        </View>
        <View style={styles.expenseCell}>
          <Label style={styles.headerText} color={COLOR.black}>
            Date
          </Label>
        </View>
      </View>
    )
  }

  const handleAddExpensePress = () => {
    setShowAddForm(true)
  }

  const handleBackPress = () => {
    setShowAddForm(false)
  }

  // Refresh expenses when form is closed (after successful submission)
  useEffect(() => {
    // Only refetch if form was just closed (changed from true to false)
    if (prevShowAddFormRef.current && !showAddForm && userProfile?.merchant_id) {
      // Refetch expenses when form is closed
      fetchExpenses(1, true, debouncedSearch, selectedMetric)
    }
    prevShowAddFormRef.current = showAddForm
  }, [showAddForm])

  return (
    <StatusBarWrapper style={styles.container} translucent={true}>
      <DashboardHeader 
        screenType={SCREEN_NAME.EXPENSES}
        searchText={searchText}
        onSearchChange={handleSearchChange}
        onAddExpensePress={handleAddExpensePress}
        showAddForm={showAddForm}
        onBackPress={handleBackPress}
      />
      {showAddForm ? (
        <Form onSuccess={handleBackPress} />
      ) : (
        <View style={styles.tableContainer}>
          {renderTableHeader()}
          {loading && expenses.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLOR.purple} />
            </View>
          ) : !loading && expenses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Label style={styles.emptyText} color={COLOR.lightGrey}>
                No Data Found
              </Label>
            </View>
          ) : (
            <FlatList
              data={expenses}
              renderItem={renderExpenseItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading && expenses.length > 0 ? (
                  <View style={styles.footerLoader}>
                    <ActivityIndicator size="small" color={COLOR.purple} />
                  </View>
                ) : null
              }
            />
          )}
        </View>
      )}
    </StatusBarWrapper>
  )
}

export default ExpensesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(5),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(5),
  },
  emptyText: {
    ...TEXT_STYLE.text,
    fontSize: hp(2),
  },
  tableContainer: {
    flex: 1,
    paddingHorizontal: wp(4),

  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGrey2,
    paddingBottom: hp(1),
    marginBottom: hp(1),
  },
  expenseRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGrey2,
    paddingVertical: hp(1.5),
  },
  expenseCell: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    ...TEXT_STYLE.textSemiBold,
  },
  expenseCellText: {
    ...TEXT_STYLE.text,
    fontSize: hp(1.6),
  },
  listContainer: {
    paddingBottom: hp(2),
  },
  footerLoader: {
    paddingVertical: hp(2),
    alignItems: 'center',
  },
})