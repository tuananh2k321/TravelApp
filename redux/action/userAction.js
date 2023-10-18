import AxiosIntance from '../../constant/AxiosIntance';

export const Login = async (email, password) => {
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