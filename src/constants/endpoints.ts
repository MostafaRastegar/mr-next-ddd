const HOST_URL_API = process.env.NEXT_PUBLIC_HOST_URL;
const endpoints = {
  USERS: {
    GET_USERS: () => `${HOST_URL_API}/users/`,
    POST_USERS: () => `${HOST_URL_API}/users/`,
    POST_USERS_LOGIN: () => `${HOST_URL_API}/users/login/`,
    GET_USERS_ID: (id: string) => `${HOST_URL_API}/users/${id}/`,
    PUT_USERS_ID: (id: string) => `${HOST_URL_API}/users/${id}/`,
    DELETE_USERS_ID: (id: string) => `${HOST_URL_API}/users/${id}/`,
  },
  MOCK: {
    POST_LOGIN: () => `${HOST_URL_API}/token/`,
  },
};

export default endpoints;
