const correctDateFormat = (date) => {
  const split = date.split("-")
  if (split.length !== 3) {
    return false
  }
  if (split[0].length !== 2 || split[1].length !== 2 || split[2].length !== 4) {
    return false
  }
  if (Number(split[0]) > 31 || Number(split[1]) > 12 || Number(split[2]) > 3000) {
    return false
  }

  return split.length

}

module.exports = correctDateFormat