import { StyleSheet, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Label, StatusBarWrapper, Photo, Pressable } from '../../components/reuseables'
import { DashboardHeader } from '../../components'
import MetricsCard from '../../components/customer/MetricsCard'
import Tabs from '../../components/customer/Tabs'
import Filters from '../../components/customer/Filters'
import InvoiceCard from '../../components/customer/InvoiceCard'
import CustomerInfo from '../../components/customer/CustomerInfo'
import { SCREEN_NAME } from '../../enums/AppEnums'
import { COLOR, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'
import { getMembersDetailService, getCustomerMetricsApi, getCustomerInvoicesApi } from '../../apis/Apis'
import { SVG } from '../../assets/svgs'
import { IMAGES } from '../../assets/images'

const CustomerProfileScreen = () => {
    const route = useRoute()
    const memberId = (route.params as any)?.memberId
  console.log('memberId', memberId)
  const [member, setMember] = useState<any>(null)
    const [metrics, setMetrics] = useState<any>(null)
    const [activeTab, setActiveTab] = useState<'invoices' | 'customerInfo'>('invoices')
    const [invoices, setInvoices] = useState<any[]>([])
    const [loadingMember, setLoadingMember] = useState(false)
    const [loadingMetrics, setLoadingMetrics] = useState(false)
    const [loadingInvoices, setLoadingInvoices] = useState(false)

    useEffect(() => {
        const fetchMember = async () => {
            if (!memberId) {
                console.log('No memberId provided')
                return
            }

            try {
                setLoadingMember(true)
                const token = await AsyncStorage.getItem('access_token')
                if (!token) {
                    console.log('No token found')
                    setLoadingMember(false)
                    return
                }

                console.log('Fetching member details for memberId:', memberId)
                const response = await getMembersDetailService(memberId, undefined, token)

                if (response.success && response.data) {
                    console.log('Member details:', response.data)
                    setMember(response.data)
                } else {
                    console.log('Failed to fetch member details:', response.error?.message)
                }
            } catch (error) {
                console.log('Error fetching member details:', error)
            } finally {
                setLoadingMember(false)
            }
        }

        const fetchCustomerMetrics = async () => {
            if (!memberId) {
                return
            }

            try {
                setLoadingMetrics(true)
                const token = await AsyncStorage.getItem('access_token')
                if (!token) {
                    setLoadingMetrics(false)
                    return
                }

                console.log('Fetching customer metrics for memberId:', memberId)
                const response = await getCustomerMetricsApi(memberId, token)

                if (response.success && response.data) {
                    console.log('Customer metrics:', response.data)
                    setMetrics(response.data)
                } else {
                    console.log('Failed to fetch customer metrics:', response.error?.message)
                }
            } catch (error) {
                console.log('Error fetching customer metrics:', error)
            } finally {
                setLoadingMetrics(false)
            }
        }

        fetchMember()
        fetchCustomerMetrics()
    }, [memberId])

    // Fetch invoices when Invoices tab is active
    useEffect(() => {
        if (activeTab === 'invoices' && memberId) {
            fetchCustomerInvoices()
        }
    }, [activeTab, memberId])

    const fetchCustomerInvoices = async () => {
        if (!memberId) {
            return
        }

        try {
            setLoadingInvoices(true)
            const token = await AsyncStorage.getItem('access_token')
            if (!token) {
                console.log('No token found for invoices')
                setLoadingInvoices(false)
                return
            }

            console.log('Fetching customer invoices for memberId:', memberId)
            const response = await getCustomerInvoicesApi(memberId, token)

            if (response.success && response.data) {
                console.log('Customer invoices:', response.data)
                setInvoices(response.data)
            } else {
                console.log('Failed to fetch customer invoices:', response.error?.message)
            }
        } catch (error) {
            console.log('Error fetching customer invoices:', error)
        } finally {
            setLoadingInvoices(false)
        }
    }

    const handleTabChange = (tab: 'invoices' | 'customerInfo') => {
        setActiveTab(tab)
        if (tab === 'invoices') {
            fetchCustomerInvoices()
        }
    }

    // Format phone number
    const formatPhoneNumber = (phone: string) => {
        if (!phone) return 'N/A'
        // Format as XXX-XXXXXXX
        if (phone.length === 10) {
            return `${phone.slice(0, 3)}-${phone.slice(3)}`
        }
        return phone
    }

    // Get profile picture URL or default
    const getProfilePicture = () => {
        if (member?.picture) {
            return { url: member.picture }
        }
        return { src: IMAGES.CUSTOMER_IMAGE }
    }

    // Get membership type
    const getMembershipType = () => {
        if (member?.memberships?.is_monthly) {
            return 'Monthly'
        }
        return 'Supply'
    }

    // Get membership badge color
    const getMembershipBadgeColor = () => {
        if (member?.memberships?.is_monthly) {
            return COLOR.purple
        }
        return '#4A90E2' // Light blue for SUPPLY
    }

    // Get customer data
    const name = member?.memberships?.nickname || member?.user?.first_name || 'N/A'
    const code = member?.code || 'N/A'
    const phone = formatPhoneNumber(member?.primary_phone || '')
    const isActive = member?.memberships?.is_active || false
    const isOnWhatsApp = member?.is_on_whatsapp || false

    // Get financial data from metrics API
    const totalSpend = metrics?.total_spend?.value || 0
    const balance = metrics?.user_amounts_balance?.value || 0
    const totalSaved = metrics?.total_saved?.value || 0

    // Show initial loader when member or metrics are loading
    const isLoadingInitial = loadingMember || loadingMetrics

    // Format numbers
    const formatNumber = (num: number | string) => {
        const number = typeof num === 'string' ? parseFloat(num) : num
        if (isNaN(number)) return '0'
        return Math.abs(number).toLocaleString('en-US')
    }

    // Format date
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A'
        try {
            const date = new Date(dateString)
            const day = date.getDate()
            const month = date.toLocaleString('en-US', { month: 'short' })
            const year = date.getFullYear()
            return `${day} ${month} ${year}`
        } catch (error) {
            return dateString
        }
    }


  // Custom second row UI for customer profile
  const customSecondRow = (
    <View style={styles.customSecondRow}>

            <View style={styles.profileCard}>
                <View style={[styles.activeContainer, { backgroundColor: isActive ? COLOR.green : COLOR.lightGrey }]}>
                    <Label color={COLOR.white} style={TEXT_STYLE.smallText}>{isActive ? 'Active' : 'Inactive'}</Label>
                </View>

                <View style={styles.editProfileContainer}>
                    <SVG.EDIT width={hp(1.5)} height={hp(1.5)} />
                    <Label color={COLOR.purple} style={[TEXT_STYLE.smallTextMedium, { marginTop: hp(0.25) }]}>Edit Profile</Label>
                </View>

                <View style={styles.profileInfoContainer}>
                    <Photo
                        {...getProfilePicture()}
                        style={styles.profileAvatar}
                        contain={false}
                    />
                    <View style={styles.profileNameContainer}>
                        <Label color={COLOR.purple} style={styles.membershipText}>{getMembershipType()}</Label>
                        <Label color={COLOR.black} style={TEXT_STYLE.bigTextBold}>{name}</Label>
                        <View style={styles.divider} />
                        <View style={styles.phoneRow}>
                            <SVG.CUSTOMER_PHONE width={hp(1.5)} height={hp(1.5)} />
                            <Label color={"#6B7280"} style={[TEXT_STYLE.smallTextMedium, { marginLeft: wp(1) }]}>{phone}</Label>
                            {isOnWhatsApp && (
                                <View style={{ marginLeft: wp(1) }}>
                                    <SVG.WHATSAPP2 width={hp(1.5)} height={hp(1.5)} />
                                </View>
                            )}
                        </View>
                        <View style={styles.codeRow}>
                            <SVG.KEY width={hp(1.5)} height={hp(1.5)} />
                            <Label color={"#6B7280"} style={[TEXT_STYLE.smallTextMedium, { marginLeft: wp(1) }]}>{code}</Label>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.actionButtonsColumn}>
                <TouchableOpacity style={styles.actionButton}>
                    <SVG.FEE_SUB width={hp(2.2)} height={hp(2.2)} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <SVG.WATER_SETTING width={hp(2)} height={hp(2.5)} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.lastActionButton]}>
                    <SVG.RECORD width={hp(2.5)} height={hp(2.5)} />
                </TouchableOpacity>
            </View>
    </View>
  )

  return (
    <StatusBarWrapper style={styles.container} translucent={true}>
      <DashboardHeader 
        screenType={SCREEN_NAME.CUSTOMER_PROFILE}
      >
        {customSecondRow}
      </DashboardHeader>
      {isLoadingInitial ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLOR.purple} />
        </View>
      ) : (
        <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            stickyHeaderIndices={[0]}
        >
            <View style={styles.stickyMetricsContainer}>
                <MetricsCard 
                    totalSpend={totalSpend}
                    balance={balance}
                    totalSaved={totalSaved}
                    formatNumber={formatNumber}
                />
            </View>
            <Tabs onTabChange={handleTabChange} />
            
            {/* Filters - Show only when Invoices tab is active */}
            {activeTab === 'invoices' && <Filters />}
            
            {/* Invoices List - Show when Invoices tab is active */}
            {activeTab === 'invoices' && (
                <View style={styles.invoicesContainer}>
                    {loadingInvoices ? (
                        <View style={styles.invoicesLoadingContainer}>
                            <ActivityIndicator size="small" color={COLOR.purple} />
                        </View>
                    ) : invoices.length > 0 ? (
                        invoices.map((invoice, index) => (
                            <InvoiceCard
                                key={invoice.id || index}
                                billName={invoice.bill_name || invoice.name || 'Invoice'}
                                status={invoice.status === 'paid' || invoice.is_paid ? 'Paid' : 'Unpaid'}
                                invoiceNumber={invoice.invoice_number || invoice.number || 'N/A'}
                                date={invoice.date || invoice.created_at || 'N/A'}
                                due={invoice.due || invoice.due_amount || '0'}
                                amount={invoice.amount || invoice.total_amount || '0'}
                            />
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Label color={COLOR.lightGrey} style={styles.emptyStateText}>
                                No invoices found
                            </Label>
                        </View>
                    )}
                </View>
            )}

            {/* Customer Info - Show when Customer Info tab is active */}
            {activeTab === 'customerInfo' && member && (
                <CustomerInfo
                    member={member}
                    formatPhoneNumber={formatPhoneNumber}
                    formatDate={formatDate}
                />
            )}
        </ScrollView>
      )}
    </StatusBarWrapper>
  )
}

export default CustomerProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  content: {
    flex: 1,
  },
  customSecondRow: {
        flexDirection: 'row',
        marginHorizontal: wp(2),
        marginTop: hp(2),
        alignItems: 'flex-start',
        columnGap: wp(2),
        height: hp(14),
    },
    profileCard: {
        height: '100%',
        backgroundColor: COLOR.white,
        borderRadius: hp(1.2),
        padding: hp(0.8),
        paddingTop: hp(1.5),
        position: 'relative',
        width: '85%',
    },

    actionButtonsColumn: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '15%',
    },

    statusBadge: {
        position: 'absolute',
        top: hp(0.8),
        left: hp(0.8),
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.2),
        borderRadius: hp(0.6),
        zIndex: 1,
    },
    statusText: {
        ...TEXT_STYLE.smallText,
        fontSize: hp(1),
        fontFamily: 'Poppins-SemiBold',
    },
    editButton: {
        position: 'absolute',
        top: hp(1.2),
        right: hp(1.2),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8E3FF',
        paddingHorizontal: wp(2.5),
        paddingVertical: hp(0.6),
        borderRadius: hp(0.8),
        zIndex: 1,
    },
    editButtonText: {
        ...TEXT_STYLE.textSemiBold,
        fontSize: hp(1.4),
        marginLeft: wp(1.5),
    },
    contentRow: {
        flexDirection: 'row',
        marginTop: hp(0.5),
        alignItems: 'flex-start',
    },
    profileAvatar: {
        width: hp(6),
        height: hp(6),
        borderRadius: hp(3),
        marginRight: wp(2),
        marginBottom: hp(1),
    },
    infoSection: {
        flex: 1,
    },
    membershipBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: wp(2.5),
        paddingVertical: hp(0.4),
        borderRadius: hp(0.8),
        marginBottom: hp(0.8),
    },
    membershipText: {
        ...TEXT_STYLE.smallText,
        fontSize: 8,
        fontFamily: 'Poppins-SemiBold',
        backgroundColor: `${COLOR.purple}20`,
        alignSelf:'flex-start',
        paddingHorizontal: wp(0.8),
        paddingVertical: hp(0.15),
        borderRadius: hp(0.4),
    },
    customerName: {
        ...TEXT_STYLE.bigTextBold,
        fontSize: hp(1.8),
        marginBottom: hp(0.5),
    },
    divider: {
        height: 1,
        backgroundColor: COLOR.lightGrey2,
        marginBottom: hp(0.6),
        marginRight: wp(2),
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(0.5),
    },
    contactText: {
        ...TEXT_STYLE.text,
        fontSize: hp(1.5),
        marginLeft: wp(1.5),
    },

    actionButton: {
        width: hp(4),
        height: hp(3.5),
        borderRadius: hp(0.8),
        backgroundColor: COLOR.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lastActionButton: {
        marginBottom: 0,
    },
    activeContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderTopLeftRadius: hp(1.2),
        borderBottomRightRadius: hp(0.8),
        paddingHorizontal: wp(1.5),
        paddingVertical: hp(0.2),
        zIndex: 1,
    },
    editProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: wp(0.8),
        position: 'absolute',
        top: hp(0.8),
        right: hp(0.8),
        backgroundColor: `${COLOR.purple}20`,
        paddingVertical: hp(0.2),
        paddingHorizontal: wp(1.5),
        borderRadius: hp(0.5),
    },
    profileInfoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        columnGap: wp(1),
        marginTop: hp(1.2)
    },
    profileNameContainer:{
        flex:1,
    },
    phoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(0.3),
    },
    codeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollContent: {
        padding: wp(4),
        paddingBottom: hp(4),
    },
    stickyMetricsContainer: {
        backgroundColor: COLOR.white,
        paddingTop: hp(0.5),
        paddingBottom: hp(0.5),
    },
    invoicesContainer: {
        marginTop: hp(1.5),
    },
    emptyState: {
        paddingVertical: hp(3),
        alignItems: 'center',
    },
    emptyStateText: {
        ...TEXT_STYLE.text,
        fontSize: hp(1.5),
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    invoicesLoadingContainer: {
        paddingVertical: hp(3),
        alignItems: 'center',
        justifyContent: 'center',
    },
})