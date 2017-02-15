let square = x => x * x;
let add = (a, b) => a + b;

console.log(square(5)); // 25
console.log(add(3, 4)); // 7
console.log(pi()); // 3.1415

var squareEs5 = function(x) { return x * x; };
var add = function(a, b) { return a + b; };

console.log(square(3)); // 9
console.log(add(3, 10)); // 13
