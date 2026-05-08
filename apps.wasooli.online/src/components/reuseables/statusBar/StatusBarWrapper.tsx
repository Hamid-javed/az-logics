import React, { memo, ReactNode } from 'react';
import {
  Platform,
  StatusBar,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BAR_STYLE } from '../../../enums/AppEnums';
import { COLOR, hp } from '../../../enums/StyleGuide';
import { isAndroid15 } from '../../../utils/Utils';

interface StatusBarWrapperProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  backgroundColor?: string;
  barStyle?: string;
  translucent?: boolean;
  hidden?: boolean;
}

const StatusBarWrapper: React.FC<StatusBarWrapperProps> = ({
  children,
  style,
  backgroundColor = COLOR.white,
  barStyle = BAR_STYLE.LIGHT,
  translucent = false,
  hidden = false
}) => {
  const isIOS = Platform.OS === 'ios';
  const insets = useSafeAreaInsets();

  return (
    <>
      {/* iOS top inset when not translucent/hidden to avoid deprecated RN SafeAreaView */}
      {isIOS && !translucent && !hidden && (
        <View style={{ height: insets.top, backgroundColor }} />
      )}

      {/* Only add status bar height view for Android 15+ when not translucent */}
      {Platform.OS === 'android' && isAndroid15() && !translucent && !hidden && (
        <View style={{ height: StatusBar.currentHeight || 24, backgroundColor }} />
      )}

      <View style={[{ flex: 1, backgroundColor }, style]}>
        <StatusBar
          translucent={translucent}
          backgroundColor={translucent ? 'transparent' : backgroundColor}
          barStyle={barStyle as any}
          hidden={hidden}
        />
        {children}
      </View>

      {/* Bottom inset handling */}
      {(!translucent && !hidden) && (
        isIOS ? (
          <View style={{ height: insets.bottom, backgroundColor: translucent ? 'transparent' : 'white' }} />
        ) : (
          Platform.OS === 'android' && isAndroid15() ? (
            <View style={{ height: hp(3.5), backgroundColor: translucent ? 'transparent' : 'white' }} />
          ) : null
        )
      )}
    </>
  );
};

export default memo(StatusBarWrapper);
