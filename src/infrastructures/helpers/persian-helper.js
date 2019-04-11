/**
 * Use for converting Arabic Ye and Ke characters to the Persian ones
 */
exports.fixYeKe = (value) => {
    if (!value) {
        return;
    }

    const arabicYeKeChars = ["ي", "ك"],
        persianYeKeChars = ["ی", "ک"];

    for (let i = 0, charsLen = arabicYeKeChars.length; i < charsLen; i++) {
        value = value.replace(new RegExp(arabicYeKeChars[i], "g"), persianYeKeChars[i]);
    }
    
    return value;
}