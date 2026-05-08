import { Platform } from "react-native";

export const isIOS = () => {
    return Platform.OS === 'ios';
  };
  
  export const isAndroid15 = () => {
    return !isIOS() && Number(Platform.Version) >= 35;
  };


export const isValidEmail = (email: string) => {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const parsePakNumber = (input: string) => {
  if (!input) return null;

  // Remove everything except digits
  let digits = input.replace(/\D/g, '');

  // Case 1 → Starts with 0092
  if (digits.startsWith("0092")) {
    digits = digits.slice(4);
  }
  // Case 2 → Starts with +92, 92, or 920
  else if (digits.startsWith("92")) {
    // If after "92" there is a leading zero -> remove it
    if (digits[2] === "0") {
      digits = digits.slice(3); // remove 92 + 0
    } else {
      digits = digits.slice(2); // remove only 92
    }
  }
  // Case 3 → Starts with local 0
  else if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  // Must be exactly 10 digits (3xxxxxxxxx)
  if (digits.length === 10) {
    return digits;
  }

  return null;
};

export const isValidPakMobile = (input: string): boolean => {
  if (!input) return false;
  const parsed = parsePakNumber(input);
  if (!parsed) return false;
  
  // Pakistan mobile numbers start with 3 (03xx format)
  // After parsing, should be 10 digits starting with 3
  return parsed.length === 10 && parsed.startsWith('3');
};

export const isValidEmailOrMobile = (input: string): { type: 'email' | 'mobile', value: string } | null => {
  if (!input || !input.trim()) return null;
  
  const trimmedInput = input.trim();
  
  // Check if it's a valid email
  if (isValidEmail(trimmedInput)) {
    return { type: 'email', value: trimmedInput };
  }
  
  // Check if it's a valid Pakistan mobile number
  const parsedNumber = parsePakNumber(trimmedInput);
  if (parsedNumber && parsedNumber.length === 10 && parsedNumber.startsWith('3')) {
    return { type: 'mobile', value: parsedNumber };
  }
  
  return null;
};

export const getInputType = (input: string): 'email' | 'mobile' | 'unknown' => {
  if (!input || !input.trim()) return 'unknown';
  
  const trimmedInput = input.trim();
  
  // If it contains @, it's likely an email attempt
  if (trimmedInput.includes('@')) {
    return 'email';
  }
  
  // If it contains a dot and has letters/numbers (like "example.com" or "user.name"), it's likely an email attempt
  if (trimmedInput.includes('.') && /[a-zA-Z]/.test(trimmedInput)) {
    return 'email';
  }
  
  // If it's mostly digits (at least 7 digits), it's likely a mobile attempt
  const digitCount = trimmedInput.replace(/\D/g, '').length;
  if (digitCount >= 7) {
    return 'mobile';
  }
  
  return 'unknown';
};
