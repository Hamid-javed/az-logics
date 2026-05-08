import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { memo, useState } from 'react'
import { Label } from '../reuseables'
import { SVG } from '../../assets/svgs'
import { COLOR, TEXT_STYLE, hp, wp } from '../../enums/StyleGuide'

interface TabsProps {
  onTabChange?: (tab: 'invoices' | 'customerInfo') => void
}

const Tabs: React.FC<TabsProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState<'invoices' | 'customerInfo'>('invoices')

  const handleTabPress = (tab: 'invoices' | 'customerInfo') => {
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity 
        style={[
          styles.tabButton, 
          activeTab === 'invoices' ? styles.tabButtonActive : styles.tabButtonInactive
        ]}
        onPress={() => handleTabPress('invoices')}
      >
        {activeTab === 'invoices' ? (
          <SVG.INVOICES_ACTIVE width={hp(1.8)} height={hp(1.8)} />
        ) : (
          <SVG.INVOICES width={hp(1.8)} height={hp(1.8)} />
        )}
        <Label 
          color={activeTab === 'invoices' ? COLOR.white : COLOR.lightGrey} 
          style={styles.tabText}
        >
          Invoices
        </Label>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.tabButton, 
          activeTab === 'customerInfo' ? styles.tabButtonActive : styles.tabButtonInactive
        ]}
        onPress={() => handleTabPress('customerInfo')}
      >
        {activeTab === 'customerInfo' ? (
          <SVG.CUSTOMER_INFO_ACTIVE width={hp(1.8)} height={hp(1.8)} />
        ) : (
          <SVG.CUST_INFO width={hp(1.8)} height={hp(1.8)} />
        )}
        <Label 
          color={activeTab === 'customerInfo' ? COLOR.white : COLOR.lightGrey} 
          style={styles.tabText}
        >
          Customer Info
        </Label>
      </TouchableOpacity>
    </View>
  )
}

export default memo(Tabs)

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(0.8),
    backgroundColor: COLOR.lightGrey2,
    borderRadius: hp(0.8),
    padding: hp(0.2),
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(0.6),
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(2.5),
  },
  tabButtonActive: {
    backgroundColor: COLOR.purple,
  },
  tabButtonInactive: {
    backgroundColor: 'transparent',
  },
  tabText: {
    ...TEXT_STYLE.textSemiBold,
    fontSize: hp(1.3),
    marginLeft: wp(1.2),
  },
})
