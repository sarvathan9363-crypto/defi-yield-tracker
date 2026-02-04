function aprToApy(apr) {
  // Simple APY approximation
  return apr * 100;
}

module.exports = {
  aprToApy,
};
