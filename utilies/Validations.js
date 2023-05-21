export const isValidEmail = (stringEmail) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail))
  
export const isValidNumberId = (stringNumberId) => stringNumberId.length >= 1
export const isValidPhoneNumber = (stringPhoneNumber) => stringPhoneNumber.length >= 1
export const isValidQuantity = (stringQuantity) => stringQuantity.length >= 1
export const isValidName = (stringName) => stringName.length >= 1
export const isValidCVV= (stringCVV) => stringCVV.length >= 1

