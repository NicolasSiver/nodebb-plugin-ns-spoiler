/**
 * Created by Nicolas on 10/8/16.
 */
module.exports = Object.freeze({
    PARSE_REJECT_TOKEN  : Symbol(),
    REG_SAFE_LIST_CLOSE : /(<(ul|ol)>[\s\S]+?)(:{3,})([\s\S]+?<\/\2>)/g,
    REG_SAFE_SHIFT_END  : /(:{3,})(<\/p>)$/gm,
    REG_SAFE_SHIFT_START: /^(<p>)(:{3,})/gm,
    REG_SANITIZE_WRAP   : /<(\w+)[^<]*>(:{3,})<\/\1>/g,
    REG_SPOILER         : /^:{3,}([\s\S]+?):{3,}$/gm,
    SOCKET_NAMESPACE    : 'ns-spoiler'
});
