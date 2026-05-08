import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { memo, useRef } from 'react'
import { Photo, Label, Pressable } from '../reuseables'
import { SVG } from '../../assets/svgs'
import { COLOR, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'
import { SCREEN_NAME } from '../../enums/AppEnums'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface CustomerCardProps {
  member: any
  isSelectMode?: boolean
  isSelected?: boolean
  onCheckboxPress?: () => void
  onSupplyPress?: () => void
  onCashPress?: () => void
  onWhatsAppPress?: () => void
}

const CustomerCard: React.FC<CustomerCardProps> = ({ 
  member, 
  isSelectMode = false,
  isSelected = false,
  onCheckboxPress,
  onSupplyPress, 
  onCashPress, 
  onWhatsAppPress 
}) => {
  // Format phone number
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return 'N/A'
    // Format as XXX-XXXXXXX
    if (phone.length === 10) {
      return `${phone.slice(0, 3)}-${phone.slice(3)}`
    }
    return phone
  }

  // Format balance
  const formatBalance = (balance: string | number) => {
    if (balance === null || balance === undefined) return '0'
    const num = typeof balance === 'string' ? parseFloat(balance) : balance
    if (isNaN(num)) return '0'
    const rounded = Math.ceil(num)
    // Add comma formatting for thousands
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  // Get profile picture URL or default
  const getProfilePicture = () => {
    if (member?.picture) {
      return member.picture
    }
    return 'https://dev.wasooli.online/profile_image.jpg'
  }

  // Get membership type
  const getMembershipType = () => {
    if (member?.memberships?.is_monthly) {
      return 'MONTHLY'
    }
    return 'SUPPLY'
  }

  // Get membership badge color
  const getMembershipBadgeColor = () => {
    if (member?.memberships?.is_monthly) {
      return COLOR.purple
    }
    return '#4A90E2' // Light blue for SUPPLY
  }
  const name = member?.memberships?.nickname || member?.user?.first_name || 'N/A'
  const area = member?.memberships?.area || 'N/A'
  const code = member?.code || 'N/A'
  const phone = formatPhoneNumber(member?.primary_phone || '')
  const balance = formatBalance(member?.balance || 0)
  const supplyBalance = member?.supply_balance || 0
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const checkboxPressedRef = useRef(false)
  
  const handleCardPress = () => {
    // If checkbox was just pressed, ignore card press to prevent double toggle
    if (checkboxPressedRef.current) {
      checkboxPressedRef.current = false
      return
    }
    
    if (isSelectMode && onCheckboxPress) {
      onCheckboxPress()
    } else {
      navigation.navigate(SCREEN_NAME.CUSTOMER_PROFILE, { memberId: member?.id })
    }
  }

  const handleCheckboxPress = () => {
    checkboxPressedRef.current = true
    onCheckboxPress?.()
    // Reset flag after a short delay
    setTimeout(() => {
      checkboxPressedRef.current = false
    }, 100)
  }

  return (
    <Pressable style={styles.card} onPress={handleCardPress}>
      {/* Top Section */}
      <View style={styles.topSection}>
        {isSelectMode && (
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={handleCheckboxPress}
            activeOpacity={0.7}
          >
            {isSelected ? (
              <SVG.CHECKBOX_ACTIVE width={hp(2.5)} height={hp(2.5)} />
            ) : (
              <SVG.CHECKBOX width={hp(2.5)} height={hp(2.5)} />
            )}
          </TouchableOpacity>
        )}
        <Photo 
          url={getProfilePicture()} 
          style={styles.avatar}
        />
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Label style={styles.name}>{name}</Label>
            <View style={[styles.membershipBadge, { backgroundColor: getMembershipBadgeColor() }]}>
              <Label style={styles.membershipText}>{getMembershipType()}</Label>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <SVG.LOCATION width={hp(1.4)} height={hp(1.4)} />
            <Label style={styles.detailText}>{area}</Label>
          </View>
          
          <View style={styles.detailRow}>
            <SVG.ID width={hp(1.4)} height={hp(1.4)} />
            <Label style={[styles.detailText, styles.codeText]}>{code}</Label>
            <SVG.CUSTOMER_PHONE width={hp(1.4)} height={hp(1.4)} />
            <Label style={[styles.detailText, styles.phoneText]}>{phone}</Label>
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.balanceContainer}>
          <SVG.CUSTOMER_WALLET width={hp(1.7)} height={hp(1.7)} />
          <Label style={styles.balanceText}>{balance}</Label>
        </View>
        
        <View style={styles.actionButtons}>
          {/* Supply Button - Hide in select mode */}
          {!isSelectMode && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.supplyButton]} 
              onPress={onSupplyPress}
              activeOpacity={0.7}
            >
            <View style={styles.supplyButtonContent}>
              <Photo 
                url="https://dev.wasooli.online/Mb%20Supply.svg" 
                style={styles.supplyIcon}
                contain
              />
              {supplyBalance !== 0 && (
                <View style={styles.supplyBadge}>
                  <Label style={styles.supplyBadgeText}>{supplyBalance}</Label>
                </View>
              )}
            </View>
          </TouchableOpacity>
          )}

          {/* Cash Button - Hide in select mode */}
          {!isSelectMode && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.cashButton, { marginLeft: wp(2.5) }]} 
              onPress={onCashPress}
              activeOpacity={0.7}
            >
              <Photo 
                url="https://azlogics.fra1.digitaloceanspaces.com/wasooli/public/hand-and-cash-svgrepo-com.svg" 
                style={styles.cashIcon}
                contain
              />
            </TouchableOpacity>
          )}

          {/* WhatsApp Button - Hide in select mode */}
          {!isSelectMode && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.whatsappButton, { marginLeft: wp(2.5) }]} 
              onPress={onWhatsAppPress}
              activeOpacity={0.7}
            >
              <SVG.CUSTOMER_WHATSAPP width={hp(2)} height={hp(2)} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Pressable>
  )
}

export default memo(CustomerCard)

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLOR.white,
    borderRadius: hp(1.2),
    marginHorizontal: wp(4),
    marginVertical: hp(0.5),
    padding: hp(1.5),
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: hp(1),
    alignItems: 'flex-start',
  },
  checkboxContainer: {
    marginRight: wp(2),
    marginTop: hp(0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(3),
    marginRight: wp(2.5),
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
   
    flexWrap: 'wrap',
  },
  name: {
    ...TEXT_STYLE.bigTextBold,
    color: COLOR.black,
    marginRight: wp(2),
  },
  membershipBadge: {
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    borderRadius: hp(0.8),
  },
  membershipText: {
    ...TEXT_STYLE.smallText,
    fontSize: hp(1.1),
    color: COLOR.white,
    fontFamily: 'Poppins-SemiBold',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.3),
    flexWrap: 'wrap',
  },
  detailText: {
    ...TEXT_STYLE.smallText,
    fontSize: hp(1.4),
    color: COLOR.black,
    marginLeft: wp(1.2),
    marginRight: wp(2.5),
  },
  codeText: {
    color: COLOR.green,
  },
  phoneText: {
    color: COLOR.purple,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(1),
    borderTopWidth: 1,
    borderTopColor: COLOR.lightGrey2,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceText: {
    ...TEXT_STYLE.textSemiBold,
    marginTop: hp(0.5),
    color: COLOR.green,
    marginLeft: wp(1.5),
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: hp(4.5),
    height: hp(4.5),
    borderRadius: hp(2.25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  supplyButton: {
    backgroundColor: '#E8E3FF', // Light purple/blue
  },
  cashButton: {
    backgroundColor: '#FFE8E0', // Light orange/red
  },
  whatsappButton: {
    backgroundColor: '#E0F5E9', // Light green
  },
  supplyButtonContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  supplyIcon: {
    width: hp(2.5),
    height: hp(2.5),
  },
  supplyBadge: {
    position: 'absolute',
    bottom: -hp(0.4),
    right: -wp(0.8),
    backgroundColor: '#FFD700',
    borderRadius: hp(0.8),
    paddingHorizontal: wp(1.5),
    paddingVertical: hp(0.2),
    minWidth: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  supplyBadgeText: {
    ...TEXT_STYLE.smallText,
    fontSize: hp(1),
    color: COLOR.black,
    fontFamily: 'Poppins-SemiBold',
  },
  cashIcon: {
    width: hp(2.5),
    height: hp(2.5),
  },
})
