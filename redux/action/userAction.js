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