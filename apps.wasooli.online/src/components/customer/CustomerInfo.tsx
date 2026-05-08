import { StyleSheet, View, Linking, Alert } from 'react-native'
import React, { memo } from 'react'
import Clipboard from '@react-native-clipboard/clipboard'
import { Label, Pressable, useToast } from '../reuseables'
import { SVG } from '../../assets/svgs'
import { COLOR, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'

interface CustomerInfoProps {
  member: any
  formatPhoneNumber: (phone: string) => string
  formatDate: (dateString: string) => string
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  member,
  formatPhoneNumber,
  formatDate
}) => {
  const { showToast } = useToast()
  // Copy to clipboard
  const handleCopy = async (text: string) => {
    if (text && text !== 'N/A') {
      try {
        await Clipboard.setString(text)
        showToast('Copied...', 'success')
      } catch (error) {
        console.log('Error copying to clipboard:', error)
      }
    }
  }

  // Open location URL
  const handleOpenLocation = (url: string) => {
    if (url) {
      Linking.openURL(url).catch(err => {
        Alert.alert('Error', 'Could not open location')
      })
    }
  }

  // Info Row Component
  const InfoRow = ({ 
    icon, 
    label, 
    value, 
    copyable = false, 
    isLink = false,
    onLinkPress
  }: {
    icon?: React.ReactNode
    label: string
    value: string
    copyable?: boolean
    isLink?: boolean
    onLinkPress?: () => void
  }) => {
    if (!value || value === 'N/A') return null

    return (
      <>
        <View style={styles.infoRow}>
          {icon && icon}
          <View style={styles.infoContent}>
            {copyable ? (
              <View style={styles.infoHeader}>
                <Label color={COLOR.black} style={styles.infoLabel}>
                  {label}
                </Label>
                <Pressable onPress={() => handleCopy(value)}>
                  <SVG.COPY width={hp(1.8)} height={hp(1.8)} />
                </Pressable>
              </View>
            ) : (
              <Label color={COLOR.black} style={styles.infoLabel}>
                {label}
              </Label>
            )}
            {isLink ? (
              <Pressable onPress={onLinkPress}>
                <Label color={COLOR.blue} style={[styles.infoValue, styles.linkText]}>
                  {value}
                </Label>
              </Pressable>
            ) : (
              <Label color={COLOR.black} style={styles.infoValue}>
                {value}
              </Label>
            )}
          </View>
        </View>
        <View style={styles.infoDivider} />
      </>
    )
  }

  return (
    <View style={styles.customerInfoContainer}>
      {/* Phone Number */}
      <InfoRow
        icon={<SVG.CUSTOMER_PHONE width={hp(2.5)} height={hp(2.5)} />}
        label="Phone Number"
        value={formatPhoneNumber(member?.primary_phone || '')}
        copyable={true}
      />

      {/* One Bill ID */}
      <InfoRow
        icon={<SVG.ONE_LINK width={hp(2.5)} height={hp(2.5)} />}
        label="One Bill ID"
        value={member?.memberships?.account || ''}
        copyable={true}
      />

      {/* Discount Price */}
      <InfoRow
        icon={<SVG.DISCOUNT width={hp(2.5)} height={hp(2.5)} />}
        label="Discount Price"
        value={member?.memberships?.discounted_price || ''}
      />

      {/* Actual Price */}
      <InfoRow
        icon={<SVG.ANNUAL_PRICE width={hp(2.5)} height={hp(2.5)} />}
        label="Actual Price"
        value={member?.memberships?.actual_price || ''}
      />

      {/* Area */}
      <InfoRow
        icon={<SVG.LOCATION2 width={hp(2.5)} height={hp(2.5)} />}
        label="Area"
        value={member?.memberships?.area || ''}
      />

      {/* City */}
      <InfoRow
        icon={<SVG.LOCATION2 width={hp(2.5)} height={hp(2.5)} />}
        label="City"
        value={member?.memberships?.city || ''}
      />

      {/* Expire At */}
      <InfoRow
        label="Expire At"
        value={formatDate(member?.memberships?.expiring_at || '')}
      />

      {/* Blood Group */}
      <InfoRow
        label="Blood Group"
        value={member?.blood_group || ''}
      />

      {/* Gender */}
      <InfoRow
        label="Gender"
        value={member?.gender || ''}
      />

      {/* Customer Location */}
      {member?.memberships?.location_url && (
        <View style={styles.infoRow}>
          <SVG.LOCATION2 width={hp(2.5)} height={hp(2.5)} />
          <View style={styles.infoContent}>
            <View style={styles.infoHeader}>
              <Label color={COLOR.black} style={styles.infoLabel}>
                Customer Location
              </Label>
              <Pressable onPress={() => handleCopy(member.memberships.location_url)}>
                <SVG.COPY width={hp(1.8)} height={hp(1.8)} />
              </Pressable>
            </View>
            <Pressable onPress={() => handleOpenLocation(member.memberships.location_url)}>
              <Label color={COLOR.blue} style={[styles.infoValue, styles.linkText]}>
                Open Map
              </Label>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  )
}

export default memo(CustomerInfo)

const styles = StyleSheet.create({
  customerInfoContainer: {
    marginTop: hp(1.5),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(1),
  },
  infoContent: {
    flex: 1,
    marginLeft: wp(3),
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  infoLabel: {
    ...TEXT_STYLE.textSemiBold,
    fontSize: hp(1.5),
  },
  infoValue: {
    ...TEXT_STYLE.text,
    fontSize: hp(1.4),
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  infoDivider: {
    height: 1,
    backgroundColor: COLOR.lightGrey2,
    marginLeft: wp(12),
  },
})

