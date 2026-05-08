import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { Photo } from '../reuseables'
import Label from '../reuseables/label/Label'
import { SVG } from '../../assets/svgs'
import { COLOR, hp, wp, TEXT_STYLE } from '../../enums/StyleGuide'

interface StaffItemProps {
  item: any
}

const StaffItem = ({ item }: StaffItemProps) => {
  return (
    <View style={styles.staffCard}>
      {/* Left side: Avatar */}
      <View style={styles.avatarContainer}>
        <Photo 
          url={item.picture}
          style={styles.avatar}
        />
      </View>
      
      {/* Right side: Staff info */}
      <View style={styles.staffInfo}>
        {/* Name */}
        <Label style={styles.staffName} color={COLOR.black}>
          {item?.user?.first_name || 'N/A'}
        </Label>
        
        {/* Code and Phone number row */}
        <View style={styles.staffDetailsRow}>
          {/* Code with icon */}
          <View style={styles.detailItem}>
            <SVG.ID width={hp(1.8)} height={hp(1.8)} color={COLOR.green} />
            <Label style={styles.detailText} color={COLOR.black}>
              {item?.code || 'N/A'}
            </Label>
          </View>
          
          {/* Phone with icon */}
          <View style={styles.detailItem}>
            <SVG.CUSTOMER_PHONE width={hp(1.8)} height={hp(1.8)} color={COLOR.black} />
            <Label style={styles.detailText} color={COLOR.black}>
              {item?.primary_phone || 'N/A'}
            </Label>
          </View>
        </View>
      </View>
    </View>
  )
}

export default memo(StaffItem)

const styles = StyleSheet.create({
  staffCard: {
    flexDirection: 'row',
    backgroundColor: COLOR.white,
    marginHorizontal: wp(4),
    marginVertical: hp(1),
    padding: hp(2),
    borderRadius: hp(2),
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: wp(4),
  },
  avatar: {
    width: hp(8),
    height: hp(8),
    borderRadius: hp(4),
  },
  staffInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  staffName: {
    ...TEXT_STYLE.textSemiBold,
    fontSize: hp(2.2),
    marginBottom: hp(0.8),
    textTransform: 'capitalize',
  },
  staffDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
  },
  detailText: {
    ...TEXT_STYLE.smallText,
    fontSize: hp(1.6),
  },
})