export const updateSearchQuery = (
  updatedQuery: any,
  router: any,
  pathname: any
) => {
  const params = new URLSearchParams('');
  Object.keys(updatedQuery).forEach((key) => {
    if (updatedQuery[key]) {
      params.set(key, updatedQuery[key]);
    } else {
      params.delete(key);
    }
  });

  const queryString = params.toString();
  const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
  router.push(updatedPath);
};
