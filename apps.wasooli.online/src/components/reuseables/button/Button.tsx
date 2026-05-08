import { StyleSheet, View, ActivityIndicator, ViewStyle, TextStyle } from 'react-native'
import React, { memo } from 'react'

import { COLOR, commonStyles, TEXT_STYLE, hp } from '../../../enums/StyleGuide'
import Pressable from '../pressable/Pressable';
import Label from '../label/Label';

interface ButtonProps {
    text: string;
    textStyle?: TextStyle;
    style?: ViewStyle | ViewStyle[];
    onPress?: () => void;
    icon?: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, textStyle, style, onPress, icon, isLoading, disabled }) => {
    const backgroundColor = disabled ? '#D0D0D0' : COLOR.purple;

    return (
        <Pressable 
            onPress={() => { onPress && onPress() }} 
            style={[styles.container, { backgroundColor }, style as ViewStyle]} 
            disabled={disabled}  
        >
            {!isLoading ? (
                <>
                    {icon && (
                        <View style={{ marginRight: '2.5%' }}>
                            {icon}
                        </View>
                    )}
                    <Label style={[styles.titleStyle, textStyle as TextStyle]}>{text}</Label>
                </>
            ) : (
                <ActivityIndicator color={COLOR.white} />
            )}
        </Pressable>
    )
}

export default memo(Button)

const styles = StyleSheet.create({
    container: {
        marginVertical: hp(1),
        height: hp(5),
        borderRadius: hp(1),
        ...commonStyles.horizontalView,
        ...commonStyles.center,
    },
    titleStyle: {
        ...TEXT_STYLE.bigTextSemiBold,
        color: COLOR.white,
    },
})