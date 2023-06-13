import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export const COLOR = {
    primary: '#0FA3E2',
    title: '#333',
    detail: '#00000099',
    white: '#fff',
    border: "#bdbdbd"
}

export const SIZES = {
    // global sizes
    radius: 12,
    padding: 24,
    base: 6,

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
}

export const IMAGES = {
    logo: require('../assets/image/logo.png'),
    logoWhite: require('../assets/image/logoWhite.png'),
}