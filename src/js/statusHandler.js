// 状态管理器

class statusHandler {
    constructor(elem, ctx, stack) {
        this.elem = elem;
        this.ctx = ctx;
        this.stack = stack;
        this.status = 'select'; // 当前的鼠标状态
        this.selectType = ''; // 选中的组件类型
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
                    for (let i = 0, len = stack.cps.length; i < len; ++i) {
                        let cur = stack.cps[i];
                        if (cur.component.isInside(mouseX, mouseY)) {
                            cur.select = true;
                            that.selectType = cur.component.type;
                            cur.component.draw(stack.ctx, cur.select);
                            return true;
                        }
                    }
                    return false;
                },
                move(deltaX, deltaY) {
                    let stack = that.stack;
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
                    let stack = that.stack;
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
                select(){},
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