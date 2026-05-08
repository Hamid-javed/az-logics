import { StyleSheet, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { COLOR, commonStyles, TEXT_STYLE, hp, wp } from '../../../enums/StyleGuide'
import Label from '../label/Label'
import Pressable from '../pressable/Pressable'
import { isIOS } from '../../../utils/Utils'

export type ToastType = 'success' | 'error'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(-100)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 65,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start()

    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose()
    })
  }

  const backgroundColor = type === 'success' ? '#4CAF50' : '#F44336'
  const iconBgColor = type === 'success' ? '#4CAF50' : '#F44336'
  const icon = type === 'success' ? '✓' : '✗'

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
      pointerEvents="box-none"
    >
      <View style={styles.content}>
        {/* Icon Circle */}
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <Label style={styles.icon}>{icon}</Label>
        </View>

        {/* Message */}
        <View style={styles.messageContainer}>
          <Label style={styles.message} color={COLOR.white}>
            {message}
          </Label>
        </View>

        {/* Close Button */}
        <Pressable onPress={handleClose} style={styles.closeButton}>
          <Label style={styles.closeIcon} color={COLOR.white}>
            ✕
          </Label>
        </Pressable>
      </View>

      {/* Accent Line */}
      <View style={[styles.accentLine, { backgroundColor }]} />
    </Animated.View>
  )
}

export default Toast

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: isIOS() ? hp(2) : 0,
    left: wp(5),
    right: wp(5),
    backgroundColor: '#212121',
    borderRadius: hp(1),
    ...commonStyles.shadow_10,
    zIndex: 9999,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
  },
  iconContainer: {
    width: hp(4),
    height: hp(4),
    borderRadius: hp(2),
    ...commonStyles.center,
    marginRight: wp(3),
  },
  icon: {
    ...TEXT_STYLE.textBold,
    fontSize: 18,
    color: COLOR.white,
  },
  messageContainer: {
    flex: 1,
  },
  message: {
    ...TEXT_STYLE.textMedium,
    fontSize: 14,
    color: COLOR.white,
  },
  closeButton: {
    padding: wp(1),
    marginLeft: wp(2),
  },
  closeIcon: {
    ...TEXT_STYLE.textBold,
    fontSize: 16,
    color: COLOR.white,
  },
  accentLine: {
    height: 3,
    width: '100%',
  },
})
