import AxiosIntance from '../../constant/AxiosIntance';

export const login = async (email, password) => {
    try {
        const res = await AxiosIntance().post("user/api/login", {
            password: password,
            email: email
        });
        return res; // Trả về toàn bộ response, bạn có thể xử lý dữ liệu sau này
    } catch (err) {
        throw err; // Nếu có lỗi, ném ra lỗi để Redux Saga bắt
    }
};

export const register = async (name, lastName, dob, phoneNumber, email, password) => {
    try {
        const res = await AxiosIntance().post("user/api/register", {
            name: name,
            lastName: lastName,
            dob: dob,
            phoneNumber: phoneNumber,
            email: email,
            password: password
        });
        return res; // Trả về toàn bộ response, bạn có thể xử lý dữ liệu sau này
    } catch (err) {
        throw err; // Nếu có lỗi, ném ra lỗi để Redux Saga bắt
    }
};

export const sendEmail = async (email) => {
    try {
        const res = await AxiosIntance().get("user/api/send-mail?email="+email);
        return res; // Trả về toàn bộ response, bạn có thể xử lý dữ liệu sau này
    } catch (err) {
        throw err; // Nếu có lỗi, ném ra lỗi để Redux Saga bắt
    }
};

export const sendEmailChangePassword = async (email) => {
    try {
        const res = await AxiosIntance().get("user/api/send-mail-change-password?email="+email);
        return res; // Trả về toàn bộ response, bạn có thể xử lý dữ liệu sau này
    } catch (err) {
        throw err; // Nếu có lỗi, ném ra lỗi để Redux Saga bắt
    }
};


export const sendOTP = async (phoneNumber) => {
    try {
        const res = await AxiosIntance().post("user/api/otp", {
            phoneNumber: phoneNumber
        });
        return res; // Trả về toàn bộ response, bạn có thể xử lý dữ liệu sau này
    } catch (err) {
        throw err; // Nếu có lỗi, ném ra lỗi để Redux Saga bắt
    }
};

export const verifyOTP = async (phoneNumber, otp) => {
    try {
        const res = await AxiosIntance().post("user/api/otp/verify?phoneNumber="+phoneNumber, {
            otpCode: otp
        });
        return res; // Trả về toàn bộ response, bạn có thể xử lý dữ liệu sau này
    } catch (err) {
        throw err; // Nếu có lỗi, ném ra lỗi để Redux Saga bắt
    }
};

export const updatePasswordByEmail = async (email, newPassword) => {
    try {
        const res = await AxiosIntance().post("user/api/updatePasswordByEmail", {
            emai: email,
            password: newPassword
        });
        return res; // Trả về toàn bộ response, bạn có thể xử lý dữ liệu sau này
    } catch (err) {
        throw err; // Nếu có lỗi, ném ra lỗi để Redux Saga bắt
    }
};

export const updateUser = async (email, avatar, name, lastName, phoneNumber, dob) => {
    try {
        const res = await AxiosIntance().post("user/api/update?email="+email, {
            avatar: avatar,
            name: name,
            lastName: lastName,
            phoneNumber: phoneNumber,
            dob: dob,
        });
        return res; // Trả về toàn bộ response, bạn có thể xử lý dữ liệu sau này
    } catch (err) {
        throw err; // Nếu có lỗi, ném ra lỗi để Redux Saga bắt
    }
};