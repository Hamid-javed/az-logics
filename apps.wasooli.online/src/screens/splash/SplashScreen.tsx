import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated'
import { SVG } from '../../assets/svgs'
import { COLOR, commonStyles } from '../../enums/StyleGuide'
import { SCREEN_NAME } from '../../enums/AppEnums'
import { userProfileApi } from '../../apis/Apis'
import { useToast, StatusBarWrapper } from '../../components/reuseables'
import { useAppDispatch } from '../../redux/hooks'
import { setUser } from '../../redux/action/AppActions'

const SplashScreen = ({navigation}: {navigation: any}) => {
  const scale = useSharedValue(0.3)
  const { showToast } = useToast()
  const dispatch = useAppDispatch()

  useEffect(() => {
    scale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    })
    
    checkAuthAndNavigate()
  }, [])

  const checkAuthAndNavigate = async () => {
    try {
      await new Promise((resolve: any) => setTimeout(resolve, 1000))
      
      const token = await AsyncStorage.getItem('access_token')
      
      if (token) {
        const profileResponse = await userProfileApi(token)
        
        if (profileResponse.success && profileResponse.data) {
          dispatch(setUser(profileResponse.data))
          
          showToast('Welcome back!', 'success')
          
        } else {
          showToast('Credentials expired. Please login again', 'error')
          navigation.replace(SCREEN_NAME.LOGIN)
          await AsyncStorage.removeItem('access_token');
        }
      } else {
        navigation.replace(SCREEN_NAME.LOGIN)
      }
    } catch (error) {
      showToast('Credentials expired. Please login again', 'error')
      navigation.replace(SCREEN_NAME.LOGIN)
      AsyncStorage.removeItem('access_token')
    }
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  return (
    <StatusBarWrapper hidden={true} style={styles.container}>
      <Animated.View style={animatedStyle}>
        <SVG.LOGO />
      </Animated.View>
    </StatusBarWrapper>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...commonStyles.center,
    backgroundColor: COLOR.white
  },
})