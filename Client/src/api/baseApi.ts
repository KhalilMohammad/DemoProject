import ky from 'ky';

const api = ky.extend({
  prefixUrl: 'http://localhost:3000',
});

export default api;
