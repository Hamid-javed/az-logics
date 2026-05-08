import { StyleSheet, View, ScrollView } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Label, Pressable } from '../reuseables'
import { COLOR, hp, wp, TEXT_STYLE, commonStyles } from '../../enums/StyleGuide'
import { SVG } from '../../assets/svgs'
import { getSubscriptionStatsService, SubscriptionStatsResponse, FeatureValue } from '../../apis/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface SubscriptionProps {
    merchantId?: string
}

const Subscription = ({ merchantId }: SubscriptionProps) => {
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionStatsResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [showFeatures, setShowFeatures] = useState(false)

    useEffect(() => {
        if (merchantId) {
            fetchSubscriptionStats()
        }
    }, [merchantId])

    const fetchSubscriptionStats = async () => {
        if (!merchantId) return

        try {
            setLoading(true)
            const token = await AsyncStorage.getItem('access_token')
            const response = await getSubscriptionStatsService(merchantId, token || undefined)

            if (response.success && response.data) {
                setSubscriptionData(response.data)
            }
        } catch (error) {
            console.error('Error fetching subscription stats:', error)
        } finally {
            setLoading(false)
        }
    }

    // Calculate days remaining
    const getDaysRemaining = (): string => {
        if (!subscriptionData?.subscription_info?.end_at) return 'N/A'

        const endDate = new Date(subscriptionData.subscription_info.end_at)
        const today = new Date()
        const diffTime = endDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays < 0) return 'Expired'
        if (diffDays === 0) return 'Today'
        return diffDays.toString()
    }

    // Format date: "15 Jan 2025"
    const formatDate = (dateString: string): string => {
        if (!dateString) return 'N/A'
        try {
            const date = new Date(dateString)
            const day = date.getDate()
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const month = months[date.getMonth()]
            const year = date.getFullYear()
            return `${day} ${month} ${year}`
        } catch (error) {
            return dateString
        }
    }

    // Format feature value display
    const formatFeatureValue = (key: string, value: boolean | number): string => {
        if (typeof value === 'boolean') {
            return value ? 'Enabled' : 'Disabled'
        }

        if (key.includes('rate') || key.includes('percentage')) {
            return `${value}%`
        } else if (key.includes('amount') || key.includes('price')) {
            return `${value} Rs`
        }

        return value.toString()
    }

    // Toggle features card
    const toggleFeatures = () => {
        setShowFeatures(!showFeatures)
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Label style={styles.loadingText} color={COLOR.lightGrey}>
                    Loading subscription...
                </Label>
            </View>
        )
    }

    if (!subscriptionData) {
        return (
            <View style={styles.emptyContainer}>
                <Label style={styles.emptyText} color={COLOR.lightGrey}>
                    No subscription data available
                </Label>
            </View>
        )
    }

    const planName = subscriptionData.subscription_info?.name || 'N/A'
    const daysRemaining = getDaysRemaining()
    const renewalDate = formatDate(subscriptionData.subscription_info?.end_at || '')
    const features = subscriptionData.actual_features || {}

    return (
        <View style={styles.container}>
            {!showFeatures ? (
                /* Main Card */
                <View style={styles.cardContainer}>
                    <LinearGradient
                        colors={['#4F46E5', '#5B21B6', '#7C3AED']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.mainCard}
                    >
                        <View style={styles.cardContent}>
                            {/* Top Row */}
                            <View style={styles.topRow}>
                                {/* Left Side */}
                                <View style={styles.leftSection}>
                                    <Label style={styles.currentPlanLabel} color={COLOR.white}>
                                        Current Plan
                                    </Label>
                                    <Label style={styles.planName} color={COLOR.white}>
                                        {planName}
                                    </Label>
                                    <Label style={styles.recurringText} color={COLOR.white}>
                                        30 Days Recurring
                                    </Label>
                                </View>

                                {/* Right Side - View Button */}
                                <Pressable onPress={toggleFeatures} style={styles.viewButton}>
                                    <SVG.INSTRUCTION width={hp(2)} height={hp(2)} color={COLOR.white} />
                                    <Label style={styles.viewButtonText} color={COLOR.white}>
                                        View
                                    </Label>
                                </Pressable>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.infoRow}>
                                <View style={styles.infoItem}>
                                    <Label style={styles.infoLabel} color={COLOR.white}>
                                        Days Remaining
                                    </Label>
                                    <Label style={styles.infoValue} color={COLOR.white}>
                                        {daysRemaining}
                                    </Label>
                                </View>
                                <View style={styles.infoItem}>
                                    <Label style={styles.infoLabel} color={COLOR.white}>
                                        Renewal Date
                                    </Label>
                                    <Label style={styles.infoValue} color={COLOR.white}>
                                        {renewalDate}
                                    </Label>
                                </View>
                            </View>

                            {/* Balance Card */}
                            <View style={styles.balanceCardContainer}>
                                <LinearGradient
                                    colors={['#fbbf24', '#f59e0b']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.balanceCard}
                                >
                                    <View style={styles.balanceHeader}>
                                        <SVG.DUE_BALANCE width={hp(2.5)} height={hp(2.5)} color={COLOR.white} />
                                        <Label style={styles.balanceLabel} color={COLOR.white}>
                                            Balance Due
                                        </Label>
                                    </View>
                                    <Label style={styles.balanceAmount} color={COLOR.white}>
                                        Rs. 1200
                                    </Label>
                                    <Label style={styles.balanceSubtext} color={COLOR.white}>
                                        Current period payment
                                    </Label>
                                </LinearGradient>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            ) : (
                /* Features Card (Back Side) */
                <View style={[styles.cardContainer, styles.featuresCard]}>
                    <LinearGradient
                        colors={['#4F46E5', '#7C3AED']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.featuresHeader}
                    >
                        <Label style={styles.featuresHeaderTitle} color={COLOR.white}>
                            Plan Features
                        </Label>
                        <Pressable onPress={toggleFeatures} style={styles.closeButton}>
                            <SVG.CROSS width={hp(2.5)} height={hp(2.5)} color={COLOR.white} />
                        </Pressable>
                    </LinearGradient>

                    <View style={styles.featuresHeaderSubtitle}>
                        <Label style={styles.featuresPlanName} color={COLOR.black}>
                            {planName}
                        </Label>
                    </View>

                    <ScrollView style={styles.featuresList} showsVerticalScrollIndicator={false}>
                        {Object.entries(features).map(([key, feature]) => {
                            const featureValue = feature as FeatureValue
                            const isEnabled = typeof featureValue.value === 'boolean' && featureValue.value
                            const isDisabled = typeof featureValue.value === 'boolean' && !featureValue.value
                            const displayValue = formatFeatureValue(key, featureValue.value)

                            return (
                                <View key={key} style={styles.featureItem}>
                                    <Label style={styles.featureName} color={COLOR.black}>
                                        {featureValue.name}
                                    </Label>
                                    <View style={styles.featureValueContainer}>
                                        {isEnabled && (
                                            <View style={styles.enabledIndicator}>
                                                <Label style={styles.checkmarkText} color={COLOR.green}>
                                                    ✓
                                                </Label>
                                                <Label style={styles.enabledText} color={COLOR.green}>
                                                    Enabled
                                                </Label>
                                            </View>
                                        )}
                                        {isDisabled && (
                                            <View style={styles.disabledIndicator}>
                                                <Label style={styles.crossmarkText} color={COLOR.red}>
                                                    ✗
                                                </Label>
                                                <Label style={styles.disabledText} color={COLOR.red}>
                                                    Disabled
                                                </Label>
                                            </View>
                                        )}
                                        {!isEnabled && !isDisabled && (
                                            <Label style={styles.featureValue} color={COLOR.purple}>
                                                {displayValue}
                                            </Label>
                                        )}
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>

                    <View style={styles.balanceFooter}>
                        <Label style={styles.balanceFooterLabel} color={COLOR.black}>
                            Balance Due: Rs. 1000
                        </Label>
                        <Label style={styles.balanceFooterSubtext} color={COLOR.lightGrey}>
                            Current period payment
                        </Label>
                    </View>
                </View>
            )}
        </View>
    )
}

export default memo(Subscription)

const styles = StyleSheet.create({
    container: {
        marginHorizontal: wp(4),
        marginTop: hp(2),
        marginBottom: hp(2),
        minHeight: hp(50),
    },
    cardContainer: {
        width: '100%',
        minHeight: hp(50),
    },
    mainCard: {
        borderRadius: hp(2),
        padding: hp(2.5),
        ...commonStyles.shadow_5,
    },
    cardContent: {
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',

    },
    leftSection: {
        flex: 1,
    },
    currentPlanLabel: {
        ...TEXT_STYLE.smallText,
        opacity: 0.9,

    },
    planName: {
        ...TEXT_STYLE.bigTextBold,
        fontSize: 24,

    },
    recurringText: {
        ...TEXT_STYLE.text,
        opacity: 0.9,
    },
    viewButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.25),
        borderRadius: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: wp(4),
        gap: wp(2),
    },
    viewButtonText: {
        ...TEXT_STYLE.textSemiBold,
        paddingTop: hp(0.5),
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginVertical: hp(1),
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    infoItem: {
        flex: 1,
    },
    infoLabel: {
        ...TEXT_STYLE.smallText,
        opacity: 0.8,
        marginBottom: hp(0.5),
    },
    infoValue: {
        ...TEXT_STYLE.textSemiBold,
        fontSize: 16,
    },
    balanceCardContainer: {
        marginTop: hp(1),
    },
    balanceCard: {
        borderRadius: hp(2),
        paddingHorizontal: hp(3),
        paddingVertical: hp(1),
        alignSelf: 'flex-start',
    },
    balanceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
       
    },
    balanceLabel: {
        ...TEXT_STYLE.textSemiBold,
        marginLeft: wp(2),
    },
    balanceAmount: {
        ...TEXT_STYLE.bigTextBold,
        fontSize: 20,
      
    },
    balanceSubtext: {
        ...TEXT_STYLE.smallText,
        opacity: 0.9,
    },
    featuresCard: {
        backgroundColor: COLOR.white,
        borderRadius: hp(2),
        overflow: 'hidden',
        ...commonStyles.shadow_5,
    },
    featuresHeader: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    featuresHeaderTitle: {
        ...TEXT_STYLE.bigTextBold,
        fontSize: 18,
    },
    closeButton: {
        padding: wp(1),
    },
    featuresHeaderSubtitle: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.lightGrey2,
    },
    featuresPlanName: {
        ...TEXT_STYLE.textSemiBold,
    },
    featuresList: {
        flex: 1,
        paddingHorizontal: wp(4),
    },
    featureItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(1.5),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.lightGrey2,
    },
    featureName: {
        ...TEXT_STYLE.text,
        flex: 1,
    },
    featureValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    enabledIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkmarkText: {
        fontSize: 16,
        marginRight: wp(1),
    },
    enabledText: {
        ...TEXT_STYLE.textSemiBold,
        color: COLOR.green,
    },
    disabledIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.6,
    },
    crossmarkText: {
        fontSize: 16,
        marginRight: wp(1),
    },
    disabledText: {
        ...TEXT_STYLE.textSemiBold,
        marginLeft: wp(1),
        color: COLOR.red,
    },
    featureValue: {
        ...TEXT_STYLE.textSemiBold,
        color: COLOR.purple,
    },
    balanceFooter: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        borderTopWidth: 1,
        borderTopColor: COLOR.lightGrey2,
        backgroundColor: COLOR.lightGrey2,
    },
    balanceFooterLabel: {
        ...TEXT_STYLE.textSemiBold,
        marginBottom: hp(0.5),
    },
    balanceFooterSubtext: {
        ...TEXT_STYLE.smallText,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp(10),
    },
    loadingText: {
        ...TEXT_STYLE.text,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp(10),
    },
    emptyText: {
        ...TEXT_STYLE.text,
    },
})
