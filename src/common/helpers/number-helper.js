// @flow
function NumberHelper() {}

NumberHelper.convertToInt = val => {
  return parseInt(val, 10);
};

NumberHelper.faToEnDigits = function(input) {
  if (input === undefined || input === null || input === '') {
    return;
  }

  var returnModel = '';
  var symbolMap = {
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
    '۰': '0'
  };
  input = input.toString();
  for (var i = 0; i < input.length; i++)
    if (symbolMap[input[i]]) returnModel += symbolMap[input[i]];
    else returnModel += input[i];
  return returnModel;
};

NumberHelper.enToFaDigits = function(input) {
  if (input == undefined) return;
  var returnModel = '';
  var symbolMap = {
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
    '0': '۰'
  };
  input = input.toString();
  for (var i = 0; i < input.length; i++)
    if (symbolMap[input[i]]) returnModel += symbolMap[input[i]];
    else returnModel += input[i];
  return returnModel;
};

module.exports = NumberHelper;
