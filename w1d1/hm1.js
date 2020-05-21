Array.prototype.even = function(){
  return this.filter(el=>el % 2 == 0)
}

Array.prototype.odd = function(){
  return this.filter(el=>el % 2 != 0)
}

let a = [1,2,3,4,5,6,7,8]
console.log(a.even());
console.log(a.odd());


setTimeout(()=>{console.log("timeout")}, 1000);
setImmediate(()=>{console.log("immediate")});