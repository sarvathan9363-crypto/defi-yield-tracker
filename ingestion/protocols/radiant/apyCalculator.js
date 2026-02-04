const RAY = 1e27;

function rayToApy(rayValue) {
  return (Number(rayValue.toString()) / RAY) * 100;
}

module.exports = { rayToApy };
