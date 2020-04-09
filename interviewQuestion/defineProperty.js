var obj = {
    yys:"yys",
    arr: [0,1,23,]
}
Object.defineProperty(obj.arr,'0',{
    get:function(q){
        console.log("111")
        console.log("111",q)
        return q
    },
    set:function(){
        console.log("222222")
    }
})
obj.arr[1] =1000