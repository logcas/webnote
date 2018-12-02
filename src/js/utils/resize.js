import { deflate } from "zlib";

const resizeHook = {
    'top-left': function (attrs, deltaX, deltaY) {
        return {
            x: attrs.x + deltaX,
            y: attrs.y + deltaY,
            width: attrs.width - deltaX,
            height: attrs.height - deltaY
        }
    },
    'bottom-left': function (attrs, deltaX, deltaY) {
        return {
            x: attrs.x + deltaX,
            width: attrs.width - deltaX,
            height: attrs.height + deltaY
        }
    },
    'top-right': function (attrs, deltaX, deltaY) {
        return {
            y: attrs.y + deltaY,
            width: attrs.width + deltaX,
            height: attrs.height - deltaY
        }
    },
    'bottom-right': function (attrs, deltaX, deltaY) {
        return {
            width: attrs.width + deltaX,
            height: attrs.height + deltaY
        }
    }
};

export default resizeHook;