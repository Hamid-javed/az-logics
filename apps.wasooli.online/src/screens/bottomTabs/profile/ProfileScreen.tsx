import { StyleSheet, View, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Clipboard from '@react-native-clipboard/clipboard'
import { StatusBarWrapper } from '../../../components/reuseables'
import { COLOR, hp, wp, TEXT_STYLE, commonStyles } from '../../../enums/StyleGuide'
import { DashboardHeader, Profile, Subscription, Invoices, Setting } from '../../../components'
import { SCREEN_NAME } from '../../../enums/AppEnums'
import { useAppSelector } from '../../../redux/hooks'
import { getMembersProfile } from '../../../apis/Apis'
import { Photo, Label, Pressable } from '../../../components/reuseables'
import { SVG } from '../../../assets/svgs'
import { Toast, useToast } from '../../../components/reuseables/toast'

const ProfileScreen = () => {
  const userProfile = useAppSelector((state: any) => state.appReducer.user)
  console.log('userProfile', userProfile)
  const [profile, setProfile] = useState<any>(null)
  console.log('profile', profile)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'Profile' | 'Subscription' | 'Invoices' | 'Setting'>('Profile')
  const { showToast } = useToast()

  useEffect(() => {
    if (userProfile?.member_id) {
      const fetchData = async () => {
        try {
          setLoading(true)
          const token = await AsyncStorage.getItem('access_token')
          const response = await getMembersProfile(userProfile?.member_id, token || undefined)
          setProfile(response?.data)
          console.log('Profile Data:', response?.data)
        } catch (error) {
          console.error('Profile API Error:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }
  }, [userProfile?.member_id])

  // Format phone number with dashes
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return ''
    // Remove any existing dashes, spaces, and +92 prefix
    let cleaned = phone.replace(/-/g, '').replace(/\s/g, '')

    // Remove +92 prefix if present
    if (cleaned.startsWith('+92')) {
      cleaned = cleaned.substring(3)
    }

    // Remove leading 0 if present (we'll add it back)
    if (cleaned.startsWith('0')) {
      cleaned = cleaned.substring(1)
    }

    // Ensure it starts with 0 and format as 0XXX-XXXXXXX
    if (cleaned.length >= 10) {
      // Take first 3 digits for area code, rest for number
      return `0${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
    } else if (cleaned.length >= 4) {
      // Fallback: format as 0XXX-XXXXX if less than 10 digits
      return `0${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
    }

    return phone
  }

  // Format email to truncate local part, keep domain visible
  const formatEmail = (email: string) => {
    if (!email) return 'N/A'
    const atIndex = email.indexOf('@')
    if (atIndex === -1) return email

    const localPart = email.substring(0, atIndex)
    const domain = email.substring(atIndex + 1)

    // If local part is longer than 5 characters, truncate to 5 and add ellipsis
    // Always show full domain
    if (localPart.length > 5) {
      return `${localPart.substring(0, 5)}...@${domain}`
    }

    return email
  }

  // Get profile picture URL
  const getProfilePicture = () => {
    return profile?.picture || 'https://dev.wasooli.online/profile_image.jpg'
  }

  // Copy to clipboard
  const handleCopy = async (text: string) => {
    if (text && text !== 'N/A' && text !== '') {
      try {
        await Clipboard.setString(text)
        showToast('Copied...', 'success')
      } catch (error) {
        console.log('Error copying to clipboard:', error)
      }
    }
  }

  return (
    <StatusBarWrapper style={styles.container} translucent={true}>
      <DashboardHeader screenType={SCREEN_NAME.PROFILE} />

      {/* Tab Bar */}
      <View style={styles.tabBarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabBar}>
          <Pressable
            style={[styles.tab, activeTab === 'Profile' && styles.activeTab].filter(Boolean) as any}
            onPress={() => setActiveTab('Profile')}
          >
            <Label style={[styles.tabText, activeTab === 'Profile' && styles.activeTabText].filter(Boolean) as any} color={activeTab === 'Profile' ? COLOR.white : COLOR.black}>
              Profile
            </Label>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'Subscription' && styles.activeTab].filter(Boolean) as any}
            onPress={() => setActiveTab('Subscription')}
          >
            <Label style={[styles.tabText, activeTab === 'Subscription' && styles.activeTabText].filter(Boolean) as any} color={activeTab === 'Subscription' ? COLOR.white : COLOR.black}>
              Subscription
            </Label>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'Invoices' && styles.activeTab].filter(Boolean) as any}
            onPress={() => setActiveTab('Invoices')}
          >
            <Label style={[styles.tabText, activeTab === 'Invoices' && styles.activeTabText].filter(Boolean) as any} color={activeTab === 'Invoices' ? COLOR.white : COLOR.black}>
              Invoices
            </Label>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'Setting' && styles.activeTab].filter(Boolean) as any}
            onPress={() => setActiveTab('Setting')}
          >
            <Label style={[styles.tabText, activeTab === 'Setting' && styles.activeTabText].filter(Boolean) as any} color={activeTab === 'Setting' ? COLOR.white : COLOR.black}>
              Setting
            </Label>
          </Pressable>
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLOR.purple} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {activeTab === 'Profile' && (
            <Profile
              profile={profile}
              userProfile={userProfile}
              formatPhoneNumber={formatPhoneNumber}
              formatEmail={formatEmail}
              handleCopy={handleCopy}
              getProfilePicture={getProfilePicture}
            />
          )}
          {activeTab === 'Subscription' && (
            <Subscription merchantId={userProfile?.merchant_id} />
          )}
          {activeTab === 'Invoices' && (
            <Invoices merchantId={userProfile?.merchant_id} />
          )}
          {activeTab === 'Setting' && (
            <Setting />
          )}
        </ScrollView>
      )}
    </StatusBarWrapper>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  profileCard: {
    backgroundColor: COLOR.white,
    borderRadius: hp(1.5),
    padding: hp(2.5),
    marginHorizontal: wp(4),
    marginTop: hp(2),
    marginBottom: hp(2),
    ...commonStyles.shadow_3,
  },
  topSection: {
    alignItems: 'center',
  },
  mainDivider: {
    width: '100%',
    height: 1,
    backgroundColor: COLOR.lightGrey2,
    marginVertical: hp(2),
  },
  avatar: {
    width: hp(12),
    height: hp(12),
    borderRadius: hp(6),
    backgroundColor: '#E3F2FD',
    marginBottom: hp(1.5),
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.5),
  },
  phoneText: {
    ...TEXT_STYLE.textSemiBold,
    fontSize: 16,
  },
  whatsappIcon: {
    marginLeft: wp(2),
    padding: wp(1),
  },
  nameText: {
    ...TEXT_STYLE.smallTitleBold,
    fontSize: 18,
    marginBottom: hp(1),
  },
  topDivider: {
    width: '30%',
    height: 1,
    backgroundColor: COLOR.lightGrey2,
    marginVertical: hp(1),
    alignSelf: 'center',
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
  },
  codeText: {
    ...TEXT_STYLE.textSemiBold,
    fontSize: 14,
  },
  copyIcon: {
    marginLeft: wp(2),
    padding: wp(1),
  },
  statusTag: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.5),
    borderRadius: hp(1.5),
    marginTop: hp(0.5),
  },
  statusText: {
    ...TEXT_STYLE.smallTextSemiBold,
    fontSize: 12,
    color: '#00ac4f',
  },
  detailsList: {
    // No margin needed as it's inside the profileCard
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(0.5),
  },
  detailTitle: {
    ...TEXT_STYLE.text,
    flex: 1,
  },
  detailValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  detailValue: {
    ...TEXT_STYLE.textSemiBold,
    marginRight: wp(1.5),
    flexShrink: 0,
  },
  copyButton: {
    padding: wp(1),
  },
  divider: {
    height: 1,
    backgroundColor: COLOR.lightGrey2,
    marginVertical: hp(0.5),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
    marginHorizontal: wp(4),
    marginTop: hp(1),
    marginBottom: hp(1),
    backgroundColor: COLOR.white,
    borderRadius: hp(1),
    ...commonStyles.shadow_3,
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: wp(1),
    paddingVertical: hp(1),
    alignItems: 'center',
  },
  tab: {
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(3),
    borderRadius: hp(0.8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.lightGrey2,
    marginHorizontal: wp(0.5),
    minWidth: wp(20),
  },
  activeTab: {
    backgroundColor: COLOR.purple,
  },
  tabText: {
    ...TEXT_STYLE.smallTextSemiBold,
    fontSize: 12,
  },
  activeTabText: {
    color: COLOR.white,
  },
  emptyTabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(10),
  },
  emptyTabText: {
    ...TEXT_STYLE.text,
  },
})