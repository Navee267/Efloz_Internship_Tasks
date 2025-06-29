
// Intership Day 1 Tasks 

// Task 1
// How to count how many times a letter appears in a string ?
// input const str = "hello world";

//Method 1
const str  = "Hello world";
const letter = 'l';
let count = 0;
for(i=0;i<str.length;i++){
    if(str.charAt(i)==letter){
        count +=1;
    }
}

console.log( `letter ${letter} - `,count);

//Method 2 using Map()
const map = new Map();

for(i=0;i<str.length;i++){
    if(map.has(str.charAt(i))){
        map.set(str.charAt(i),map.get(str.charAt(i))+1)
    }
    else{
        map.set(str.charAt(i),1)
    }
}

console.log(map);

// Task 2 
// How to capitalize the first letter of a string?
// input : const str = "javascript"

let str2 = "javascript";

console.log(`From ${str2} To Capitalized`,str2[0].toUpperCase() + str2.slice(1).toLowerCase());

// Task3
// How do you check if a string ends with a specific word?
// const str = "index.html";
// console.log(str.endsWith(".html"))  

const str3 = "index.html";
const word = ".html";
console.log(str3.endsWith(word) ? `Yes is Ends With ${word}` : `No ,Its Not Ends With ${word}`)

// Task 4
// How to reverse a string?

// input :  const str = "hello";
// Method : Split → Reverse → Join

//Method 1
const str4 = "hello"
const arr = str4.split('');
const res = arr.reverse().join('');
console.log("Method 1 :" ,res);

//Method 2
let res2 = '';
for(i=str4.length-1;i>=0;i--){
    res2 += str4.charAt(i);
}

console.log("Method 2 :",res2);

// Task 5 
// Get File Extension
// const fileName = "report.pdf";  
// Output: "pdf"

const fileName = "report.pdf";  
const index = fileName.indexOf('.');
console.log( "the extension of the file is",fileName.slice(index));