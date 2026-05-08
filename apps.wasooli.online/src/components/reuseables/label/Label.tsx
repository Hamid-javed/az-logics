import { StyleSheet, Text, TextStyle } from 'react-native'
import React, { memo, ReactNode } from 'react'
import { COLOR, TEXT_STYLE } from '../../../enums/StyleGuide'

interface LabelProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
  color?: string;
  textalign?: 'center' | 'left' | 'right';
  numberOfLines?: number;
}

const Label: React.FC<LabelProps> = ({
  children,
  style,
  color = COLOR.black,
  textalign = 'left',
  numberOfLines = 1,
}) => {
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.textStyle,
        { color, textAlign: textalign },
        style as TextStyle,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  )
}

export default memo(Label)

const styles = StyleSheet.create({
  textStyle: {
    ...TEXT_STYLE.text,
  },
})