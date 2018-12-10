import Frame from './frame'

class _Image extends Frame {
    constructor(attrs, stack) {
        super(attrs,stack);
        this.type = 'image'
    }

    draw(ctx, select) {

        select && super.draw(ctx);

        let attrs = this.attributes,
            width = attrs.width,
            height = attrs.height,
            img = attrs.img,
            x = attrs.x,
            y = attrs.y;

        ctx.save();
        ctx.beginPath();

        ctx.drawImage(img,x,y,width,height);

        ctx.restore();
    }
}

export default _Image;