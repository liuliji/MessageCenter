var MessageCenter = require('MessageCenter');
const color1 = cc.color(104, 70, 10);
const color2 = cc.color(255, 51, 0);

cc.Class({
    extends: cc.Component,

    properties: {
        bgSprite: cc.Sprite,// 背景
    },

    // use this for initialization
    onLoad: function () {
        MessageCenter.on('changeBg',this.changeBg.bind(this));
    },
    // 改变背景颜色 
    changeBg: function(args){
        var newColor;
        switch(args){
            case 1:{
                newColor = color1;
            }break;
            case 2:{
                newColor = color2;
            }break;
        }
        this.bgSprite.node.setColor(newColor);
    },
    // called every frame
    update: function (dt) {

    },
});
