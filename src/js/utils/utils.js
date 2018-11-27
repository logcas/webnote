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
    }

}

export default utils;