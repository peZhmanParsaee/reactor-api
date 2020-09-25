/**
 * Use for converting Arabic Ye and Ke characters to the Persian ones
 */
exports.fixYeKe = function(text) {
  if (!text) {
    return text;
  }

  if (typeof text !== 'string') {
    return text;
  }

  let result = text.trim();

  result = result.split('ك').join('ک');
  result = result.split('ي').join('ی');

  return result;
};
