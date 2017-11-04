var MessageCenter = require('MessageCenter');
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {

    },
    onButton: function(Object,value){
        value = parseInt(value);
        MessageCenter.emit('changeBg',value);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
