function plane(kind: string | number):string{
    if(typeof kind === 'string'){
        // here we add split bcoz its a string type
        return `${kind.split} flying`;
    }
    // here we add toLocalString() bcoz its a number type
    return kind.toLocaleString();  
}

// if we don't know, plane argument will be given or not
function isRunning(plane?: string){
    if(plane){
        return plane + " is in running condition";
    }
    return 'the plane may not be in running condition'; 
}

isRunning(); // calling without argument