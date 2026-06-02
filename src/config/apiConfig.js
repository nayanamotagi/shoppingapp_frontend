const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://shoppingapp-backend-9t2k.onrender.com/api';

export function getApiBaseUrl() {
    return API_BASE_URL;
}

const apiConfig = {
    API_BASE_URL,
};

export default apiConfig;
