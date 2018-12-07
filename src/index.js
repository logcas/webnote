import './css/main.scss';

import _ from './js/utils/utils';
import WebNode from './js/webnote';

import config from './config/common';

const WIDTH = config.WIDTH,
    HEIGHT = config.HEIGHT;

const canvas = document.querySelector('#canvas'),
      bgCanvas = document.querySelector('#bg-canvas');
canvas.width = bgCanvas.width = WIDTH;
canvas.height = bgCanvas.height = HEIGHT;

const app = new WebNode({
    bgCanvas: bgCanvas,
    cpCanvas: canvas,
    bgCtx: bgCanvas.getContext('2d'),
    cpCtx: canvas.getContext('2d'),
    toolBar: document.querySelector('.toolbar'),
    fontFormat: {
        fontSize: document.querySelector('.toolbar select[name="fontSize"]')
    }
});