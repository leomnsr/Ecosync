export const authorize = () => {
  return {
    async beforeHandle({ authorize, bearer, jwt, set, store }) {
      return await authorize({ bearer, jwt, set, store });
    },
  };
};
