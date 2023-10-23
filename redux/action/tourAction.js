import AxiosIntance from '../../constant/AxiosIntance';

export const TourAll = async () => {
    try {
        const res = await AxiosIntance().get("tour/api/get-all-tour");
        return res; // Trả về toàn bộ response, bạn có thể xử lý dữ liệu sau này
    } catch (err) {
        throw err; // Nếu có lỗi, ném ra lỗi để Redux Saga bắt
    }
};