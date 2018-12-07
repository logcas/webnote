import Text from '../components/text';
import Frame from '../components/frame';

const modal = $('#textModal'),
      saveText = $('#saveText'),
      textarea = $('#textModal textarea');

const text = {
    'mouseover': function() {},
    'mousedown': function(e, vals) {
        vals.isMove = true;
        vals.mouseX = e.layerX;
        vals.mouseY = e.layerY;
        vals.tempFrame = new Frame({
            x: vals.mouseX,
            y: vals.mouseY,
            width: 0,
            height: 0,
            text: ''
        }, this.stack);
        this.stack.add(vals.tempFrame);
    },
    'mousemove': function(e, vals) {
        if(!vals.isMove) return;
        let newX = e.layerX,
            newY = e.layerY,
            attrs = vals.tempFrame.attrs;
        
        vals.tempFrame.setAttr({
            width: newX - attrs.x,
            height: newY - attrs.y
        });
        vals.mouseX = newX;
        vals.mouseY = newY;
    },
    'mouseup': function(e, vals) {
        vals.isMove = false;
        
        textarea.val('');
        modal.modal({
            show: true,
            keyboard: true
        });
        let attrs = vals.tempFrame.attrs;

        // 移除stack中暂存的frame
        this.stack.pop();
        vals.tempFrame = null;

        let self = this;
        saveText.unbind('click');
        saveText.on('click',function(e) {
            let text = textarea.val();
            textarea.val('');
            if(text.trim() === '') return;
            self.stack.add(new Text(Object.assign(attrs, {
                text
            }), self.stack));
            modal.modal('hide');
            self.stack.render();
        });
        this.setStatus('select');
        this.canvas.style.cursor = 'default';
    }
};

export default text;