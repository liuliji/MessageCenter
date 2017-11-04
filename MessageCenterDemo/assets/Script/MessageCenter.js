
/************************************************************************
 * Copyright (c) 2017 App
 * Author    : liji.liu
 * Mail        : liuliji1184899343@163.com
 * Date        : 2017-11-04
 * Use      : 消息中心
 ************************************************************************/

var bindFuncList = [];// 保存监听函数
/**
 * bindFuncList结构如下
 * [
 * 'event1':[func1,func2],
 * 'event2',[func3,func4]
 * ]
 */
/**
 * 当暂时没有监听，或者场景没有初始化的时候，会将提前收到的消息和数据，
 * 保存到emitList中，结构如下：
 * [
 * 'event1':[args1,args2],
 * 'event2':[args3,args4];
 * ]
 */
var emitList = [];
/**
 * 设置监听
 * @param {监听的事件的名字} key 
 * @param {监听的回调方法} cbFunc 
 */
// 设置事件监听
function on(key,cbFunc){
    if (bindFuncList[key]){
        bindFuncList[key].push(cbFunc);
    }else {
        var ary = new Array();
        ary.push(cbFunc);
        bindFuncList[key] = ary;
    }
}
/**
 * 触发事件监听函数
 * @param {监听的事件的名字} key 
 * @param {调用时传的参数} args 
 */
// emit事件，发送消息
function emit(key,args){
    var ary = bindFuncList[key];
    if(ary){// 如果已经注册了事件，就直接发送消息
        for (var i in ary) {
            if (ary.hasOwnProperty(i)) {
                try {
                    ary[i].call(this,args);
                } catch (error) {
                    
                }
            }
        }
    }else {// 没有注册，先将要发送的消息保存，然后等待事件注册后，再一起emit
        if (emitList[key]){
            emitList[key].push(args);
        }else {
            var ary = new Array();
            ary.push(args);
            emitList[key] = ary;
        }
    }
}
// emitAll，将所有消息都emit
function emitAll(){
    for (var key in emitList) {
        if (emitList.hasOwnProperty(key)) {
            var emitAry = emitList[key];
            for (var j in emitAry) {
                if (emitAry.hasOwnProperty(j)) {
                    var args = emitAry[j];// 去除参数
                    var ary = bindFuncList[key];// 去除监听的方法
                    // 开始执行事件
                    for (var iterator in ary) {
                        if (ary.hasOwnProperty(iterator)) {
                            try {
                                ary[iterator].call(this,args);
                            } catch (error) {

                            }
                        }
                    }
                    
                }
            }
        }
    }
    emitList = [];
}

// 清空全部的事件监听
function popAll(){
    bindFuncList = [];
}

module.exports = {
    'on': on,// 设置事件监听
    'emit': emit,// emit事件，发送消息
    'emitAll': emitAll,// emitAll，将所有消息都emit
    'popAll': popAll,// 清空全部的事件监听
}

