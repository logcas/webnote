// 事件处理程序

class EventListener {
    constructor() {
        this.events = {};
    }

    on(uid, elem, eventName, callback) {
        let cb = callback.bind(elem);
        this.events[uid] = {
            elem,
            eventName,
            callback: cb
        }
        elem.addEventListener(eventName,cb);
    }

    un(uid) {
        this.events[uid].elem.removeEventListener(this.events[uid].eventName, this.events[uid].callback);
    }

    delegate(uid, elem, tagName, eventName, callback) {
        let cb = function(e) {
            if(e.target.tagName.toLowerCase() === tagName.toLowerCase()) {
                callback.call(e.target, e);
            }
        }
        this.events[uid] = {
            elem,
            eventName,
            callback: cb
        }
        elem.addEventListener(eventName, cb);
    }
}

export default EventListener;