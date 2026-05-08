import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLOR, hp, wp, TEXT_STYLE } from '../enums/StyleGuide'
import Label from '../components/reuseables/label/Label'
import Pressable from '../components/reuseables/pressable/Pressable'
import BottomTabNavigator from './BottomTabNavigator'
import { SCREEN_NAME, BOTTOM_TAB_NAVIGATOR } from '../enums/AppEnums'
import { SVG } from '../assets/svgs'
import * as ui from '../screens'
import { useAppDispatch } from '../redux/hooks'
import { clearUser } from '../redux/action/AppActions'

const Drawer = createDrawerNavigator()

interface DrawerItem {
  id: string
  label: string
  screenName?: string
  iconActive?: React.ReactNode
  iconInactive?: React.ReactNode
  isDrawerScreen?: boolean // If true, navigate to drawer screen, not tab
}

const DrawerContent = (props: any) => {
  const dispatch = useAppDispatch()
  const currentRoute = props.state?.routes[props.state.index]?.name || BOTTOM_TAB_NAVIGATOR
  
  // Get active tab within BottomTabNavigator if it's the active route
  let activeScreen = ''
  if (currentRoute === BOTTOM_TAB_NAVIGATOR && props.state?.routes[props.state.index]?.state) {
    const tabState = props.state.routes[props.state.index].state
    const activeTabIndex = tabState.index || 0
    activeScreen = tabState.routes?.[activeTabIndex]?.name || ''
  } else if (currentRoute === SCREEN_NAME.EXPENSES) {
    activeScreen = SCREEN_NAME.EXPENSES
  }

  const drawerItems: DrawerItem[] = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      screenName: SCREEN_NAME.DASHBOARD,
      iconActive: <SVG.DASHBOARD_ACTIVE width={hp(2.5)} height={hp(2.5)} />,
      iconInactive: <SVG.DASHBOARD width={hp(2.5)} height={hp(2.5)} />,
    },
    { 
      id: 'my-account', 
      label: 'My account', 
      screenName: SCREEN_NAME.PROFILE,
      iconActive: <SVG.PROFILE_ACTIVE width={hp(2.5)} height={hp(2.5)} />,
      iconInactive: <SVG.PROFILE width={hp(2.5)} height={hp(2.5)} />,
    },
    { 
      id: 'customers', 
      label: 'Customers', 
      screenName: SCREEN_NAME.CUSTOMERS,
      iconActive: <SVG.CUSTOMER_LIST_ACTIVE width={hp(2.5)} height={hp(2.5)} />,
      iconInactive: <SVG.CUSTOMER_LIST width={hp(2.5)} height={hp(2.5)} />,
    },
    { 
      id: 'transactions', 
      label: 'Transactions', 
      screenName: SCREEN_NAME.TRANSACTION,
      iconActive: <SVG.TRANSACTION_ACTIVE width={hp(2.5)} height={hp(2.5)} />,
      iconInactive: <SVG.TRANSACTION width={hp(2.5)} height={hp(2.5)} />,
    },
    { 
      id: 'staff', 
      label: 'Staff', 
      screenName: SCREEN_NAME.STAFFS,
      iconActive: <SVG.STAFF_ACTIVE width={hp(2.5)} height={hp(2.5)} />,
      iconInactive: <SVG.STAFF width={hp(2.5)} height={hp(2.5)} />,
    },
    { 
      id: 'expense', 
      label: 'Expense', 
      screenName: SCREEN_NAME.EXPENSES,
      iconActive: <SVG.EXPENSE_ACTIVE width={hp(2.5)} height={hp(2.5)} />,
      iconInactive: <SVG.EXPENSE width={hp(2.5)} height={hp(2.5)} />,
      isDrawerScreen: false, // Navigate to tab navigator screen, not drawer screen
    },
  ]

  const handleItemPress = (item: DrawerItem) => {
    if (item.screenName) {
      if (item.isDrawerScreen) {
        // Navigate to drawer screen directly
        props.navigation.navigate(item.screenName)
      } else {
        // Navigate to the screen within the tab navigator
        if (item.screenName === SCREEN_NAME.EXPENSES) {
          // For Expense, navigate to the stack screen within tab navigator
          props.navigation.navigate(BOTTOM_TAB_NAVIGATOR, { 
            screen: item.screenName 
          })
        } else {
          // For other screens, navigate normally
          props.navigation.navigate(BOTTOM_TAB_NAVIGATOR, { screen: item.screenName })
        }
      }
      props.navigation.closeDrawer()
    }
  }

  const isItemActive = (item: DrawerItem) => {
    return activeScreen === item.screenName
  }

  const handleLogout = async () => {
    try {
      // Remove token from AsyncStorage
      await AsyncStorage.removeItem('access_token')
      
      // Clear user from Redux
      dispatch(clearUser())
      
      // Close drawer
      props.navigation.closeDrawer()
      
      // Navigation will automatically redirect to login screen
      // because AppNavigator checks for user in Redux
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <View style={styles.drawerContainer}>
      {/* Header */}
      <LinearGradient
        colors={['#8767FF', '#2E0DAA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.drawerHeader}
      >
        <Label style={styles.appTitle}>Wasooli.Online</Label>
      </LinearGradient>

      {/* Navigation Items */}
      <DrawerContentScrollView 
        {...props}
        contentContainerStyle={styles.drawerContent}
        showsVerticalScrollIndicator={false}
      >
        {drawerItems.map((item) => {
          const isActive = isItemActive(item)
          return (
            <Pressable
              key={item.id}
              onPress={() => handleItemPress(item)}
              style={[
                styles.drawerItem,
                isActive ? styles.drawerItemActive : {}
              ]}
            >
              {item.iconActive && item.iconInactive && (
                <View style={styles.iconContainer}>
                  {isActive ? item.iconActive : item.iconInactive}
                </View>
              )}
              <Label 
                style={[
                  styles.drawerItemText,
                  isActive ? styles.drawerItemTextActive : {}
                ]}
              >
                {item.label}
              </Label>
            </Pressable>
          )
        })}
      </DrawerContentScrollView>

      {/* Bottom Buttons */}
      <View style={styles.drawerFooter}>
        <Pressable style={styles.footerButton} onPress={handleLogout}>
          <SVG.LOGOUT width={hp(2)} height={hp(2)} />
          <Label style={[styles.footerButtonText, styles.footerButtonLabel]}>Log out</Label>
        </Pressable>
        <Pressable style={styles.footerButton}>
          <SVG.LANGUAGE width={hp(2)} height={hp(2)} />
          <Label style={[styles.footerButtonText, styles.footerButtonLabel]}>ENGLISH</Label>
        </Pressable>
      </View>
    </View>
  )
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: wp(70),
        },
      }}
    >
      <Drawer.Screen name={BOTTOM_TAB_NAVIGATOR} component={BottomTabNavigator} />
      <Drawer.Screen 
        name={SCREEN_NAME.EXPENSES} 
        component={ui.ExpensesScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  drawerHeader: {
    paddingTop: hp(6),
    paddingBottom: hp(4),
    paddingHorizontal: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    ...TEXT_STYLE.title,
    fontSize: 24,
    color: COLOR.white,
    fontWeight: 'bold',
  },
  drawerContent: {
    paddingTop: hp(2),
    paddingHorizontal: wp(4),
    paddingBottom: hp(2),
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    marginVertical: hp(0.5),
    borderRadius: hp(1.5),
    backgroundColor: COLOR.white,
  },
  drawerItemActive: {
    backgroundColor: `${COLOR.purple}80`,
  },
  iconContainer: {
    width: hp(2.5),
    height: hp(2.5),
    marginRight: wp(3),
    // Icon placeholder - will be styled when icons are added
  },
  iconContainerActive: {
    // Active icon styling
  },
  drawerItemText: {
    ...TEXT_STYLE.textMedium,
    color: COLOR.lightGrey,
  },
  drawerItemTextActive: {
    ...TEXT_STYLE.textBold,
    color: COLOR.white,
  },
  drawerFooter: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
    paddingTop: hp(2),
    borderTopWidth: 1,
    borderTopColor: COLOR.lightGrey2,
  },
  footerButton: {
    flex: 1,
    backgroundColor: COLOR.lightGrey2,
    paddingVertical: hp(1.5),
    borderRadius: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(1),
  },
  footerButtonText: {
    ...TEXT_STYLE.textMedium,
    color: COLOR.black,
  },
  footerButtonLabel: {
    marginLeft: wp(2),
  },
})
