const objectToQueryString = (params = {}) => {
  const paramsString = Object.keys(params)
    .map((key) => {
      if (!!params[key]) {
        if (Array.isArray(params[key])) {
          // Map each item in the array to a key=value pair
          return params[key].map((item) => `${key}=${item}`).join('&');
        }
        return key + '=' + params[key];
      }
    })
    .filter((item) => {
      if (!!item) return item;
    });

  if (!paramsString.length) {
    return '';
  }

  return paramsString.join('&');
};

export default objectToQueryString;
