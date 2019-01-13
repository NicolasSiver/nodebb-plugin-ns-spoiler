module.exports = Object.freeze({
    PARSE_REJECT_TOKEN  : Symbol(),
    REG_SPOILER_TAG     : /(:{3,})/g,
    REG_SAFE_LIST_CLOSE : /(<(ul|ol)>(?:[\s\S](?!<\/\2>))*?)(:{3,})([\s\S]*?<\/\2>)/g,
    REG_SAFE_SHIFT_END  : /(:{3,})(<\/p>)/g,
    REG_SAFE_SHIFT_START: /(<p>)(:{3,})/g,
    REG_SANITIZE_WRAP   : /<(\w+)[^<]*>(:{3,})<\/\1>/g,
    REG_SPOILER         : /:{3,}([\s\S]+?):{3,}/g,
    SOCKET_NAMESPACE    : 'ns-spoiler'
});
