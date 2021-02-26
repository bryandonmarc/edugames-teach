export function mergeAndGetUnique(arrayA, arrayB) {
  const hash = {}
  let i, len

  for (i = 0, len = arrayA.length; i < len; ++i) {
    hash[arrayA[i]] = true
  }
  for (i = 0, len = arrayB.length; i < len; ++i) {
    hash[arrayB[i]] = true
  }
  return Object.keys(hash)
}
