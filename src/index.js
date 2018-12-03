import './css/main.scss';

import Text from './js/components/text';
import Stack from './js/componentStack';
import StatusManager from './js/status';
import _ from './js/utils/utils';

const WIDTH = 900,
    HEIGHT = 550;

const canvas = document.querySelector('#canvas'),
      bgCanvas = document.querySelector('#bg-canvas');
canvas.width = bgCanvas.width = WIDTH;
canvas.height = bgCanvas.height = HEIGHT;
const ctx = canvas.getContext('2d'),
      bgctx = bgCanvas.getContext('2d');
      
bgctx.rect(0,0,WIDTH,HEIGHT);
bgctx.fillStyle = 'yellow';
bgctx.fill();

const st = new Stack(ctx, {
    width: WIDTH,
    height: HEIGHT
});

st.add(new Text({
    x: 50,
    y: 50,
    width: 200,
    height: 50,
    text: 'Hello,world'
}, st));

st.add(new Text({
    x: 200,
    y: 200,
    width: 200,
    height: 50,
    text: 'Hello!!',
    fontSize: '20px'
}, st));

st.render();

const statusManager = new StatusManager(canvas, st),
    sm = statusManager;

sm.setEvent(['mousedown', 'mouseup', 'mouseover', 'mousemove', 'dblclick']);

// * 读取状态文件
import selectStatus from './js/status/select';
import textStatus from './js/status/text';

// 选择状态
sm.addStatus('select', selectStatus);
// 插入文本状态
sm.addStatus('text', textStatus);

_.delegate('.toolbar', 'span', 'click', function(e) {
    let status = e.target.getAttribute('data-type');
    sm.setStatus(status);
    console.log(status);
});