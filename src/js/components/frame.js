import _ from '../utils/utils';

class Frame {
    constructor(attrs, stack) {
        this.attributes = _.clone(attrs);
        this.stack = stack;
        this.framework = {
            color: 'gray',
            lineWidth: 1
        };
    }

    get attrs() {
        return _.clone(this.attributes);
    }

    setAttr(attrs) {
        attrs || (attrs = {});
        if (!_.diff(this.attributes, attrs)) return;
        for (let key in attrs) {
            this.attributes[key] = attrs[key]
        }
        this.stack.render.call(this.stack);
    }

    // 判断点击事件的坐标是否在区域内
    isInside(mouseX, mouseY) {
        let attrs = this.attributes,
            x = attrs.x || 0,
            y = attrs.y || 0,
            width = attrs.width || 0,
            height = attrs.height || 0,
            isInside = false;

        if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
            isInside = true;
        }

        return isInside;
    }

    draw(ctx) {
        if (!ctx) return;

        let attr = this.attributes,
            x = attr.x || 0,
            y = attr.y || 0,
            width = attr.width || 0,
            height = attr.height || 0;

        const RADIUS = 5,
            COLOR = this.framework.color,
            LINEWIDTH = this.framework.lineWidth;

        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.strokeStyle = COLOR;
        ctx.lineWidth = LINEWIDTH;
        ctx.stroke();

        let pos = [{
                x: x,
                y: y
            },
            {
                x: x,
                y: y + height
            },
            {
                x: x + width,
                y: y
            },
            {
                x: x + width,
                y: y + height
            }
        ];

        for (let i = 0, len = pos.length; i < len; ++i) {
            ctx.beginPath();
            ctx.arc(pos[i].x, pos[i].y, RADIUS, 0, 2 * Math.PI, false);
            ctx.fillStyle = COLOR;
            ctx.fill();
        }
    }
}

export default Frame;