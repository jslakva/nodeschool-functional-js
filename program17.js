/*
function curryX(fn, n=fn.length) {
  return function(one){
    return function(two){
      return function (three) {
        return fn(one, two, three);
      }
    }
  }
}
*/

// see how this works into deep
/*
function curry1(fn){
  return function(x){
    return function (y, z, t) {
      return fn(x, y, z, t);
    }
  }
}
 */
// ...into more deep
/*
function curry2(fn) {
  return function(x) {
    return function(y) {
      return function (z, t) {
        return fn(x,y,z,t);
      }
    }
  }
}
 */
// ...find out that in recursion we can't refer to closured args with different names like x y z, lets keep everything under single name
/*
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
 */

// ...find out that in recursion we can't refer to closured args with different names like x y z, lets keep everything under single name
/*
function curry3x(fn){
  let args=[];
  return function(x) { // x
    args.push(x);
    return function(x) { // y
      args.push(x);
      return function(x) { // z
        args.push(x);
        return function (t) {
          return fn(...args, t);
        }
      }
    }
  }
}
 */
// this is too much. sample provided only did recursion for arity-1 times; this makes a thunk for 4 args, rather 4th arg
// being an actual function application
/*
function curry4x(fn) {
  let args=[];
  return function(x) { // x
    args.push(x);
    return function (x) { // y
      args.push(x);
      return function (x) { // z
        args.push(x);
        return function (x) { // t
          args.push(x);
          return function() {
            return fn(...args);
          }
        }
      }
    }
  }
}
 */

//...now we should be able to transfer to recursive version - taking 3x version for 4-arity fn
//...ruled out - "global" context of args array makes intermediate functions interdependent/non-reenterable.
// therefore failed verification with compilation error
function curryN_(fn, n=fn.length) {
  //now could check if fn is function or not and make this into single function, but readability would suffer
  let args = [];

  function reCurry(...arg) {
    if (args.length+1 < n) {
      args.push(arg[0]);
      return function(...arg){
        return reCurry(...arg);
      }
    }
    else {
      return fn(...args, ...arg);
    }
  }

  return reCurry;
}

function curryN(fn, n=fn.length) {

  function reCurry(argList) {
    if (argList.length < n-1) {
      return function (argToFix) {
        return reCurry(argList.concat([argToFix]));
      }
    } else {
      return function(...args) {
        return fn(...argList, ...args);
      }
    }
  }

  return reCurry([]);
}


//let c = curryN(fx);
//let cx = c(1);
//let cxx = cx(2);
//let cxxx = cxx(3);
//let cxxxx = cxxx(4);


 //cxx = cx(5);
 //cxxx = cxx(3);
//cxxxx = cxxx(4);

 //console.log(cxxxx);

 //let d = curryN(fx, 2);
 //let dx = d(1);
 //console.log(d);
 //let dxx = dx(2,3,4);
 //console.log(dxx);


//let cxxx = cxx(3);
//let cxxxx = cxxx(4);
//let cxxxxx = cxxxx(5);


//function z(...localargs){
//  console.log(localargs);
//}

//z(1, 2, 5);

//function fx(x,y,z,t){
//  return x*1000+y*100+z*10+t;
//}

//let fxx = curry2x(fx);
//let fxxx = fxx(1);
//let fxxxx = fxxx(2);
//let res = fxxxx(3,4);

//console.log(res);

//let h = curry3x(fx);
//let hx = h(1);
//let hxx = hx(2);
//let hxxx = hxx(3);
//let hxxxx = hxxx(4);
//console.log(hxxxx);

//let g = curry4x(fx);
//console.log(g(1)(2)(3)(4)());


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