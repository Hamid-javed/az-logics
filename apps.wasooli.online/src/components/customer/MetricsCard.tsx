import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { Label } from '../reuseables'
import { SVG } from '../../assets/svgs'
import { COLOR, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'

interface MetricsCardProps {
  totalSpend: number | string
  balance: number | string
  totalSaved: number | string
  formatNumber: (num: number | string) => string
}

const MetricsCard: React.FC<MetricsCardProps> = ({ 
  totalSpend, 
  balance, 
  totalSaved, 
  formatNumber 
}) => {
  return (
    <View style={styles.cardsContainer}>
      {/* Total Spend Card */}
      <View style={styles.summaryCard}>
        <SVG.SPEND width={hp(2.5)} height={hp(2.5)} />
        <View style={styles.cardContent}>
          <Label color={COLOR.lightGrey} style={styles.cardTitle}>Total Spend</Label>
          <Label color={COLOR.black} style={styles.cardAmount}>{formatNumber(totalSpend)}</Label>
        </View>
      </View>

      {/* Balance Card */}
      <View style={styles.summaryCard}>
        <SVG.BALANCE width={hp(2.5)} height={hp(2.5)} />
        <View style={styles.cardContent}>
          <Label color={COLOR.lightGrey} style={styles.cardTitle}>Balance</Label>
          <Label color={COLOR.black} style={styles.cardAmount}>{formatNumber(balance)}</Label>
        </View>
      </View>

      {/* Total Saved Card */}
      <View style={styles.summaryCard}>
        <SVG.TOTAL_SAVED width={hp(2.5)} height={hp(2.5)} />
        <View style={styles.cardContent}>
          <Label color={COLOR.lightGrey} style={styles.cardTitle}>Total Saved</Label>
          <Label color={COLOR.black} style={styles.cardAmount}>{formatNumber(totalSaved)}</Label>
        </View>
      </View>
    </View>
  )
}

export default memo(MetricsCard)

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(0.5),
    columnGap: wp(2),
  },
  summaryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderRadius: hp(1),
    padding: hp(1.2),
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    marginLeft: wp(2),
  },
  cardTitle: {
    ...TEXT_STYLE.smallText,
    fontSize: hp(1.1),
    marginBottom: hp(0.3),
  },
  cardAmount: {
    ...TEXT_STYLE.bigTextBold,
    fontSize: hp(1.6),
  },
})
