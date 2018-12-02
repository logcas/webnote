let utils = {

    // 浅复制
    clone: function(obj) {
        let o = {};
        for(let k in obj) {
            o[k] = obj[k]
        }
        return o;
    },

    // 判断添加的属性是否相等
    diff: function(obj, tObj) {
        let isSame = true;
        for(let key in tObj) {
            if(obj[key]!==tObj[key]) {
                isSame = false;
            }
        }
        return !isSame;
    },

    // 事件委托
    delegate: function(elem, tagName, eventName, callback) {
        if(!elem || !tagName || !eventName || !callback) return;
        elem = typeof elem === 'object' ? elem : document.querySelector(elem);
        let cb = function(e) {
            if(e.target.tagName.toLowerCase() === tagName.toLowerCase()) {
                return callback(e);
            }
        }
        elem.addEventListener(eventName, cb);
    }

}

export default utils;