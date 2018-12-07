import StatusManager from './status';
import Stack from './componentStack';
import _ from './utils/utils';
import selectStatus from './status/select';
import textStatus from './status/text';

import font_family from '../config/fontFamily.json';

import imageModal from './status/image';

import config from '../config/common';

const WIDTH = config.WIDTH,
    HEIGHT = config.HEIGHT;

class WebNote {
    constructor(options) {
        options || (options = {});
        this.attributes = {
            bgCanvas: options.bgCanvas || null,
            cpCanvas: options.cpCanvas || null,
            bgCtx: options.bgCtx || null,
            cpCtx: options.cpCtx || null,
            toolBar: options.toolBar || null,
            status: options.status || 'select',
            target: null,
            area: options.area || {
                width: WIDTH,
                height: HEIGHT
            },
            fontFormat: options.fontFormat || {}
        };
        this.componentStack = options.componentStack ||
            new Stack(this.attributes.cpCtx, this.attributes.area, this.attributes.target);
        this.statusManager = options.statusManager ||
            new StatusManager(this.attributes.cpCanvas, this.componentStack, {
                fontFormat: this.attributes.fontFormat
            });
        this.init();
    }

    init() {
        this.observeToolBar();
        this.initToolBar();
        this.initStatus();
        this.setBackground();
        this.componentStack.render();
    }

    initStatus() {
        this.statusManager.setEvent(['mousedown', 'mouseup', 'mouseover', 'mousemove', 'dblclick']);
        this.statusManager.addStatus('select', selectStatus); // 选择状态
        this.statusManager.addStatus('text', textStatus); // 文本状态
    }

    setBackground(color = 'yellow') {
        console.log(color);
        this.attributes.bgCtx.rect(0, 0, WIDTH, HEIGHT);
        this.attributes.bgCtx.fillStyle = color;
        this.attributes.bgCtx.fill();
    }

    observeToolBar() {
        _.delegate(this.attributes.toolBar, 'span', 'click', (e) => {

            let format = e.target.getAttribute('data-text-format');
            if(format) {       
                let cur = this.statusManager.eventValues.target;
                if (!cur) return;
                let { fontBold, fontItalic } = cur.component.attrs;
                fontBold = fontBold ? '' : 'bold';
                fontItalic = fontItalic ? '' : 'italic';
                switch(format) {
                    case 'bold': cur.component.setAttr({
                        fontBold
                    });break;
                    case 'italic': cur.component.setAttr({
                        fontItalic
                    });break;
                }
                return;
            }

            let status = e.target.getAttribute('data-type');
            status || (status = 'select');
            switch (status) {
                case 'text':
                    this.attributes.cpCanvas.style.cursor = 'crosshair';
                    break;
                case 'image':
                    imageModal.show(this);
                    return;
                default:
                    this.attributes.cpCanvas.style.cursor = 'default';
            }
            this.attributes.status = status;
            this.statusManager.setStatus(status);
        });

        _.delegate(this.attributes.toolBar, 'select', 'change', (e) => {
            console.log(e.target.value);
            console.log(e.target.name);

            let cur = this.statusManager.eventValues.target;

            if (!cur) return;

            let type = e.target.name,
                value = e.target.value;

            switch (type) {
                case 'fontSize':
                    cur.component.setAttr({
                        fontSize: value
                    });
                    break;
                case 'fontFamily':
                    cur.component.setAttr({
                        fontFamily: value
                    });
                    break;
            }
        });

        _.on('input[name="fontColor"]', 'change', (e) => {
            e.target.click();
            console.log(e.target.value);
            let color = e.target.value,
                cur = this.statusManager.eventValues.target;

            if (!cur) return;

            cur.component.setAttr({
                color
            });

        })
    }

    initToolBar() {

        function createOption(name, value) {
            let o = document.createElement('option');
            o.value = value;
            o.textContent = name;
            return o;
        }

        // 初始化文字大小选项
        let fontSize = document.querySelector('select[name="fontSize"]');
        const SIZE_MIN = 5,
            SIZE_MAX = 80;
        for (let i = SIZE_MIN; i <= SIZE_MAX; ++i) {
            fontSize.appendChild(createOption(i + 'px', i + 'px'));
        }
        
        // 初始化文字字体选项
        let fontFamily = document.querySelector('select[name="fontFamily"]'),
            dict = font_family;
        for(let fontName in dict) {
            fontFamily.appendChild(createOption(fontName,dict[fontName]));
        }

        

    }
}

export default WebNote;