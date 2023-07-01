import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export const COLOR = {
    primary: '#0FA3E2',
    title: '#333',
    detail: '#00000099',
    white: '#fff',
    border: "#bdbdbd",
    black: '#000000',
    lightBlack1: 'rgba(0,0,0,0.6)',
    lightBlack2: 'rgba(0,0,0,0.1)',
    lightGray1: 'rgba(82,82,82,0.8)',
    lightGray2: 'rgba(82,82,82,0.1)'
}

export const SIZES = {
    // global sizes
    radius: 12,
    padding: 24,
    base: 10,

    // font sizes
    largeTitle: 40,
    h1: 32,
    h2: 24,
    h3: 16,
    h4: 14,
    h5: 12,
    body1: 32,
    body2: 24,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export const ICON = {
    // home: require('../assets/icon/icons8-home-50.png'),
    home: require('../assets/icon/home.png'),
    home_d: require('../assets/icon/icons8-home-50_d.png'),
    heart: require('../assets/icon/heart.png'),
    heartt: require('../assets/icon/icons8-heart-50.png'),
    heart_d: require('../assets/icon/icons8-heart-50_d.png'),
    notification: require('../assets/icon/notification.png'),
    notification_d: require('../assets/icon/icons8-notification-50_d.png'),
    user: require('../assets/icon/user-circle.png'),
    user_d: require('../assets/icon/icons8-user-50_d.png'),
    google: require('../assets/icon/google.png'),
    facebook: require('../assets/icon/facebook.png'),
    eye: require('../assets/icon/icons8-eye-50.png'),
    eyeClose: require('../assets/icon/icons8-closed-eye-50.png'),
    left: require('../assets/icon/icons8-left-50.png'),
    calendar: require('../assets/icon/icons8-calendar-50.png'),
    arrow_back: require('../assets/icon/arrow-back.png'),
    arrow_right: require('../assets/icon/arrow-right.png'),
    share: require('../assets/icon/share.png'),
    saved_product: require('../assets/icon/saved-product.png'),
    star_yellow: require('../assets/icon/star-yellow.png'),
    star: require('../assets/icon/icons8-star-24.png'),
    vote_up: require('../assets/icon/vote-up.png'),
    qr_code: require('../assets/icon/qr_code_FILL1_wght400_GRAD0_opsz48.png'),
    bus: require('../assets/icon/directions_bus_FILL1_wght400_GRAD0_opsz48.png'),
    clock: require('../assets/icon/schedule_FILL1_wght400_GRAD0_opsz48.png'),
    camera: require('../assets/icon/icons8-camera-50.png'),
}

export const IMAGES = {
    logo: require('../assets/image/logo.png'),
    logoWhite: require('../assets/image/logoWhite.png'),
    tour_detail_bg: require('../assets/image/detail-background.png'),
}