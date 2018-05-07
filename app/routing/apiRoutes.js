let friendsData = require("../data/friends.js")

module.exports = function (app) {
    app.get("/api/friends", function(req, res){
        res.json(friendsData);
    })

    app.post("/api/friends", function(req, res){

        // Create array to store the total differences between the current user
        // and items in the friends array
        arrayDifferences = [];
        
        // get the current user's scores
        let currentUserScores = req.body.scores;
        // Parse each element in the array to an interger
        currentUserScores = currentUserScores.map(number => parseInt(number))
        console.log("current", currentUserScores);
        
        // Loop through each friend in the api friends array
        friendsData.forEach(friend => {
            // Parse elements to integers
            let friendScore = friend.scores;
            friendScore = friendScore.map(number => parseInt(number))

            // Substract the elements from the current user's scores and the friend's score
            // return the absolute value
            let totalDifference = currentUserScores.map((item, index) => {return Math.abs(item - friendScore[index])});

            // Find the total difference by summing the elements in the array
            totalDifference = totalDifference.reduce((acc, val) => {return acc + val});
            console.log("Current total difference", totalDifference);

            // Push this total difference to the arrayDifferences
            arrayDifferences.push(totalDifference);
        });

        // Find the index of the element lowest value in the arrayDifferences,
        // this corresponds to the index of the closest match in the api friends array
        // We'll find the first intances only

        const matchIndex = arrayDifferences.indexOf(Math.min.apply(null, arrayDifferences));
        console.log("Match index", matchIndex);

        // Send response with the closest match
        console.log(friendsData[matchIndex]);
        res.json(friendsData[matchIndex]);

        // Push the current user's data after the comparison is made
        friendsData.push(req.body);

        console.log("after push", friendsData);
    })
};