import _ from './utils/utils'

class DomObserver {

    constructor(cp,st) {
        this.observerList = {}
        this.componentStack = cp;
        this.statusManager = st;
        this.init();
    }

    init() {
        // 字体面板
        this.observe('fontPanel','ul.fontControl',{
            'click': function(e) {
                let target = e.target;
                if(target.tagName.toLowerCase() === 'button') {
                    let cur = this.statusManager.eventValues.target;
                    let { fontBold, fontItalic } = cur.component.attrs;
                    switch(target.name) {
                        case 'fontBold':
                        fontBold = fontBold ? '' : 'bold';
                        cur.component.setAttr({fontBold});
                        break;
                        case 'fontItalic':
                        fontItalic = fontItalic ? '' : 'italic';
                        cur.component.setAttr({fontItalic});
                        break;
                    }
                }
            },
            'change': function(e) {
                let target = e.target;
                if(target.tagName.toLowerCase() === 'select') {
                    let cur = this.statusManager.eventValues.target;

                    if(!cur) return;
    
                    let value = e.target.value;

                    switch(target.name) {
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
                }

                if(target.tagName.toLowerCase() === 'input') {
                    e.target.click();
                    let color = e.target.value,
                        cur = this.statusManager.eventValues.target;
            
                    if (!cur) return;
            
                    cur.component.setAttr({
                        color
                    });
                }
            },
        });

        // 图片面板
        this.observe('imagePanel','ul.imageControl',{
            'change': function(e) {
                if(e.target.tagName.toLowerCase() === 'input') {

                    let val = e.target.value,
                        cur = this.statusManager.eventValues.target;

                    if(!cur || !val) return;

                    switch(e.target.name) {
                        case 'imageHeight':
                        cur.component.setAttr({
                            height: val
                        });
                        break;
                        case 'imageHeight':
                        cur.component.setAttr({
                            width: val
                        });
                        break;
                    }

                }
            }
        })

        // 总面板
        this.observe('detailPanel','div.detailPanel',{
            'dblclick': function(e) {
                // 删除组件
                let target = e.target;
                if(target.tagName.toLowerCase() === 'button' && target.name === 'remove') {
                    let cur = this.statusManager.eventValues.target;

                    if(!cur) return;

                    this.componentStack.remove(cur.component);
                    this.statusManager.eventValues.target = null;
                    this.componentStack.render();
                }
            }
        });
    }

    observe(name, elem, handlers) {
        if(!name||!elem||!handlers) return;
        if(typeof elem === 'string') {
            elem = document.querySelector(elem);
        }
        for(let ev in handlers) {
            handlers[ev] = handlers[ev].bind(this);
            _.on(elem,ev,handlers[ev]);
        }
        this.observerList[name] = {
            el: elem,
            handlers: handlers
        };
    }

    un(name, elem, handlers) {
        if(!name||!elem||!handlers) return;
        if(typeof elem === 'string') {
            elem = document.querySelector(elem);
        }
        for(let ev in handlers) {
            _.un(elem, ev, this.observerList[name].handlers[ev]);
        }
    }
}



export default DomObserver;