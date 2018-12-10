import config from '../../config/common';
import _Image from '../components/image';

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
            console.log('click');
            let f= imageLoader.files[0];
            if(!f || !/image/.test(f.type)) return;
            let reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onerror = function() {
                alert("文件读取失败！");
            };
            reader.onload = function() {
                console.log('onload');
                let img = new Image();
                img.src = reader.result;
                img.onload = function() {
                    let image = new _Image({
                        x:0,
                        y:0,
                        width: img.width,
                        height: img.height,
                        img: img
                    },webnote.componentStack);
                    webnote.componentStack.add(image);
                    webnote.componentStack.render();
                };
            };
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
                    webnote.setBackground({
                        image: bg
                    });
                }
            }
        });
    }
}

export default imageModal;