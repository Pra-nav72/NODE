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

async function handleRedirectUrl(req, res) {
    const newId = req.params.url;
    const entry = await URL.findOneAndUpdate(
        {shortId:newId}, 
        {$push: 
            {visitHistory : {timestamp: new Date().toISOString()}}
        }
    );
    
    res.redirect(entry.redirectUrl);  
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.url;

    const entry = await URL.findOne({shortId});
    
    return res.status(200)
    .json(
        {
            totalClicks: entry.visitHistory.length,
            visitData: entry.visitHistory
        } 
    );
}

module.exports = {
    handleGenerateUrl,
    handleRedirectUrl,    
    handleGetAnalytics,
};