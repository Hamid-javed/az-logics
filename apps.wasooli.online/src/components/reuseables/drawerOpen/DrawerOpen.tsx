import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import Pressable from '../pressable/Pressable'
import { SVG } from '../../../assets/svgs'
import { DrawerActions } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { hp, wp } from '../../../enums/StyleGuide'

const DrawerOpen = () => {
    const navigation = useNavigation()

    const handleOpenDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer() as any)
    }
  return (
   <Pressable onPress={handleOpenDrawer} style={styles.iconButton}>
    <SVG.MENU_ICON height={hp(2.25)} width={hp(2.25)}/>
   </Pressable>
  )
}

export default memo(DrawerOpen)

const styles = StyleSheet.create({
  iconButton: {
    width: hp(4),
    height: hp(4),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: hp(1.2),
    justifyContent: 'center',
    alignItems: 'center',
  },
})