const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '30566822-5dd8c7f8088312f63e039c329';

const response = (inputName, page) => {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${inputName}
      &image_type=photo&orientation=horizontal&page=
      ${page}&per_page=12`
  ).then(response => response.json());
};
export default response;
