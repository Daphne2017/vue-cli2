// 关于js的继承？你有几种方法？

// 1、构造函数+call()/apply(),在子类中，既然是需要获取父类的私有属性，则可以使用call和apply，当调用父类的方法的时候，
// 改变当前上下文为子类对象，则子类对象就可以获取到了父类的所有私有属性。
// 缺点：无法访问父类中的公开方法和属性(prototype中的方法)
/* 
(function(){
    function Father(){
        this.name = "严正强";
        this.age = "55";
        this.sayHello = function (){
            console.log("helloWorld");
        }
    }
    Father.prototype.eatFood = function(){
        console.log("eatApple");
    }

    function Child(){
        this.childName = "yys";
        this.childAge = "25";
        this.name = "严燕姗";
        this.age = "25";
        Father.call(this)
    }
    var child = new Child();
    console.log("child",child);
    console.log("child.eatFood",child.eatFood())

})() 
*/
/*
2.类似继承，继承方式是通过对子类的prototype.__proto__引用父类的prototype，
从而可以让子类访问父类中的私有方法和公有方法 
缺点：类式继承会有两方面的缺点

引用陷阱-子类对象可以随意修改父类中的方法和变量，并影响其他子类对象
dog1.types.push('fish')
console.log(dog1.types) // ["cat", "dog", "fish"]
console.log(dog2.types) // ["cat", "dog", "fish"]

无法初始化构造不同的实例属性
这个主要是由于类式继承，是通过Dog.prototype = new Animal('animal')实现的，
我们只会调用一次父类的构造函数。所以只能在子类中从写父类的属性，如上的name属性，
在子类中需要重写一次。
*/
(function(){
    function Father(){
        this.name = "严正强";
        this.age = "55";
        this.type = [1,2,3,4]

        this.sayHello = function (){
            console.log("helloWorld");
        }
    }
    Father.prototype.eatFood = function(){
        console.log("eatApple");
    }

    function Child(){
        this.childName = "yys";
        this.childAge = "25";
    }
    Child.prototype = new Father();
    /*  
   (因为new Father().__proto__ = Father.prototype,
    所以：Child.prototype.__proto__ = Father.prototype) 
    */
    var child = new Child();
    console.log("child",child);
    child.age = 100;
    child.sayHello = function(){
        console.log("helloWorldChild")
    }
    child.type.push(5);
    console.log("child",child);
    var child1 = new Child();
    console.log("child1",child1);
    console.log("child1.age",child1.age);
    console.log("child1.type",child1.type);
    console.log("child.eatFood",child.eatFood())

})();
// 与之类似
(function () {
    var obj = {
      id: 'yys',
      name: '严燕姗',
      parents: {
        id: 'luo',
        name: '罗秀宁'
      }
    }
    let copyObj = Object.create(obj)
    copyObj.age = 26
    copyObj.parents.age = 55
    console.log('原始对象', obj)
    console.log('新对象', copyObj);
    let copyObj1 = Object.create(obj)
    console.log('新对象1.parents', copyObj.parents);
  })()


