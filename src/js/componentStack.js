// ComponentStack 组件栈
// 用来存储在画布上的组件
// 以栈形式存储，以权值排序(权值大的后渲染，也就是在上层)


class ComponentStack {
    constructor(ctx, area) {
        this.ctx = ctx;
        this.cps = this.components = [];
        this.area = area;
    }
    
    render() {
        let ctx = this.ctx,
            area = this.area;
        ctx.clearRect(0, 0, area.width, area.height);
        for (let i = 0, len = this.cps.length; i < len; ++i) {
            let cur = this.cps[i];
            cur.component.draw(ctx, cur.select);
        }
    }

    add(component, options) {
        let cp = component;
        options || (options = {});
        this.cps.push({
            weight: options.weight || this.cps.length,
            component: cp,
            select: false
        });
        (!options.sort || options.sort === false) && this.sort();
    }

    remove(target) {
        if (!target) return;
        let found = -1,
            cps = this.cps;
        for (let i = 0, len = cps.length; i < len; ++i) {
            if (cps[i].component === target) {
                found = i;
                break;
            }
        }
        if (found !== -1) {
            cps.splice(found, 1);
        }
    }

    pop() {
        this.cps.pop();
        this.render();
    }

    sort() {
        this.cps.sort((a, b) => {
            return a.weight < b.weight ? -1 : 1;
        });
    }


}

module.exports = ComponentStack;