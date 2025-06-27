

//Day 2
//Tasks 
//Task 1
// Star Pattern using for loop

console.log("Method 1");

const value = 5;
for(i=0;i<value;i++){
    let val = '';
    for(j=0;j<i;j++){
        val = val + " *";
    }
    console.log(val);
}

console.log("Method 2");

for(i=value-1;i>=0;i--){
    let val = '';
    for(j=0;j<i;j++){
        val = val + " *";
    }
    console.log(val);
}

console.log("Method 3");

const center = Math.floor(value /2);
// console.log(center);
for(i=0;i<value;i++){
    let val = '';
    let min = center-1>0 ? center-i : -1;
    let max = center+i<value ? center+i : -1;
        for(j=0;j<value;j++){
            if(j==center || j==min || j==max ){
                val = val + ' *';
            }
            else if(min && max ==-1){
                break
            }
            else{
                val = val + '  '
            }
        }
        console.log(val);
}

// Task2
//Without using flat method merge the 2D array

let arr = [[1,2],[3,4],[6,7]]
let newArr =[];
let index=0;
for(i=0;i<arr.length;i++){
    for(j=0;j<arr[i].length;j++){
        newArr[index++] = arr[i][j];
    }
}

console.log(newArr);

//map method  --> it returns a new array

const newArr2 = newArr.map((val,index)=>{
    console.log(val);
    return val + index
})

console.log( "using map method" ,newArr2);

//forEach method --> it returns undefined so we only use the forEach for the iterating purpose

let num = '';
newArr.forEach((val,index)=>{
    console.log(val+2);
    num += val +2;
})

console.log("using forEach method",num);

//find method --> it returns the val not an array 

let usingFind = newArr.find((val,index)=>{
    if(val%2==0){
        return index
    }
})

console.log("using find method",usingFind);

//filter method --> but it returns the array not value

let usingFilter = newArr.filter((num,index)=>{
    return num > 4
})

console.log("using filter method",usingFilter);

//reduce method --> it also returns the value not the array

let usingReduce = newArr.reduce((a,b)=>{
    return a+b
})

console.log("using reduce method",usingReduce);

//Some method --> its like a or operation || 

console.log(newArr);

console.log("using some method",newArr.some((val,index)=>{
    return val > 2
}));

//Every method --> its like a and operation

console.log("using every method",newArr.every((val,index)=>{
    return val > 2
}));

// using spread operator --> it is used to merge the array using ...
console.log('using spread operator');

let arr1 = ['naveen','kumar']
let arr2 = ['hey','you']
const fullarr = [...arr1,...arr2]
const [a,b, ...rest] = fullarr
console.log(fullarr);
console.log(a , b, rest);
console.log(...arr1,...arr2);