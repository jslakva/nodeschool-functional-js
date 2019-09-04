
function curryX(fn, n=fn.length) {
  return function(one){
    return function(two){
      return function (three) {
        return fn(one, two, three);
      }
    }
  }
}

function curryNX(fn, n, x){

}
// see how this works into deep
function curry1(fn){
  return function(x){
    return function (y, z, t) {
      return fn(x, y, z, t);
    }
  }
}
// ...into more deep
function curry2(fn) {
  return function(x) {
    return function(y) {
      return function (z, t) {
        return fn(x,y,z,t);
      }
    }
  }
}
// ...find out that in recursion we can't refer to closured args with different names like x y z, lets keep everything under single name
function curry2x(fn){
  let args=[];
  return function(x) { // x
    args.push(x);
    return function(x){ // y
      args.push(x);
      return function (z,t) {
        return fn(...args, z, t);
      }
    }
  }
}
//...now we should be able to transfer to recursive version


function fx(x,y,z,t){
  return x*1000+y*100+z*10+t;
}

let fxx = curry2x(fx);
let fxxx = fxx(1);
let fxxxx = fxxx(2);
let res = fxxxx(3,4);

console.log(res);

function curryN(fn, n=fn.length) {

  /*
  return function(one){
    return function(two){
      return function (three) {
        return fn(one, two, three);
      }
    }
  }
   */
}

module.exports = curryN

function add3(one, two, three) {
  return one + two + three
}

//var curryC = curryN(add3)
//var curryB = curryC(1)
//var curryA = curryB(2)
//console.log(curryA(3)) // => 6
//console.log(curryA(10)) // => 13

//console.log(curryN(add3)(1)(2)(3)) // => 6

//var curry1f = curry1(add3);
//console.log(curry1f(1)(2,3));