       import './css/main.scss';

       import Text from './js/components/text';
       import Stack from './js/componentStack';
       import StatusHandler from './js/statusHandler';
       import EventListener from './js/eventListener';
       const WIDTH = 900,
           HEIGHT = 550;

       var container = document.querySelector('.container');
       var canvas = document.querySelector('#canvas');
       canvas.width = WIDTH;
       canvas.height = HEIGHT;
       var ctx = canvas.getContext('2d');

       var st = new Stack(ctx, {
           width: WIDTH,
           height: HEIGHT
       });

       var statusHandler = new StatusHandler(canvas, ctx, st),
           sh = statusHandler;

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

       var eventListener = new EventListener();
       eventListener.on('canvas_down', canvas, 'mousedown', function (e) {
           sh.fn[sh.status].blur();

           this.mouseX = e.layerX;
           this.mouseY = e.layerY;

           sh.fn[sh.status].select(this.mouseX, this.mouseY) && (this.isMove = true);
       });

       eventListener.on('canvas_move', canvas, 'mousemove', function (e) {
           if (!this.isMove) return;
           let deltaX = e.layerX - this.mouseX,
               deltaY = e.layerY - this.mouseY;

           sh.fn[sh.status].move(deltaX, deltaY);

           this.mouseX = e.layerX;
           this.mouseY = e.layerY;
       });

       eventListener.on('canvas_up', canvas, 'mouseup', function (e) {
           this.isMove = false;
       });

       var toolbar = document.querySelector('.toolbar');
       eventListener.delegate('toolbar_click', toolbar, 'span', 'click', function (e) {
           let status = e.target.getAttribute('data-type');
           console.log(status);
           sh.status = status;
           sh.fn[sh.status].init();
       });