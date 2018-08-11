export const checkEmpty = function (str) {
  if (str == '' || str == null || str == undefined) {
    return false;
  } else {
    return true;
  }
};

export const checkPhone = function (str) {
  return /^1\d{10}$/.test(str);
};
