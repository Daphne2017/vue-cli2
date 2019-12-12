(function(){
    var classArr = {
        0:"100",
        1:"200",
        2:"300",
        3:"400",
        length:4
    };
    (function(classArr){
        let arr = Array.from(classArr)
        console.log("arr",arr)
    })(classArr);

    (function(classArr){
        classArr.symbol
        let arr =[...classArr]  ????
        console.log("arr",arr)
    })(classArr);

})()