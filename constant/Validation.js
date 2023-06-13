export const isValidEmpty = (stringUsername)  => {
    return (
        stringUsername.length > 0
    )
}

// PHONE
export const validatePhoneNumber = phoneNumber => {
    // Regex pattern để kiểm tra số điện thoại ở Việt Nam
    const phoneNumberRegex = /^(0|\+84)(3[2-9]|5[2689]|7[06789]|8[1-9]|9[0-9])[0-9]{7}$/;
  
    // Kiểm tra số điện thoại với regex pattern
    return phoneNumberRegex.test(phoneNumber);
  };

// EMAIl
export const validateEmail = (email) => {
    // Regex pattern để kiểm tra email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
    // Kiểm tra email với regex pattern
    return emailRegex.test(email);
  };

// PASSWORD
export  const validatePassword = (password) => {
    // Kiểm tra độ dài mật khẩu (ít nhất 8 ký tự) 
    if (password.length < 8) {
      return false;
    }
  
    // Kiểm tra mật khẩu có chứa ít nhất một chữ cái viết hoa
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // Kiểm tra mật khẩu có chứa ít nhất một chữ cái viết thường
    if (!/[a-z]/.test(password)) {
      return false;
    }
  
    // Kiểm tra mật khẩu có chứa ít nhất một số
    if (!/[0-9]/.test(password)) {
      return false;
    }
  
    // Mật khẩu hợp lệ
    return true;
  };

// BIRTHDAY
export const validateDateOfBirth = (dateOfBirth) => {
  var pattern = /^\d{2}\/\d{2}\/\d{4}$/; // Biểu thức chính quy kiểm tra định dạng dd/mm/yyyy
  
  if (!pattern.test(dateOfBirth)) {
    return false;
  }
  
  var parts = dateOfBirth.split('/');
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[2], 10);
  
  // Kiểm tra giá trị hợp lệ cho ngày, tháng, năm
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1950 || year > 2005) {
    return false;
  }
  
  return true;
}