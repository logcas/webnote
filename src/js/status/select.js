const resizeHook = {
    'top-left': function (attrs, deltaX, deltaY) {
        return {
            x: attrs.x + deltaX,
            y: attrs.y + deltaY,
            width: attrs.width - deltaX,
            height: attrs.height - deltaY
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

const modal = $('#textModal'),
    saveText = $('#saveText'),
    textarea = $('#textModal textarea'),
    fontFormat = {
        size: $('select[name="fontSize"]'),
        color: $('input[name="fontColor"]'),
        family: $('select[name="fontFamily"]')
    }

const select = {
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
                vals.target = cur;
                cur.component.draw(this.stack.ctx, cur.select);

                if(vals.selectType === 'text') {
                    let { fontSize, fontFamily, color } = cur.component.attrs;
                    fontFormat.size.children().attr('selected',false);
                    fontFormat.size.children(`option[value="${fontSize}"]`).attr('selected',true);
                    console.log(fontSize);
                    console.log(fontFamily);
                    fontFormat.family.children().attr('selected',false);
                    fontFormat.family.children(`option[value="${fontFamily}"]`).attr('selected',true);
                    console.log(color);
                    // ! TODO：工具栏颜色盘显示问题
                    //fontFormat.color.value = color;
                    //fontFormat.color.css('color',color);
                }

                return;
            }
        }

        // 什么都没点的时候，选择的目标为null
        vals.target = null;

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
            if (cp.select) {
                let attrs = cp.component.attrs;
                cp.component.setAttr({
                    x: attrs.x + deltaX,
                    y: attrs.y + deltaY
                });
            }
        });
    },
    // 双击目标更改文本
    'dblclick': function (e, vals) {
        let mouseX = vals.mouseX = e.layerX,
            mouseY = vals.mouseY = e.layerY,
            text,
            idx = -1;

        for (let i = 0, len = this.stack.cps.length; i < len; ++i) {
            let cur = this.stack.cps[i];
            if (cur.component.isInside(mouseX, mouseY)) {
                cur.select = true;
                vals.selectType = cur.component.type;
                idx = i;
                text = cur.component.attrs.text;
                cur.component.draw(this.stack.ctx, cur.select);
                break;
            }
        }
        if (idx === -1) return;
        textarea.val(text);
        modal.modal({
            show: true,
            keyboard: true
        });
        saveText.unbind('click');
        saveText.on('click', (e) => {
            this.stack.cps[idx].component.setAttr({
                text: textarea.val()
            });
            modal.modal('hide');
            this.stack.render();
        });
        
    }
}

export default select;