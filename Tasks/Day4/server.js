
// Day 4 of Practice Node js
// Node js is an run time environment 
//File Handling in Node js 

const http = require('http')
const fs = require('fs').promises

// http.createServer()

const writeFile = async ()=>{
    try{
        await fs.writeFile('newFile.txt','naveen naveen','utf8')
        const data = {name:'naveen',age:'20'}
        await fs.writeFile('newFile.json',JSON.stringify(data),'utf8')
    }
    catch(err){
        console.log("err",err);
    }
}

const appendFile = async ()=>{
    try{
        const data = await fs.appendFile('newFile.txt','hey bro what can i do ','utf-8')
        console.log('file append successfully');
    }
    catch(err){
        console.log('err',err);
    }
}

const readFile = async ()=>{
    try{
       const data =  await fs.readFile('newFile.txt','utf-8')
            console.log(data);
    }
    catch(err){
        console.log('err',err);
    }
    finally{
        console.log('file readed successfully');
    }
}

writeFile();
appendFile();
readFile();