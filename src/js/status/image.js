import config from '../../config/common';

const modal = $('#imageModal'),
    insertImage = $('#insertImage'),
    setBackground = $('#setBackground'),
    imageLoader = $('input[name="imageLoader"]')[0],
    bgLoader = $('input[name="backgroundLoader"]')[0];

var imageModal = {
    show(webnote) {
        modal.modal({
            show: true,
            keyboard: true,
        });

        insertImage.on('click', function (e) {
            console.log('插入图片');
        });

        setBackground.on('click', function (e) {
            console.log(bgLoader.files);
            let f = bgLoader.files[0];
            if (!f || !/image/.test(f.type)) return;
            let reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onerror = function () {
                alert("文件读取失败!");
            };
            reader.onload = function () {
                console.log('读取成功');
                let bg = new Image();
                bg.width = config.WIDTH + 'px';
                bg.height = config.HEIGHT + 'px';
                bg.src = reader.result;
                bg.onload = function () {
                    let ctx = webnote.attributes.bgCtx,
                        pattern = ctx.createPattern(bg, 'no-repeat');
                    console.log(ctx.createPattern(bg, 'no-repeat'));
                    webnote.setBackground(pattern);
                }
            }
        });
    }
}

export default imageModal;