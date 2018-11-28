// 状态管理器

const resizeHook = {
    'top-left': function (attrs, deltaX, deltaY) {
        let { x, y, width, height } = attrs;
        width = width - deltaX;
        height = height - deltaY;
        x = x + deltaX;
        y = y + deltaY;
        return {
            x, y, width, height
        }
    },
    'bottom-left': function (attrs, deltaX, deltaY) {
        return {
            x: attrs.x + deltaX,
            width: attrs.width - deltaX,
            height: attrs.height + deltaY
        }
    },
    'top-right': function (attrs, deltaX, deltaY) {
        return {
            y: attrs.y + deltaY,
            width: attrs.width + deltaX,
            height: attrs.height - deltaY
        }
    },
    'bottom-right': function (attrs, deltaX, deltaY) {
        return {
            width: attrs.width + deltaX,
            height: attrs.height + deltaY
        }
    }
};

class statusHandler {
    constructor(elem, ctx, stack) {
        this.elem = elem;
        this.ctx = ctx;
        this.stack = stack;
        this.status = 'select'; // 当前的鼠标状态
        this.selectType = ''; // 选中的组件类型
        this.target = null; // 选中的组件引用
        this.resize = false; // 改变大小
        this.init();
    }

    init() {
        let that = this;
        this.fn = {
            'select': {
                init() {
                    let canvas = that.elem;
                    canvas.style.cursor = 'default';
                },
                select(mouseX, mouseY) {
                    let stack = that.stack;
                    if (that.selectType) {
                        for (let i = 0, len = stack.cps.length; i < len; ++i) {
                            let cur = stack.cps[i];
                            if ((that.resize = cur.component.isResize(mouseX, mouseY))) {
                                console.log(that.resize);
                                break;
                            }
                        }
                    }
                    for (let i = 0, len = stack.cps.length; i < len; ++i) {
                        let cur = stack.cps[i];
                        if (cur.component.isInside(mouseX, mouseY)) {
                            cur.select = true;
                            that.target = cur.component;
                            that.selectType = cur.component.type;
                            cur.component.draw(stack.ctx, cur.select);
                            return true;
                        }
                    }
                    return false;
                },
                move(deltaX, deltaY) {
                    let stack = that.stack;
                    // check resize
                    if (that.resize) {
                        stack.cps.forEach(cp => {
                            if (cp.select) {
                                let attrs = cp.component.attrs;
                                cp.component.setAttr(resizeHook[that.resize](attrs, deltaX, deltaY));
                            }
                        })
                        return;
                    }
                    stack.cps.forEach(cp => {
                        if (cp.select) {
                            let attrs = cp.component.attrs;
                            cp.component.setAttr({
                                x: attrs.x + deltaX,
                                y: attrs.y + deltaY
                            });
                        }
                    });
                },
                blur() {
                    console.log('blur');
                    let stack = that.stack;
                    that.resize = false;
                    stack.cps.forEach(cp => {
                        cp.select = false;
                    });
                    stack.render();
                }
            },
            'text': {
                init() {
                    let canvas = that.elem;
                    canvas.style.cursor = 'crosshair';
                },
                select() {},
                move() {},
                blur() {}
            },
            'image': function () {
                //
            }
        }
    }
}

export default statusHandler;