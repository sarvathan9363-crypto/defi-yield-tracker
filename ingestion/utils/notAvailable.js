module.exports = function notAvailable(asset) {
  return {
    asset,
    apy: null,
    supported: false,
  };
};
