const checkWin = (mat) => {
  if (
    mat.indexOf("00") != -1 &&
    mat.indexOf("01") != -1 &&
    mat.indexOf("02") != -1
  )
    return true;
  if (
    mat.indexOf("10") != -1 &&
    mat.indexOf("11") != -1 &&
    mat.indexOf("12") != -1
  )
    return true;
  if (
    mat.indexOf("20") != -1 &&
    mat.indexOf("21") != -1 &&
    mat.indexOf("22") != -1
  )
    return true;
  if (
    mat.indexOf("00") != -1 &&
    mat.indexOf("10") != -1 &&
    mat.indexOf("20") != -1
  )
    return true;
  if (
    mat.indexOf("01") != -1 &&
    mat.indexOf("11") != -1 &&
    mat.indexOf("21") != -1
  )
    return true;
  if (
    mat.indexOf("02") != -1 &&
    mat.indexOf("12") != -1 &&
    mat.indexOf("22") != -1
  )
    return true;
  if (
    mat.indexOf("00") != -1 &&
    mat.indexOf("11") != -1 &&
    mat.indexOf("22") != -1
  )
    return true;
  if (
    mat.indexOf("02") != -1 &&
    mat.indexOf("11") != -1 &&
    mat.indexOf("20") != -1
  )
    return true;

  return false;
};

module.exports = checkWin;