import { StyleSheet, ImageBackground, View, TextInput, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IMAGES } from '../../assets/images'
import { COLOR, commonStyles, hp, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { SVG } from '../../assets/svgs'
import { Button, Input, Pressable, Label, useToast, StatusBarWrapper } from '../../components'
import { isValidEmailOrMobile, getInputType, isIOS } from '../../utils/Utils'
import { tokenApi, loginApi, userProfileApi } from '../../apis/Apis'
import { useAppDispatch } from '../../redux/hooks'
import { setUser } from '../../redux/action/AppActions'
import { BAR_STYLE } from '../../enums/AppEnums'

const LoginScreen = () => {
  const { showToast } = useToast()
  const [selectedButton, setSelectedButton] = useState<string>('whatsapp')
  const dispatch = useAppDispatch()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRefs = Array(6).fill(null).map(() => useRef<TextInput>(null))
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const [number, setNumber] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLoadingOtp, setIsLoadingOtp] = useState<boolean>(false)
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false)
  const [otpTimer, setOtpTimer] = useState<number>(0) // Timer in seconds

  const buttonLabel = [
    { Lable: 'Whatsapp', value: 'whatsapp' },
    { Lable: 'SMS', value: 'sms' },
    { Lable: 'Email', value: 'email' },
  ]

  const subtext = [
    { text: 'Enter your Phone Number to get OTP', text2: 'Phone Number', value: 'sms' },
    { text: 'Enter your Email to get OTP', text2: 'Email', value: 'email' },
    { text: 'Enter your WhatsApp Number to get OTP', text2: 'WhatsApp Number', value: 'whatsapp' },
  ]

  const handleChangeButton = (value: string) => {
    Keyboard.dismiss()
    setSelectedButton(value)
    setErrorMessage('')
    setNumber('')
    setCode(['', '', '', '', '', ''])
    setFocusedIndex(null)
  }

  const handleInputChange = (value: string, index: number) => {
   
    const numericValue = value.replace(/[^0-9]/g, '')

    const newCode = [...code]
    if (numericValue === '' && code[index] !== '') {
      newCode[index] = ''
      setCode(newCode)
      if (index > 0) inputRefs[index - 1]?.current?.focus()
    } else if (numericValue !== '') {
     
      newCode[index] = numericValue.slice(-1)
      setCode(newCode)
      if (index < 5) {
        inputRefs[index + 1]?.current?.focus()
      } else {
        Keyboard.dismiss()
      }
    }
  }

 
  const isAllDigitsEntered = code.every(digit => digit !== '')

  
  const isInputFilled = number.trim().length > 0

  // Format timer as MM:SS
  const formatTimer = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Timer countdown effect
  useEffect(() => {
    if (otpTimer > 0) {
      const timerInterval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timerInterval)
    }
  }, [otpTimer])

  const handleGetOtp = async () => {
    const validationResult = isValidEmailOrMobile(number);
    if (validationResult) {
      setErrorMessage('');
      setIsLoadingOtp(true);
      
      try {
        // Prepare API payload
        // Body: { username: "user@example.com" or "3123456789", platform: "email" | "whatsapp" | "sms" }
        const apiData = {
          username: validationResult.value,
          platform: selectedButton as 'email' | 'whatsapp' | 'sms'
        };
        
        // Call token API
        const response = await tokenApi(apiData);
        
        if (response.success) {
          setErrorMessage('');
          
          // Use API message if available, otherwise use default message
          const successMessage = response.message || response.data?.message || 'OTP sent successfully! Please check your phone.';
          showToast(successMessage, 'success');
          
          // Start 2-minute timer (120 seconds)
          setOtpTimer(120);
        } else {
          // Handle API error
          // Check for field-specific errors (e.g., username: ['User not found.'])
          const usernameError = response.error?.data?.username;
          let errorMsg = '';
          
          if (usernameError && Array.isArray(usernameError) && usernameError.length > 0) {
            // Extract the first error message from the array
            errorMsg = usernameError[0];
          } else {
            // Fallback to general error message
            errorMsg = response.error?.message || 'Failed to send OTP. Please try again.';
          }
          
          // Set error message to display in input field
          setErrorMessage(errorMsg);
          
          // Also show toast for error feedback
          showToast(errorMsg, 'error');
        }
      } catch (error) {
        // Handle unexpected errors
        showToast('An unexpected error occurred. Please try again.', 'error')
      } finally {
        setIsLoadingOtp(false);
      }
    } else {
      const inputType = getInputType(number);
      if (inputType === 'email') {
        setErrorMessage('Invalid email');
      } else if (inputType === 'mobile') {
        setErrorMessage('Invalid mobile number');
      } else {
        setErrorMessage('Invalid input - neither valid email nor valid mobile number');
      }
    }
  }

  const handleNumberChange = (text: string) => {
    setNumber(text);
    if (errorMessage) {
      setErrorMessage('');
    }
  }

  const handleLogin = async () => {
    // Validate that we have email/number and all OTP digits
    const validationResult = isValidEmailOrMobile(number);
    if (!validationResult) {
      showToast('Please enter a valid email or mobile number', 'error');
      return;
    }

    if (!isAllDigitsEntered) {
      showToast('Please enter the complete OTP code', 'error');
      return;
    }

    setIsLoadingLogin(true);

    try {
      // Prepare API payload
      // Body: { username: "user@example.com" or "3123456789", platform: "email" | "whatsapp" | "sms", otp: "123456" }
      const otpCode = code.join(''); // Combine all 6 digits
      const apiData = {
        username: validationResult.value,
        platform: selectedButton as 'email' | 'whatsapp' | 'sms',
        otp: otpCode
      };

      // Call login API
      const response = await loginApi(apiData);

      if (response.success) {
        // Handle successful login
        // Get access token from response (can be in access_token or data.access)
        const accessToken = response.access_token || response.data?.access;
        
        if (accessToken) {
          // Save access token to AsyncStorage
          try {
            await AsyncStorage.setItem('access_token', accessToken);
            
            // Call user profile API with the access token
            const profileResponse = await userProfileApi(accessToken);
            
            if (profileResponse.success && profileResponse.data) {
              // Dispatch user data to Redux
              dispatch(setUser(profileResponse.data));
              
              // Only show success toast and reset inputs when user data is successfully set
              showToast('Login successful!', 'success');
              
              // Reset all input fields after successful login
              setNumber('');
              setCode(['', '', '', '', '', '']);
              setErrorMessage('');
              setFocusedIndex(null);
              Keyboard.dismiss();
            } else {
              // Profile API failed - don't show success toast
              const errorMessage = profileResponse.error?.message || 'Failed to fetch user profile. Please try again.';
              showToast(errorMessage, 'error');
            }
          } catch (storageError) {
            showToast('Error saving authentication data. Please try again.', 'error');
          }
        } else {
          showToast('Login failed. No access token received.', 'error');
        }
      } else {
        // Handle API error
        // Check for field-specific errors (e.g., otp: ['Invalid OTP'])
        const otpError = response.error?.data?.otp;
        let errorMsg = '';
        
        if (otpError && Array.isArray(otpError) && otpError.length > 0) {
          // Extract the first error message from the array
          errorMsg = otpError[0];
        } else {
          // Fallback to general error message
          errorMsg = response.error?.message || 'Login failed. Please try again.';
        }
        
        showToast(errorMsg, 'error');
      }
    } catch (error) {
      // Handle unexpected errors
      showToast('An unexpected error occurred. Please try again.', 'error');
    } finally {
      setIsLoadingLogin(false);
    }
  }

  return (
    <StatusBarWrapper translucent={true} barStyle={BAR_STYLE.DARK}   style={styles.container}>
      <ImageBackground
        source={IMAGES.LOGIN_BG}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <SVG.LOGO style={styles.logo} height={hp(10)} width={hp(10)} />
            <Label textalign='center' style={styles.title}>Login Here</Label>
            <Label textalign='center' style={styles.subtitle}>{subtext.find(item => item.value === selectedButton)?.text}</Label>

            <View style={styles.buttonContainer}>
              {
                buttonLabel.map((item, index) => (
                  <Pressable
                    key={index}
                    style={[styles.button, selectedButton === item.value ? styles.selectedButton : {}]}
                    onPress={() => handleChangeButton(item.value)}
                  >
                    <Label color={selectedButton === item.value ? COLOR.white : COLOR.lightGrey}>{item.Lable}</Label>
                  </Pressable>
                ))
              }
            </View>
            <Input
              style={styles.input}
              keyboard={selectedButton === 'email' ? 'default' : 'phone-pad'}
              placeholder={subtext.find(item => item.value === selectedButton)?.text2}
              onChange={handleNumberChange}
              value={number}
              passwordWarning={errorMessage}
            />
            <Button
              text='Get OTP'
              style={styles.otpButton}
              textStyle={TEXT_STYLE.text}
              disabled={!isInputFilled || isLoadingOtp}
              isLoading={isLoadingOtp}
              onPress={handleGetOtp}
            />

            {otpTimer > 0 && (
              <Label textalign='center' color={COLOR.red} style={styles.otpTimer}>
                {formatTimer(otpTimer)}
              </Label>
            )}

            <View style={styles.codeContainer}>
              {code.map((_, index) => (
                <TextInput
                  key={index}
                  ref={inputRefs[index]}
                  style={[
                    styles.codeInput,
                    focusedIndex === index && styles.focusedCodeInput
                  ]}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={code[index]}
                  onChangeText={(value) => handleInputChange(value, index)}
                  inputMode="numeric"
                />
              ))}
            </View>
            <Button
              text='Login'
              style={styles.contactUsButton}
              disabled={!isAllDigitsEntered || isLoadingLogin}
              isLoading={isLoadingLogin}
              onPress={handleLogin}
            />

           <View style={styles.accountSection}>
           <Label color={COLOR.blue} style={styles.donthaveAcount}>If you Don’t have Account</Label>
            <Button
              text='Contact Us'
              style={styles.contactUsButton}
            />
           </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </StatusBarWrapper>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingBottom: hp(2),
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: hp(8),
    paddingHorizontal: wp(4),
  },
  logo: {
    alignSelf: 'center'
  },
  title: {
    color: COLOR.blue,
    ...TEXT_STYLE.title,
    marginTop: hp(2)
  },
  subtitle: {
    color: COLOR.lightGrey,
    ...TEXT_STYLE.smallText,
    fontSize: 10,
    marginVertical: hp(2)
  },
  buttonContainer: {
    ...commonStyles.horizontalView,
    alignSelf: 'center',
    gap: wp(3),
    marginTop: hp(1)
  },
  button: {
    borderWidth: 0.5,
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.25),
    borderRadius: hp(2),
    borderColor: COLOR.lightGrey2
  },
  selectedButton: {
    backgroundColor: COLOR.purple
  },
  input: {
    marginTop: hp(4),
    marginBottom: hp(2),
  },
  otpButton: {
    width: wp(45),
    alignSelf: 'center',
    borderRadius: hp(3),
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: hp(4),
    marginBottom: hp(2),
  },
  codeInput: {
    width: hp(6),
    height: hp(6),
    borderWidth: isIOS() ? 0.5 : 1,
    borderRadius: hp(1),
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: wp(1),
    color: '#000',
    borderColor: COLOR.lightGrey2,
  },
  focusedCodeInput: {
    backgroundColor: COLOR.white,

  },
  donthaveAcount: {
    textAlign: 'center',
    ...TEXT_STYLE.bigTextSemiBold,
    marginBottom:hp(1),
  },
  contactUsButton: {
    width: wp(45),
    alignSelf: 'center',
  },
  accountSection:{
    marginTop:'auto',
  },
  otpTimer:{
    ...TEXT_STYLE.text,
   marginTop:hp(2),
  }
})