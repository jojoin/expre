/**
 * 流程控制
 */



/**
 * 顺序 流式
 * callback(item, callback(err, data))
 */
exports.flow = function(items, itemclbk, endclbk){
    var len = items.length
      , i = 0
      , endata = [];
    if(!len){
        return endclbk(null, endata);
    }
    // 执行单步
    function step(){
        if(i==len)
            return endclbk(null, endata); // 结束流
        // 客户代码
        itemclbk(items[i], itend, {
            index: i
        });
    };
    // 单步完成
    function itend(err, data){
        if(err)
            return endclbk(err, endata); // 结束流
        // 装配数据
        endata.push(data);
        i++;
        step();
    }
    // 开始
    step();
}



/**
 * 并发
 */
exports.multi = function(items, itemclbk, endclbk){
    var len = items.length
      , finish = 0
      , endata = [];
    if(!len){
        return endclbk(null, endata);
    }
    // 并发执行
    for(var i in items){
        step(i);
    }
    // 执行单步
    function step(i){
        // 客户代码
        itemclbk(items[i], function(err, data){
            if(err)
                return endclbk(err, endata); // 错误终止
            // 装配数据
            endata[i] = data;
            finish++;
            if(finish==len)
                endclbk(null, endata); // 成功结束
        }, {
            index: i
        });
    };
}


