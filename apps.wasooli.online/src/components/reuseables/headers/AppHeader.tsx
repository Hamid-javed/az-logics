import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native'
import React, { memo } from 'react'
import { COLOR, hp, TEXT_STYLE, commonStyles } from '../../../enums/StyleGuide'
import Label from '../label/Label';

interface AppHeaderProps {
    title?: string;
    leftComp?: React.ReactNode;
    rightComp?: React.ReactNode;
    centerComp?: React.ReactNode;
    titleStyle?: TextStyle;
    style?: ViewStyle;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, leftComp, rightComp, centerComp, titleStyle, style }) => {
    return (
        <View style={[styles.header, style]}>
            {leftComp ?
                leftComp :
                <View style={styles.space} />
            }

            {centerComp ?
                centerComp :
                title ?
                    <Label style={[styles.textStyle, titleStyle as TextStyle]}>{title}</Label>
                    :
                    <View style={styles.space} />
            }

            {rightComp ?
                rightComp :
                <View style={styles.space} />
            }
        </View>
    )
}

export default memo(AppHeader)

const styles = StyleSheet.create({
    header: {
        height: hp(8),
        paddingHorizontal: '5%',
        ...commonStyles.justifyView,
    },
    space: {
        height: 3,
        width: '10%',
    },
    textStyle: {
        color: COLOR.white,
        ...TEXT_STYLE.textBold,
    },
})