import { StyleSheet, View, Switch } from 'react-native'
import React, { memo, useState } from 'react'
import { Label, Pressable } from '../reuseables'
import { COLOR, hp, wp, TEXT_STYLE, commonStyles } from '../../enums/StyleGuide'
import { SVG } from '../../assets/svgs'

const Setting = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [whatsappNotifications, setWhatsappNotifications] = useState(false)
  const [paymentReminders, setPaymentReminders] = useState(true)
  const [invoiceNotifications, setInvoiceNotifications] = useState(true)
  
  // Subscription settings state
  const [autoRenewal, setAutoRenewal] = useState(true)
  const [billingAlerts, setBillingAlerts] = useState(true)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <View style={styles.container}>
      {/* Notifications Card */}
      <View style={styles.settingCard}>
        <Pressable 
          style={styles.settingHeader}
          onPress={() => toggleSection('notifications')}
        >
          <View style={styles.headerLeft}>
            <View style={[styles.iconContainer, styles.notificationIconBg]}>
              <SVG.NOTIFICATION_BELL_2 width={hp(2.5)} height={hp(2.5)} color={COLOR.purple} />
            </View>
            <View style={styles.headerTextContainer}>
              <Label style={styles.settingTitle} color={COLOR.black}>
                Notifications
              </Label>
              <Label style={styles.settingSubtitle} color={COLOR.lightGrey}>
                Manage notification preferences.
              </Label>
            </View>
          </View>
          <View style={[
            styles.dropdownIconContainer,
            expandedSection === 'notifications' && styles.dropdownIconRotated
          ]}>
            <SVG.DROPDOWN_2 
              width={hp(2)} 
              height={hp(2)} 
              color={COLOR.lightGrey}
            />
          </View>
        </Pressable>

        {expandedSection === 'notifications' && (
          <View style={styles.settingContent}>
            {/* Email Notifications */}
            <View style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <Label style={styles.settingItemTitle} color={COLOR.black}>
                  Email Notifications
                </Label>
                <Label style={styles.settingItemSubtitle} color={COLOR.lightGrey}>
                  Receive updates via email
                </Label>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: COLOR.lightGrey2, true: COLOR.purple }}
                thumbColor={COLOR.white}
              />
            </View>

            {/* WhatsApp Notifications */}
            <View style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <Label style={styles.settingItemTitle} color={COLOR.black}>
                  WhatsApp Notifications
                </Label>
                <Label style={styles.settingItemSubtitle} color={COLOR.lightGrey}>
                  Get updates via WhatsApp
                </Label>
              </View>
              <Switch
                value={whatsappNotifications}
                onValueChange={setWhatsappNotifications}
                trackColor={{ false: COLOR.lightGrey2, true: COLOR.purple }}
                thumbColor={COLOR.white}
              />
            </View>

            {/* Payment Reminders */}
            <View style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <Label style={styles.settingItemTitle} color={COLOR.black}>
                  Payment Reminders
                </Label>
                <Label style={styles.settingItemSubtitle} color={COLOR.lightGrey}>
                  Reminders before due date
                </Label>
              </View>
              <Switch
                value={paymentReminders}
                onValueChange={setPaymentReminders}
                trackColor={{ false: COLOR.lightGrey2, true: COLOR.purple }}
                thumbColor={COLOR.white}
              />
            </View>

            {/* Invoice Notifications */}
            <View style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <Label style={styles.settingItemTitle} color={COLOR.black}>
                  Invoice Notifications
                </Label>
                <Label style={styles.settingItemSubtitle} color={COLOR.lightGrey}>
                  New invoice alerts
                </Label>
              </View>
              <Switch
                value={invoiceNotifications}
                onValueChange={setInvoiceNotifications}
                trackColor={{ false: COLOR.lightGrey2, true: COLOR.purple }}
                thumbColor={COLOR.white}
              />
            </View>
          </View>
        )}
      </View>

      {/* Subscription Settings Card */}
      <View style={styles.settingCard}>
        <Pressable 
          style={styles.settingHeader}
          onPress={() => toggleSection('subscription')}
        >
          <View style={styles.headerLeft}>
            <View style={[styles.iconContainer, styles.subscriptionIconBg]}>
              <SVG.REFRESH width={hp(2.5)} height={hp(2.5)} color={COLOR.green} />
            </View>
            <View style={styles.headerTextContainer}>
              <Label style={styles.settingTitle} color={COLOR.black}>
                Subscription Settings
              </Label>
              <Label style={styles.settingSubtitle} color={COLOR.lightGrey}>
                Manage auto-renewal and billing.
              </Label>
            </View>
          </View>
          <View style={[
            styles.dropdownIconContainer,
            expandedSection === 'subscription' && styles.dropdownIconRotated
          ]}>
            <SVG.DROPDOWN_2 
              width={hp(2)} 
              height={hp(2)} 
              color={COLOR.lightGrey}
            />
          </View>
        </Pressable>

        {expandedSection === 'subscription' && (
          <View style={styles.settingContent}>
            {/* Auto-Renewal */}
            <View style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <Label style={styles.settingItemTitle} color={COLOR.black}>
                  Auto-Renewal
                </Label>
                <Label style={styles.settingItemSubtitle} color={COLOR.lightGrey}>
                  Automatically renew subscription
                </Label>
              </View>
              <Switch
                value={autoRenewal}
                onValueChange={setAutoRenewal}
                trackColor={{ false: COLOR.lightGrey2, true: COLOR.purple }}
                thumbColor={COLOR.white}
              />
            </View>

            {/* Billing Alerts */}
            <View style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <Label style={styles.settingItemTitle} color={COLOR.black}>
                  Billing Alerts
                </Label>
                <Label style={styles.settingItemSubtitle} color={COLOR.lightGrey}>
                  Get notified about billing
                </Label>
              </View>
              <Switch
                value={billingAlerts}
                onValueChange={setBillingAlerts}
                trackColor={{ false: COLOR.lightGrey2, true: COLOR.purple }}
                thumbColor={COLOR.white}
              />
            </View>
          </View>
        )}
      </View>

      {/* Account Settings Card */}
      <View style={styles.settingCard}>
        <Pressable 
          style={styles.settingHeader}
          onPress={() => toggleSection('account')}
        >
          <View style={styles.headerLeft}>
            <View style={[styles.iconContainer, styles.accountIconBg]}>
              <SVG.ACCOUNT_SETTING width={hp(2.5)} height={hp(2.5)} color={COLOR.purple} />
            </View>
            <View style={styles.headerTextContainer}>
              <Label style={styles.settingTitle} color={COLOR.black}>
                Account Settings
              </Label>
              <Label style={styles.settingSubtitle} color={COLOR.lightGrey}>
                Update profile and preferences.
              </Label>
            </View>
          </View>
          <View style={[
            styles.dropdownIconContainer,
            expandedSection === 'account' && styles.dropdownIconRotated
          ]}>
            <SVG.DROPDOWN_2 
              width={hp(2)} 
              height={hp(2)} 
              color={COLOR.lightGrey}
            />
          </View>
        </Pressable>

        {expandedSection === 'account' && (
          <View style={styles.settingContent}>
            {/* Change Password */}
            <Pressable style={styles.accountItem}>
              <View style={styles.settingItemLeft}>
                <Label style={styles.settingItemTitle} color={COLOR.black}>
                  Change Password
                </Label>
                <Label style={styles.settingItemSubtitle} color={COLOR.lightGrey}>
                  Update your account password
                </Label>
              </View>
            </Pressable>

            {/* Update Contact Info */}
            <Pressable style={styles.accountItem}>
              <View style={styles.settingItemLeft}>
                <Label style={styles.settingItemTitle} color={COLOR.black}>
                  Update Contact Info
                </Label>
                <Label style={styles.settingItemSubtitle} color={COLOR.lightGrey}>
                  Change email or phone number
                </Label>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  )
}

export default memo(Setting)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  settingCard: {
    backgroundColor: COLOR.white,
    borderRadius: hp(1.5),
    marginBottom: hp(1.5),
    overflow: 'hidden',
    ...commonStyles.shadow_3,
  },
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  notificationIconBg: {
    backgroundColor: '#F3E8FF',
  },
  subscriptionIconBg: {
    backgroundColor: '#D1FAE5',
  },
  accountIconBg: {
    backgroundColor: '#F3E8FF',
  },
  headerTextContainer: {
    flex: 1,
  },
  settingTitle: {
    ...TEXT_STYLE.textBold,
    fontSize: 16,
    marginBottom: hp(0.3),
  },
  settingSubtitle: {
    ...TEXT_STYLE.smallText,
    fontSize: 12,
  },
  dropdownIconContainer: {
    transform: [{ rotate: '0deg' }],
  },
  dropdownIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  settingContent: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(2),
    borderTopWidth: 1,
    borderTopColor: COLOR.lightGrey2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGrey2,
  },
  accountItem: {
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.lightGrey2,
  },
  settingItemLeft: {
    flex: 1,
    marginRight: wp(3),
  },
  settingItemTitle: {
    ...TEXT_STYLE.textSemiBold,
    fontSize: 14,
    marginBottom: hp(0.3),
  },
  settingItemSubtitle: {
    ...TEXT_STYLE.smallText,
    fontSize: 12,
  },
})
