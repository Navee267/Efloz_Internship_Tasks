
// //Day 3
// //Tasks

let a=[1,2,3,4,5]
let b=[2,3,4,1,5]

let every = a.every((val,index)=>{
    return b.includes(val)
})

console.log(every);

let x = [1,2,3,1,4,2,5,4,3,2,1,5]

let out = x.reduce((acc,item)=>{
    acc[item]= (acc[item] || 0)+1
    return acc
},{})


console.log(out);


// //Find Pairs with target sum

let arr = [1,3,2,2,4,0,5]
let target = 4;

let res = [];
let idx = 0;

for(i=0;i<arr.length;i++){
    for(j=0;j<i;j++){
        if(arr[i]+arr[j]==target){
            val =  [arr[i],arr[j]]
            res[idx] = val;
            idx=idx+1;
        }
    }
}

console.log(res);

// // Count how many times each character appears in a string.
const Input =  "interview"

// Output: { i: 2, n: 1, t: 1, e: 2, r: 1, v: 1, w: 1 }

const response = Input.split('').reduce((acc,curr)=>{
    acc[curr] = (acc[curr] || 0)+1
    return acc
},{})

console.log(response);

// //Task 1
// //Write a function to check if a string is a palindrome

const str = 'amma'

const palindrome = (val)=>{
    reverse = val.split('').reverse().join("")
    result = reverse == val ? 1:0
    return result==1 ? true : false
}

console.log(palindrome(str));


// //Task 2 
// //Write a function to generate n Fibonacci numbers

const Fibonacci = (n)=>{
    let y = [0,1]
    for(i=2;i<=n;i++){
        y[i] = y[i-1] + y[i-2]
    }
    return y
}

console.log(Fibonacci(8));

// //Task 3
// //Flatten a nested array

let input = [1,[2,[3,[4]],5]]
// let input = [[1,2],[3,4],[5,6]]

const repeat = (arr)=>{
    let output=[]
    arr.forEach(element => {
        if(Array.isArray(element)) {
            output = output.concat(repeat(element))
        }
        else{
            output.push(element);
        }
    });
    return output;
}

console.log(repeat(input));

// //Task 4
// //Write a function that returns the longest word in a given sentence.

const sentence = 'hello bro iam naveenkumar who are you'

let max = '';
sentence.split(' ').forEach((item)=>{
    if(max.length < item.length){
        max = item;
    }
})

console.log(max);

// //Task 5 
// //Write a function to check if a number is prime.

const number = 3;

const primeOrNot = (val)=>{
    let count=0;
    for(i=1;i<=val;i++){
        if(val %i==0){
            count ++;
        }
    }
    console.log(count);
    return count==2 ? 'prime number ' : 'not a prime number';
}

console.log(primeOrNot(number));

// //Task 6
// // Write a function that takes an array of numbers and returns their sum.

let numArr = [1,2,3,4,5,6,7,8,9,10,11]

let sum = numArr.reduce((acc,curr)=>{
    return acc + curr 
})

console.log(sum);

// //Task 7
// //Write a function that logs numbers 1, 2, 3 with a 1-second delay between each.
for(let i=0;i<4;i++){
    setTimeout(()=>{
        console.log(i);
    },i*1000 )
}


//Task 8 

//Fetch JSON data from a fake API and log the title.

const data = async ()=>{
    try{
        const res = await fetch('https://fakerapi.it/api/v2/users?_quantity=2&_gender=male')
        const dt = await res.json()
        console.log(dt.data[0].firstname );
    }
    catch(err){
        console.log(err);
    }
}

// console.log(data);
data()