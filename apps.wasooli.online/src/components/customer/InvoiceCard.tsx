import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { Label, Pressable } from '../reuseables'
import { SVG } from '../../assets/svgs'
import { COLOR, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'

interface InvoiceCardProps {
  billName?: string
  status?: 'Paid' | 'Unpaid'
  invoiceNumber?: string
  date?: string
  due?: number | string
  amount?: number | string
  onInfoPress?: () => void
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({
  billName = 'December bill',
  status = 'Paid',
  invoiceNumber = '8100066',
  date = 'Dec 12',
  due = '0',
  amount = '150',
  onInfoPress
}) => {
  const isPaid = status === 'Paid'

  // Format amount
  const formatAmount = (amt: number | string) => {
    const num = typeof amt === 'string' ? parseFloat(amt) : amt
    if (isNaN(num)) return '0'
    return num.toString()
  }

  return (
    <View style={styles.card}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.topLeft}>
          <Label color={COLOR.black} style={styles.billName}>{billName}</Label>
          <View style={[styles.statusBadge, { backgroundColor: isPaid ? '#E8F5E9' : '#FFEBEE' }]}>
            <Label 
              color={isPaid ? COLOR.green : COLOR.red} 
              style={styles.statusText}
            >
              {status}
            </Label>
          </View>
        </View>
        <Pressable 
          style={styles.infoButton}
          onPress={onInfoPress}
        >
          <SVG.INFO width={hp(1.8)} height={hp(1.8)} />
        </Pressable>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.detailsContainer}>
          {/* Invoice */}
          <View style={styles.detailItem}>
            <Label color={COLOR.lightGrey} style={styles.detailLabel}>Invoice</Label>
            <Label color={COLOR.black} style={styles.detailValue}>{invoiceNumber}</Label>
          </View>

          {/* Dot Separator */}
          <View style={styles.dotSeparator} />

          {/* Date */}
          <View style={styles.detailItem}>
            <Label color={COLOR.lightGrey} style={styles.detailLabel}>Date</Label>
            <Label color={COLOR.black} style={styles.detailValue}>{date}</Label>
          </View>

          {/* Dot Separator */}
          <View style={styles.dotSeparator} />

          {/* Due */}
          <View style={styles.detailItem}>
            <Label color={COLOR.lightGrey} style={styles.detailLabel}>Due</Label>
            <Label color={COLOR.black} style={styles.detailValue}>{due}</Label>
          </View>
        </View>

        {/* Amount */}
        <View style={styles.amountContainer}>
          <Label color={COLOR.black} style={styles.amountText}>RS: {formatAmount(amount)}</Label>
        </View>
      </View>
    </View>
  )
}

export default memo(InvoiceCard)

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLOR.white,
    borderRadius: hp(1.2),
    padding: hp(1.5),
    marginBottom: hp(1),
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp(1.2),
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  billName: {
    ...TEXT_STYLE.textSemiBold,
    fontSize: hp(1.6),
    marginRight: wp(2),
  },
  statusBadge: {
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.3),
    borderRadius: hp(1),
    alignSelf: 'flex-start',
  },
  statusText: {
    ...TEXT_STYLE.smallText,
    fontSize: hp(1.1),
    fontFamily: 'Poppins-SemiBold',
  },
  infoButton: {
    width: hp(3),
    height: hp(3),
    borderRadius: hp(1.5),
    backgroundColor: COLOR.lightGrey2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    flexWrap: 'wrap',
  },
  detailItem: {
    marginRight: wp(2),
  },
  detailLabel: {
    ...TEXT_STYLE.smallText,
    fontSize: hp(1.1),
    fontFamily: 'Poppins-SemiBold',
    marginBottom: hp(0.3),
  },
  detailValue: {
    ...TEXT_STYLE.text,
    fontSize: hp(1.3),
  },
  dotSeparator: {
    width: hp(0.4),
    height: hp(0.4),
    borderRadius: hp(0.2),
    backgroundColor: COLOR.purple,
    marginHorizontal: wp(1),
    marginBottom: hp(0.5),
    alignSelf: 'flex-end',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountText: {
    ...TEXT_STYLE.bigTextBold,
    fontSize: hp(2),
  },
})
