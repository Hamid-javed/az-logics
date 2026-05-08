import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Label, Pressable } from '../reuseables'
import { COLOR, hp, wp, TEXT_STYLE, commonStyles } from '../../enums/StyleGuide'
import { SVG } from '../../assets/svgs'
import { getMerchantInvoicesService, InvoiceItem } from '../../apis/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface InvoicesProps {
  merchantId?: string
}

const Invoices = ({ merchantId }: InvoicesProps) => {
  const [invoices, setInvoices] = useState<InvoiceItem[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<string>('2024')
  const [years, setYears] = useState<string[]>(['2024', '2023', '2022', '2021'])
  const [showYearDropdown, setShowYearDropdown] = useState(false)

  useEffect(() => {
    if (merchantId) {
      fetchInvoices()
    }
  }, [merchantId])

  useEffect(() => {
    // Extract unique years from invoices
    if (invoices.length > 0) {
      const invoiceYears = invoices
        .map(inv => {
          const date = new Date(inv.date)
          return date.getFullYear().toString()
        })
        .filter((year, index, self) => self.indexOf(year) === index)
        .sort((a, b) => b.localeCompare(a))
      
      if (invoiceYears.length > 0) {
        setYears(invoiceYears)
        if (!invoiceYears.includes(selectedYear)) {
          setSelectedYear(invoiceYears[0])
        }
      }
    }
  }, [invoices])

  const fetchInvoices = async () => {
    if (!merchantId) return
    
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('access_token')
      const response = await getMerchantInvoicesService(merchantId, token || undefined)
      
      if (response.success && response.data) {
        // Ensure response.data is an array
        const invoicesData = Array.isArray(response.data) ? response.data : []
        setInvoices(invoicesData)
      } else {
        // If no data or unsuccessful, set empty array
        setInvoices([])
      }
    } catch (error) {
      console.error('Error fetching invoices:', error)
      setInvoices([])
    } finally {
      setLoading(false)
    }
  }

  // Format date: "Nov 15, 2024"
  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      const day = date.getDate()
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const month = months[date.getMonth()]
      const year = date.getFullYear()
      return `${month} ${day}, ${year}`
    } catch (error) {
      return dateString
    }
  }

  // Format due date: "Due: Dec 13, 2024"
  const formatDueDate = (dateString: string): string => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      const day = date.getDate()
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const month = months[date.getMonth()]
      const year = date.getFullYear()
      return `Due: ${month} ${day}, ${year}`
    } catch (error) {
      return ''
    }
  }

  // Filter invoices by year - safely handle undefined/null invoices
  const filteredInvoices = (Array.isArray(invoices) ? invoices : []).filter((invoice) => {
    if (!invoice || !invoice.date) return false
    const invoiceYear = new Date(invoice.date).getFullYear().toString()
    return invoiceYear === selectedYear
  })

  const handleDownload = (invoiceId: string) => {
    // TODO: Implement download functionality
    console.log('Download invoice:', invoiceId)
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLOR.purple} />
        <Label style={styles.loadingText} color={COLOR.lightGrey}>
          Loading invoices...
        </Label>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#F9FAFB', '#F3F4F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <SVG.INVOICES width={hp(2.5)} height={hp(2.5)} color={COLOR.purple} />
            <Label style={styles.headerTitle} color={COLOR.black}>
              Invoices
            </Label>
          </View>
          
          {/* Year Dropdown */}
          <Pressable 
            style={styles.yearDropdown}
            onPress={() => setShowYearDropdown(!showYearDropdown)}
          >
            <Label style={styles.yearText} color={COLOR.black}>
              {selectedYear}
            </Label>
            <SVG.DROPDOWN width={hp(1.5)} height={hp(1.5)} color={COLOR.lightGrey} />
          </Pressable>
        </View>
      </LinearGradient>

      {/* Year Dropdown Options */}
      {showYearDropdown && (
        <View style={styles.dropdownOptions}>
          {years.map((year) => (
            <Pressable
              key={year}
              style={[
                styles.dropdownOption,
                selectedYear === year ? styles.dropdownOptionActive : undefined
              ].filter(Boolean) as any}
              onPress={() => {
                setSelectedYear(year)
                setShowYearDropdown(false)
              }}
            >
              <Label 
                style={[
                  styles.dropdownOptionText,
                  selectedYear === year ? styles.dropdownOptionTextActive : undefined
                ].filter(Boolean) as any} 
                color={selectedYear === year ? COLOR.purple : COLOR.black}
              >
                {year}
              </Label>
            </Pressable>
          ))}
        </View>
      )}

      {/* Invoice List */}
      {filteredInvoices.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Label style={styles.emptyText} color={COLOR.lightGrey}>
            No invoices found for {selectedYear}
          </Label>
        </View>
      ) : (
        <ScrollView 
          style={styles.invoiceList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.invoiceListContent}
        >
          {filteredInvoices.map((invoice, index) => (
            <View key={invoice.id}>
              <Pressable
                style={[
                  styles.invoiceItem,
                  invoice.status === 'pending' ? styles.invoiceItemPending : undefined
                ].filter(Boolean) as any}
                onPress={() => {
                  if (invoice.status === 'pending') {
                    // TODO: Open payment modal
                    console.log('Open payment for:', invoice.id)
                  }
                }}
              >
                <View style={styles.invoiceHeader}>
                  <Label style={styles.invoiceId} color={COLOR.black}>
                    {invoice.id}
                  </Label>
                  <View style={[
                    styles.statusBadge,
                    invoice.status === 'pending' ? styles.statusBadgePending : styles.statusBadgePaid
                  ]}>
                    {invoice.status === 'pending' ? (
                      <>
                        <Label style={styles.statusBadgeText} color={COLOR.red}>
                          Pending
                        </Label>
                      </>
                    ) : (
                      <>
                        <Label style={styles.statusBadgeText} color={COLOR.green}>
                          Paid
                        </Label>
                      </>
                    )}
                  </View>
                </View>

                <Label style={styles.invoiceDate} color={COLOR.lightGrey}>
                  {formatDate(invoice.date)}
                </Label>

                <View style={styles.invoiceFooter}>
                  <View style={styles.invoiceAmountContainer}>
                    <Label style={styles.invoiceAmount} color={COLOR.black}>
                      Rs. {invoice.amount.toLocaleString()}
                    </Label>
                    {invoice.status === 'pending' && invoice.due_date && (
                      <Label style={styles.dueDate} color={COLOR.red}>
                        {formatDueDate(invoice.due_date)}
                      </Label>
                    )}
                  </View>
                  
                  {invoice.status === 'paid' && (
                    <Pressable
                      style={styles.downloadButton}
                      onPress={() => handleDownload(invoice.id)}
                    >
                      <SVG.PRINT width={hp(1.8)} height={hp(1.8)} color={COLOR.purple} />
                      <Label style={styles.downloadText} color={COLOR.purple}>
                        Download
                      </Label>
                    </Pressable>
                  )}
                </View>
              </Pressable>
              
              {index < filteredInvoices.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

export default memo(Invoices)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
    marginBottom: hp(2),
    backgroundColor: COLOR.white,
    borderRadius: hp(1.5),
    overflow: 'hidden',
    ...commonStyles.shadow_3,
  },
  header: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGrey2,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    ...TEXT_STYLE.textSemiBold,
    marginLeft: wp(2),
    fontSize: 16,
  },
  yearDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderWidth: 1,
    borderColor: COLOR.lightGrey2,
    borderRadius: hp(1),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    minWidth: wp(20),
  },
  yearText: {
    ...TEXT_STYLE.textSemiBold,
    marginRight: wp(2),
  },
  dropdownOptions: {
    backgroundColor: COLOR.white,
    borderWidth: 1,
    borderColor: COLOR.lightGrey2,
    borderRadius: hp(1),
    marginHorizontal: wp(4),
    marginTop: hp(0.5),
    ...commonStyles.shadow_3,
    zIndex: 1000,
  },
  dropdownOption: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGrey2,
  },
  dropdownOptionActive: {
    backgroundColor: COLOR.lightGrey2,
  },
  dropdownOptionText: {
    ...TEXT_STYLE.text,
  },
  dropdownOptionTextActive: {
    ...TEXT_STYLE.textSemiBold,
  },
  invoiceList: {
    maxHeight: hp(60),
  },
  invoiceListContent: {
    paddingBottom: hp(2),
  },
  invoiceItem: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: COLOR.white,
  },
  invoiceItemPending: {
    backgroundColor: '#FEF2F2',
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  invoiceId: {
    ...TEXT_STYLE.textSemiBold,
    fontFamily: 'monospace',
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadgePending: {
    backgroundColor: '#FEE2E2',
  },
  statusBadgePaid: {
    backgroundColor: '#D1FAE5',
  },
  statusBadgeText: {
    ...TEXT_STYLE.smallTextSemiBold,
    fontSize: 10,
  },
  invoiceDate: {
    ...TEXT_STYLE.smallText,
    marginBottom: hp(1),
  },
  invoiceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoiceAmountContainer: {
    flex: 1,
  },
  invoiceAmount: {
    ...TEXT_STYLE.bigTextBold,
    fontSize: 18,
    marginBottom: hp(0.3),
  },
  dueDate: {
    ...TEXT_STYLE.smallTextSemiBold,
    fontSize: 11,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
  },
  downloadText: {
    ...TEXT_STYLE.smallTextSemiBold,
    marginLeft: wp(1),
    fontSize: 11,
  },
  divider: {
    height: 1,
    backgroundColor: COLOR.lightGrey2,
    marginHorizontal: wp(4),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(10),
  },
  loadingText: {
    ...TEXT_STYLE.text,
    marginTop: hp(1),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(10),
    paddingBottom: hp(10),
  },
  emptyText: {
    ...TEXT_STYLE.text,
  },
})
