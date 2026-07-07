export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^1[3-9]\d{9}$/,
  ID_CARD: /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/,
  URL: /^https?:\/\/[^\s]+$/,
  IP: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
  NUMBER: /^\d+$/,
  DECIMAL: /^\d+(\.\d+)?$/,
  CHINESE: /^[\u4e00-\u9fa5]+$/,
  ENGLISH: /^[a-zA-Z]+$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/
};

export function validateEmail(email: string): boolean {
  return REGEX.EMAIL.test(email);
}

export function validatePhone(phone: string): boolean {
  return REGEX.PHONE.test(phone);
}

export function validateIdCard(idCard: string): boolean {
  return REGEX.ID_CARD.test(idCard);
}

export function validateUrl(url: string): boolean {
  return REGEX.URL.test(url);
}

export function validateIp(ip: string): boolean {
  return REGEX.IP.test(ip);
}

export function validateNumber(value: string): boolean {
  return REGEX.NUMBER.test(value);
}

export function validateDecimal(value: string): boolean {
  return REGEX.DECIMAL.test(value);
}

export function validateChinese(value: string): boolean {
  return REGEX.CHINESE.test(value);
}

export function validateEnglish(value: string): boolean {
  return REGEX.ENGLISH.test(value);
}

export function validatePassword(password: string): boolean {
  return REGEX.PASSWORD.test(password);
}

export function validateUsername(username: string): boolean {
  return REGEX.USERNAME.test(username);
}

export function validateLength(value: string, min: number, max: number): boolean {
  return value.length >= min && value.length <= max;
}

export function validateMaxLength(value: string, max: number): boolean {
  return value.length <= max;
}

export function validateMinLength(value: string, min: number): boolean {
  return value.length >= min;
}

export function validateRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function validateMin(value: number, min: number): boolean {
  return value >= min;
}

export function validateMax(value: number, max: number): boolean {
  return value <= max;
}

export function validateRequired(value: any): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}