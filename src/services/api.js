export const fetchImagesService = request => {
  return fetch(
    'http://www.splashbase.co/api/v1/images/search?query=' + request,
  ).then(response => {
    return response.json();
  });
};
