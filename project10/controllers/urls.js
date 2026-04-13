const id = require("short-id");
const URL = require("../models/urls");

async function handleGenerateUrl(req, res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error: "url required!"});
    }
   const shortId = await URL.create({
        shortId : id.generate(),
        redirectUrl: body.url,
        visitHistory: []
    });
    return res.status(201).json({Id: shortId.shortId});
}

module.exports = {handleGenerateUrl};