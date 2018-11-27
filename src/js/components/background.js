class BackGround {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }

    get rect() {
        return {
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        };
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(0, 0, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

module.exports = BackGround;