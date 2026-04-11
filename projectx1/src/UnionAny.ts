// we can give custom data types as a union, select b/w these 3 only
let apiRequestStatus: 'pending' | 'successful' | 'error' = "successful";

// here no need to tell data type to compiler EVER 
let request: any;
request = 45;
request = "commit";

// means we currently don't know but will eventually know, [it is safe, should use more]
let apiCall: unknown;

apiCall = "coming";