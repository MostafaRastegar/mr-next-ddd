const endpoints = {
  USER: {
    GET_USERS: () => "https://jsonplaceholder.typicode.com/users",
    GET_USERS_ID: (id: number) =>
      `https://jsonplaceholder.typicode.com/users/${id}`,
  },
};

export default endpoints;
