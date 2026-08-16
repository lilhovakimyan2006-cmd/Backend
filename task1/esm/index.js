import {add, sub, mul} from "./utils/math.js"

import string from "./utils/strings.js"

console.log(add(5, 7));
console.log(sub(8, 1));
console.log(mul(2, 5));

console.log(string("hello"));
console.log(string("json"));

//import.meta.url gives us the current module's file URL because __filename does not exist in ESM
console.log(import.meta.url)