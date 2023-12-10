const checkWin = (mat) => {
  if (
    mat.indexOf("00") != -1 &&
    mat.indexOf("01") != -1 &&
    mat.indexOf("02") != -1
  )
  return [true,["00", "01", "02"]] ;
  if (
    mat.indexOf("10") != -1 &&
    mat.indexOf("11") != -1 &&
    mat.indexOf("12") != -1
  )
  return [true,["10", "11", "12"]] ;
  if (
    mat.indexOf("20") != -1 &&
    mat.indexOf("21") != -1 &&
    mat.indexOf("22") != -1
  )
  return [true,["20", "21", "22"]] ;
  if (
    mat.indexOf("00") != -1 &&
    mat.indexOf("10") != -1 &&
    mat.indexOf("20") != -1
  )
  return [true,["00", "10", "20"]] ;
  if (
    mat.indexOf("01") != -1 &&
    mat.indexOf("11") != -1 &&
    mat.indexOf("21") != -1
  )
    return [true,["01", "11", "21"]] ;
  if (
    mat.indexOf("02") != -1 &&
    mat.indexOf("12") != -1 &&
    mat.indexOf("22") != -1
  )
  return [true,["02", "12", "22"]] ;
  if (
    mat.indexOf("00") != -1 &&
    mat.indexOf("11") != -1 &&
    mat.indexOf("22") != -1
  )
  return [true,["00", "11", "22"]] ;
  if (
    mat.indexOf("02") != -1 &&
    mat.indexOf("11") != -1 &&
    mat.indexOf("20") != -1
  )
    return [true,["02", "11", "20"]] ;

  return [false, []];
};

module.exports = checkWin;