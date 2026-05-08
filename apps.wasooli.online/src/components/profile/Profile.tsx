import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { Photo, Label, Pressable } from '../reuseables'
import { SVG } from '../../assets/svgs'
import { COLOR, hp, wp, TEXT_STYLE, commonStyles } from '../../enums/StyleGuide'

interface ProfileProps {
  profile: any
  userProfile: any
  formatPhoneNumber: (phone: string) => string
  formatEmail: (email: string) => string
  handleCopy: (text: string) => void
  getProfilePicture: () => string
}

const Profile = ({ profile, userProfile, formatPhoneNumber, formatEmail, handleCopy, getProfilePicture }: ProfileProps) => {
  return (
    <View>
      {/* Single Container with Profile Info and Details */}
      <View style={styles.profileCard}>
        {/* Top Section - Profile Info */}
        <View style={styles.topSection}>
          {/* Avatar */}
          <Photo
            url={getProfilePicture()}
            style={styles.avatar}
            contain={false}
          />

          {/* Phone Number with WhatsApp Icon */}
          <View style={styles.phoneRow}>
            <Label style={styles.phoneText} color={COLOR.black}>
              {formatPhoneNumber(profile?.primary_phone || '')}
            </Label>
            <Pressable onPress={() => { }} style={styles.whatsappIcon}>
              {profile?.is_on_whatsapp ? (
                <SVG.WHATSAPP2 width={hp(2)} height={hp(2)} />
              ) : (
                <SVG.WHATSAPP width={hp(2)} height={hp(2)} />
              )}
            </Pressable>
          </View>

          {/* Name */}
          <Label style={styles.nameText} color={COLOR.black}>
            {profile?.user?.first_name || profile?.nickname || 'N/A'}
          </Label>

          {/* Divider */}
          <View style={styles.topDivider} />

          {/* ID/Code with Copy Icon */}
          <View style={styles.codeRow}>
            <Label style={styles.codeText} color={COLOR.black}>
              {profile?.code || 'N/A'}
            </Label>
            <Pressable onPress={() => handleCopy(profile?.code || '')} style={styles.copyIcon}>
              <SVG.COPY width={hp(1.8)} height={hp(1.8)} />
            </Pressable>
          </View>

          {/* Status Tag - Always Active */}
          <View style={[styles.statusTag, { backgroundColor: '#ddfeda' }]}>
            <Label style={styles.statusText} color={COLOR.white}>
              Active
            </Label>
          </View>
        </View>

        {/* Divider between top section and details */}
        <View style={styles.mainDivider} />

        {/* Personal Details List */}
        <View style={styles.detailsList}>
          {/* Phone Number */}
          <View style={styles.detailItem}>
            <Label style={styles.detailTitle} color={COLOR.black}>
              Phone Number
            </Label>
            <View style={styles.detailValueContainer}>
              <Label style={styles.detailValue} color={COLOR.black}>
                {formatPhoneNumber(profile?.primary_phone || '')}
              </Label>
              <Pressable onPress={() => handleCopy(formatPhoneNumber(profile?.primary_phone || ''))} style={styles.copyButton}>
                <SVG.COPY width={hp(1.8)} height={hp(1.8)} />
              </Pressable>
            </View>
          </View>

          {/* Email */}
          <View style={styles.detailItem}>
            <Label style={styles.detailTitle} color={COLOR.black}>
              Email
            </Label>
            <View style={styles.detailValueContainer}>
              <Label style={styles.detailValue} color={COLOR.black}>
                {formatEmail(profile?.user?.email || '')}
              </Label>
              <Pressable onPress={() => handleCopy(profile?.user?.email || '')} style={styles.copyButton}>
                <SVG.COPY width={hp(1.8)} height={hp(1.8)} />
              </Pressable>
            </View>
          </View>

          {/* CNIC */}
          <View style={styles.detailItem}>
            <Label style={styles.detailTitle} color={COLOR.black}>
              CNIC
            </Label>
            <View style={styles.detailValueContainer}>
              <Label style={styles.detailValue} color={COLOR.black}>
                {profile?.cnic || 'N/A'}
              </Label>
              <Pressable onPress={() => handleCopy(profile?.cnic || '')} style={styles.copyButton}>
                <SVG.COPY width={hp(1.8)} height={hp(1.8)} />
              </Pressable>
            </View>
          </View>

          {/* Business Type */}
          {profile?.business_type && (
            <View style={styles.detailItem}>
              <Label style={styles.detailTitle} color={COLOR.black}>
                Business Type
              </Label>
              <Label style={styles.detailValue} color={COLOR.black}>
                {profile?.business_type || 'N/A'}
              </Label>
            </View>
          )}

          {/* Merchant Type */}
          {userProfile?.merchant_type && (
            <View style={styles.detailItem}>
              <Label style={styles.detailTitle} color={COLOR.black}>
                Merchant Type
              </Label>
              <Label style={styles.detailValue} color={COLOR.black}>
                {userProfile?.merchant_type || 'N/A'}
              </Label>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default memo(Profile)

const styles = StyleSheet.create({
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
  mainDivider: {
    width: '100%',
    height: 1,
    backgroundColor: COLOR.lightGrey2,
    marginVertical: hp(2),
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
})
