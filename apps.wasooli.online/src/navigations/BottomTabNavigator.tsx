import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLOR, hp } from '../enums/StyleGuide'
import { SVG } from '../assets/svgs'
import { SCREEN_NAME } from '../enums/AppEnums'
import * as ui from '../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLOR.purple,
        tabBarInactiveTintColor: COLOR.lightGrey,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: hp(9),
          paddingBottom: hp(1),
          paddingTop: hp(1),
          borderTopWidth: 0.5,
          borderTopColor: COLOR.purple
        },
      }}
    >
      <Tab.Screen
        name={SCREEN_NAME.DASHBOARD}
        component={ui.DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => 
            focused 
              ? <SVG.DASHBOARD_ACTIVE width={hp(3)} height={hp(3)} />
              : <SVG.DASHBOARD width={hp(3)} height={hp(3)} />,
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.PROFILE}
        component={ui.ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => 
            focused 
              ? <SVG.PROFILE_ACTIVE width={hp(3)} height={hp(3)} />
              : <SVG.PROFILE width={hp(3)} height={hp(3)} />,
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.CUSTOMERS}
        component={CustomerProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => 
            focused 
              ? <SVG.CUSTOMER_LIST_ACTIVE width={hp(3)} height={hp(3)} />
              : <SVG.CUSTOMER_LIST width={hp(3)} height={hp(3)} />,
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.TRANSACTION}
        component={ui.TransactionScreen}
        options={{
          tabBarIcon: ({ focused }) => 
            focused 
              ? <SVG.TRANSACTION_ACTIVE width={hp(3)} height={hp(3)} />
              : <SVG.TRANSACTION width={hp(3)} height={hp(3)} />,
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.STAFFS}
        component={ui.StaffsScreen}
        options={{
          tabBarIcon: ({ focused }) => 
            focused 
              ? <SVG.STAFF_ACTIVE width={hp(3)} height={hp(3)} />
              : <SVG.STAFF width={hp(3)} height={hp(3)} />,
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.EXPENSES}
        component={ui.ExpensesScreen}
        options={{
          tabBarButton: () => null, // Hide from tab bar
          tabBarItemStyle: { display: 'none', width: 0 }, // Remove space
        }}
      />
    </Tab.Navigator>
  )
}


const CustomerProfileNavigator = ()=>{
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREEN_NAME.CUSTOMERS} component={ui.CustomersScreen} />
      <Stack.Screen name={SCREEN_NAME.CUSTOMER_PROFILE} component={ui.CustomerProfileScreen} />
    </Stack.Navigator>
  )
}

export default BottomTabNavigator



