import { StyleSheet, TouchableOpacity, ViewStyle, Vibration } from 'react-native'
import React, { memo, ReactNode } from 'react'

interface PressableProps {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
}

const Pressable: React.FC<PressableProps> = ({ children, onPress, style, disabled = false }) => {
  const handlePress = () => {
    if (disabled) return
    
    // Haptic feedback
    try {
      Vibration.vibrate(10)
    } catch (error) {
      // Ignore vibration errors if permission not granted
      console.log('Vibration not available:', error)
    }
    
    onPress && onPress()
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[style, disabled && styles.disabledStyle as ViewStyle]}
      onPress={handlePress}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  )
}

export default memo(Pressable)

const styles = StyleSheet.create({
  disabledStyle: {
    opacity: 0.5,
  },
})