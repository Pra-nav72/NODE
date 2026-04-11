function greet(name:string):string{
    return `hello ${name}, lets learn some TypeScript...`;
}

let username: string = "Pranav";

console.log(greet(username));

let name: number[];
let newName: number[] = [];

name = [33, 45, 56, 45];

name.forEach((x) =>{
    newName.push(x*2);
});
console.log(newName);
