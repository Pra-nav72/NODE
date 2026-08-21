const { validateToken } = require("../utils/auth");

function checkForAuthenticationCookie(cookieName){
    return(req, res, next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
          return next();  
        } 

        try{
            const payload = validateToken(tokenCookieValue);
            req.user = payload;
        }
        catch(error){}
            
        return next();
    
    }

}

function requireAuthentication(req, res, next) {
    if (!req.user) {
        return res.redirect('/user/signin');
    }

    return next();
}

module.exports = {checkForAuthenticationCookie, requireAuthentication, };