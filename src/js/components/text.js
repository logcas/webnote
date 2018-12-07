import Frame from './frame';

// 选择文本时会有阴影提示
let _drawShadow = function(ctx) {
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = '10';
}

class Text extends Frame{
    constructor(attrs, stack) {
        super(attrs, stack);
        this.type = 'text';
    }

    draw(ctx, select) {

        select && super.draw(ctx);

        let attrs = this.attributes;
        attrs.fontSize || (attrs.fontSize = '30px');
        attrs.fontFamily || (attrs.fontFamily = 'Arial');
        attrs.fontBold || (attrs.fontBold = '');
        attrs.fontItalic || (attrs.fontItalic = '');

        let font = `${attrs.fontBold} ${attrs.fontItalic} ${attrs.fontSize} ${attrs.fontFamily}`,
            color = attrs.color || (attrs.color = '#000'),
            text = attrs.text || (attrs.text = ''),
            x = attrs.x || (attrs.x = 0),
            y = attrs.y || (attrs.y = 0),
            width = attrs.width || (attrs.width = 0);

        ctx.save();
        ctx.beginPath();

        ctx.font = font;
        ctx.textBaseline = 'top';
        ctx.fillStyle = color;
        ctx.fillText(text, x, y, width);

        ctx.restore();

    }
}

export default Text;