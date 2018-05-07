let friendsData = require("../data/friends.js")

module.exports = function (app) {
    app.get("/api/friends", function(req, res){
        res.json(friendsData);
    })

    app.post("/api/friends", function(req, res){
        
        // get the current user scores
        let currentUserScores = req.body.scores;
        // Parse the scores to integers
        currentUserScores = currentUserScores.map(number => parseInt(number))
        console.log(currentUserScores);
        console.log(friendsData.length);
        console.log("before", friendsData);
        friendsData.push(req.body);

        console.log("after", friendsData);
    })
};