const RAY = 1e27;

function rayToApy(rayValue) {
  if (!rayValue) return 0;

  // Handle BigInt safely
  const value =
    typeof rayValue === "bigint"
      ? Number(rayValue.toString())
      : Number(rayValue);

  return (value / RAY) * 100;
}

module.exports = {
  rayToApy,
};
