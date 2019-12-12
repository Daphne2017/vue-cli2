(function(){
    var arr = [1,2,4,5,6,78,45,123,785,908];
    // 1、假设法，求最小同理
    (function(arr){
        let max = arr[0];
        for (const num of arr) {
            max = num > max ? num :null;
        }
        console.log("max",max)
    })(arr);
    // 2.使用sort()函数排序，求最小值同理
    (function(arr){
        arr.sort((a,b)=>{
            return a-b;
        })
        let max = arr[arr.length-1];
        console.log("max1",max)
    })(arr);
    (function(arr){
       let max = Math.max(...arr);
       let min = Math.min(...arr);
       console.log("max2",max)
       console.log("min",min)
    })(arr);
    
})()