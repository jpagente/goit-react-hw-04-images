    import axios from 'axios';

    export const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '43715812-85eea8ed3e0ad65ef3c13d55b';

    export const getAPI = async (query, page) => {
    const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    const response = await axios.get(url);

    return response.data;
    };