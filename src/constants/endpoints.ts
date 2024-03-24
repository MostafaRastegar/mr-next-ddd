// const HOST_URL = process.env.HOST_URL;
const HOST_URL = 'https://api.realworld.io/api';
const endpoints = {
  USERS: {
    GET_USERS_ID: (id: number) =>
      `https://jsonplaceholder.typicode.com/users/${id}`,
    GET_USER: () => `${HOST_URL}/user`,
    PUT_USER: () => `${HOST_URL}/user`,
    POST_USERS_LOGIN: () => `${HOST_URL}/users/login`,
    POST_USERS: () => `${HOST_URL}/users`,
  },
  ARTICLES: {
    GET_ARTICLES: () => `${HOST_URL}/articles`,
    GET_ARTICLES_SLUG: (slug: string) => `${HOST_URL}/articles/${slug}`,
    POST_ARTICLES: () => `${HOST_URL}/articles`,
    PUT_ARTICLES_SLUG: (slug: string) => `${HOST_URL}/articles/${slug}`,
    DELETE_ARTICLES_SLUG: (slug: string) => `${HOST_URL}/articles/${slug}`,
    GET_TAGS: () => `${HOST_URL}/tags`,
  },
};

export default endpoints;
