import './css/main.scss';

import Text from './js/components/text';
import Stack from './js/componentStack';
import StatusManager from './js/status';
import resizeHook from './js/utils/resize';
import _ from './js/utils/utils';

const WIDTH = 900,
    HEIGHT = 550;

const canvas = document.querySelector('#canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext('2d');

const st = new Stack(ctx, {
    width: WIDTH,
    height: HEIGHT
});

st.add(new Text({
    x: 50,
    y: 50,
    width: 200,
    height: 50,
    text: 'Hello,world'
}, st));

st.add(new Text({
    x: 200,
    y: 200,
    width: 200,
    height: 50,
    text: 'Hello!!',
    fontSize: '20px'
}, st));

st.render();

const statusManager = new StatusManager(canvas, st),
    sm = statusManager;

sm.setEvent(['mousedown', 'mouseup', 'mouseover', 'mousemove']);

sm.addStatus('select', {
    'mouseover': function (e, vals) {},
    'mousedown': function (e, vals) {
        let mouseX = vals.mouseX = e.layerX,
            mouseY = vals.mouseY = e.layerY;

        vals.resize = false;
        this.stack.cps.forEach(cp => {
            cp.select = false;
        });
        this.stack.render();

        if (vals.selectType) {
            for (let i = 0, len = this.stack.cps.length; i < len; ++i) {
                let cur = this.stack.cps[i];
                if ((vals.resize = cur.component.isResize(mouseX, mouseY))) {
                    break;
                }
            }
        }

        for (let i = 0, len = this.stack.cps.length; i < len; ++i) {
            let cur = this.stack.cps[i];
            if (cur.component.isInside(mouseX, mouseY)) {
                cur.select = true;
                vals.selectType = cur.component.type;
                vals.isMove = true;
                cur.component.draw(this.stack.ctx, cur.select);
                return;
            }
        }

    },
    'mouseup': function (e, vals) {
        vals.isMove = '';
    },
    'mousemove': function (e, vals) {
        if (!vals.isMove) return;
        let newX = e.layerX,
            newY = e.layerY,
            deltaX = newX - vals.mouseX,
            deltaY = newY - vals.mouseY;
        vals.mouseX = newX;
        vals.mouseY = newY;
        // check resize
        if (vals.resize) {
            this.stack.cps.forEach(cp => {
                if (cp.select) {
                    let attrs = cp.component.attrs;
                    cp.component.setAttr(resizeHook[vals.resize](attrs, deltaX, deltaY));
                }
            });
            return;
        }
        this.stack.cps.forEach(cp => {
            if(cp.select) {
                let attrs = cp.component.attrs;
                cp.component.setAttr({
                    x: attrs.x + deltaX,
                    y: attrs.y + deltaY
                });
            }
        });
    }
});

_.delegate('.toolbar', 'span', 'click', function(e) {
    let status = e.target.getAttribute('data-type');
    sm.setStatus(status);
    console.log(status);
});