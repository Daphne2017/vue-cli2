// 扁平化数组
(function(){
    var arr = [1,2,4,5,6,[7,8,9],[10,11,12,13],[14]];
    // 1、使用reduce方法
    (function(arr){
        var flatArrFun = ((arr)=>{

            var reducer = ((all,current)=>{
                if(current instanceof Array){
                    return all.concat(flatArrFun(current))
                }
                return all.concat(current)
            })
            return arr.reduce(reducer,[])

        })
        let flatArr = flatArrFun(arr)
        console.log("flatArr",flatArr)
    })(arr);
    // 2.使用数组的flat方法
    (function(arr){
        let flatArr = arr.flat(Infinity);
        console.log("flatArr1",flatArr)
    })(arr);
})()