import _ from './utils/utils';

class StatusManager {
    constructor(canvas, componentStack, options) {
        this.canvas = canvas; // 画布
        this.stack = componentStack; // 组件栈
        this.status = 'select'; // 当前状态
        this.eventValues = {}; // 保存事件用到的共享属性
        this.options = options || {};
    }

    addStatus(statusName, cbObject) {
        if(!statusName) return false;
        cbObject || (cbObject = {});
        for(let key in cbObject) {
            if(cbObject[key] && typeof cbObject[key] === 'function') {
                let callback = cbObject[key];
                cbObject[key] = callback.bind(this);
            }
        }
        let cb = this.callback;
        cb[statusName] = _.clone(cbObject);
        return true;
    }

    removeStatus(statusName) {
        if(!statusName) return false;
        let cb = this.callback;
        cb[statusName] && (cb[statusName] = null);
        return true;
    }

    setStatus(status) {
        status && (this.status = status);
    }

    getStatus() {
        return this.status;
    }

    assertStatus(status) {
        return status ? status === this.status : false;
    }

    setEvent(events) {
        let self = this;
        events.forEach(ev => {
            self.canvas.addEventListener(ev, function(e) {
                let status = self.status;
                self.callback[status] && self.callback[status][ev] && self.callback[status][ev](e, self.eventValues);
            });
        });
        console.log('init events', events);
    }
}

StatusManager.prototype.callback = {};

export default StatusManager;