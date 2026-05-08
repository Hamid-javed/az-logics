import { Platform, StyleSheet, TextInput, View, ViewStyle, TextStyle, KeyboardTypeOptions } from 'react-native';
import React, { memo } from 'react';
import { COLOR, TEXT_STYLE, commonStyles, hp, wp } from '../../../enums/StyleGuide';
import Label from '../label/Label';
import Pressable from '../pressable/Pressable';


interface InputProps {
  iconLeftName?: React.ReactNode;
  secureTextEntry?: boolean;
  inputLabel2?: string;
  inputDisabled?: boolean;
  style?: ViewStyle;
  iconName?: React.ReactNode;
  iconSize?: number;
  inputStyle?: TextStyle;
  placeholder?: string;
  placeholderTextColor?: string;
  onChange?: (text: string) => void;
  value?: string;
  multiline?: boolean;
  keyboard?: KeyboardTypeOptions;
  inputLabel?: string;
  labelStyle?: TextStyle;
  passwordWarning?: string;
  lines?: number;
  iconPress?: () => void;
  disabled?: boolean;
  marignVertical?: number;
}

const Input: React.FC<InputProps> = ({
  iconLeftName,
  secureTextEntry,
  inputLabel2,
  inputDisabled,
  style,
  iconName,
  iconSize,
  inputStyle,
  placeholder,
  placeholderTextColor,
  onChange,
  value,
  multiline,
  keyboard,
  inputLabel,
  labelStyle,
  passwordWarning,
  lines,
  iconPress,
  disabled,
  marignVertical = hp(1)
}) => {
  return (
    <View style={{ marginVertical: marignVertical }}>
      {/* Input Label */}
      {inputLabel && (
        <Label style={[styles.inputLabelText, labelStyle as TextStyle]}>
          {inputLabel}
          <Label style={styles.inputLabel2Style}>{inputLabel2}</Label>
        </Label>
      )}

      {/* Input Container */}
      <View style={[styles.inputContainer, style]}>
        {/* Left Icon */}
        {iconLeftName && (
          <Pressable
            disabled={disabled}
            style={styles.iconLeftContainer}
          >
            {iconLeftName}
          </Pressable>
        )}

        {/* Text Input */}
        <TextInput
          style={[
            styles.input,
            inputStyle,
            { textAlign: 'left' },
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || COLOR.lightGrey}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboard}
          multiline={multiline}
          numberOfLines={lines}
          secureTextEntry={secureTextEntry}
          editable={!inputDisabled}
          selectTextOnFocus={!inputDisabled}
          selectionColor={COLOR.blue}
        />

        {/* Right Icon */}
        {iconName && (
          <Pressable
            style={styles.iconContainer}
            onPress={iconPress}
          >
           {iconName}
          </Pressable>
        )}
      </View>

      {/* Password Warning */}
      {passwordWarning && <Label style={styles.passwordWarningText}>{passwordWarning}</Label>}
    </View>
  );
};

export default memo(Input);

const styles = StyleSheet.create({
  inputContainer: {
    height: Platform.OS === 'android' ? 'auto' : hp(6),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth:1,
    borderColor:COLOR.blue,
    borderRadius: wp(3),
    backgroundColor: '#f9f9f9',
  },
  input: {
    height: '100%',
    paddingHorizontal: wp(4),
    flex: 1,
    color: COLOR.black,
    ...TEXT_STYLE.text,
  },
  iconContainer: {
    marginRight: wp(2),
  },
  iconLeftContainer: {
    marginLeft: wp(2),
  },
  inputLabelText: {
    ...TEXT_STYLE.textSemiBold,
    color: COLOR.red,
    marginBottom: hp(0.5),
  },
  passwordWarningText: {
    ...TEXT_STYLE.text,
    color: COLOR.red,
   paddingHorizontal: wp(2),
   marginTop: -hp(0.5),
  },
  inputLabel2Style: {
    color: COLOR.red,
    fontSize: 18,
  },
});