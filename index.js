import { fifaData } from './fifa.js';
console.log(fifaData);

console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

//these are _really_ ugly, but I forgot to do them before, so I'm just getting them over with.
console.log(fifaData.filter(e => e.Stage == 'Final' && e.Year == '2014')[0]["Home Team Name"]);
console.log(fifaData.filter(e => e.Stage == 'Final' && e.Year == '2014')[0]["Away Team Name"]);
console.log(fifaData.filter(e => e.Stage == 'Final' && e.Year == '2014')[0]["Home Team Goals"]);
console.log(fifaData.filter(e => e.Stage == 'Final' && e.Year == '2014')[0]["Away Team Goals"]);
let theGame = fifaData.filter(e => e.Stage == 'Final' && e.Year == '2014');
console.log(theGame.map(function(game){
    if (game["Home Team Goals"] > game["Away Team Goals"])
        return game["Home Team Name"];
    return game["Away Team Name"];
})
)

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
    return data.filter(match => (match["Stage"] === 'Final'));
};

console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(callback, data) {
    const years = callback(data).map(y => y.Year);
    return years;
};

console.log(getYears(getFinals, fifaData));

/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(callback, data) {
    const winners = callback(data).map(function(elem) {
        if (elem["Away Team Goals"] > elem["Home Team Goals"]) {
            return elem["Away Team Name"];
        } else return elem["Home Team Name"];
    })
    return winners;
};

console.log(getWinners(getFinals, fifaData));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(getWinners, getYears, data) {
    const country = getWinners(getFinals, data);
    return getYears(getFinals, data).map(function(year, i) {
        return `In ${year}, ${country[i]} won the world cup!`;
    })
};


console.log(getWinnersByYear(getWinners, getYears, fifaData));

/* Task 7: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    const denominator = data.length;
    let away = data.reduce(function(acc, key) {
        return acc + key["Away Team Goals"];
    }, 0)
    let home = data.reduce(function(acc, key) {
        return acc + key["Home Team Goals"];
    }, 0)
    return {"Average Home Team Goals": home / data.length,
            "Average Away Team Goals": away / data.length,
            }
}

console.log(fifaData.length);
console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

//I didn't end up using reduce? I'll have to re-attempt this later.
function getCountryWins(data, initials) {
    data = getFinals(data);
    data = data.filter( function(elem) {
        if (elem["Home Team Goals"] > elem["Away Team Goals"] &&
            elem["Home Team Initials"] === initials)
            return true;
        if (elem["Away Team Goals"] > elem["Home Team Goals"] &&
            elem["Away Team Initials"] === initials)
            return true;
        return false;
    })
    return data.length;
}
//almost identical?
function getCountryWinsReduce(data, initials) {
    data = getFinals(data);
    return data.reduce(function(acc, item) {
        if (item["Home Team Goals"] > item["Away Team Goals"] &&
            item["Home Team Initials"] === initials)
            acc++;
        if (item["Away Team Goals"] > item["Home Team Goals"] &&
            item["Away Team Initials"] === initials)
            acc++;
        return acc;
    }, 0);
}

console.log(`reduced version ${getCountryWinsReduce(fifaData, "ITA")}`);
console.log(getCountryWins(fifaData, "ITA"));


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

//I keep trying to do this without reduce, because I think reduce should be for combining all elements together. But, I think this is a good use case, insanely complicated, but whatever.
function getGoals(data) {
    //I DON"T WORK!! see getGoals2 for working version
    //lets start by making a object with all the goals, and number of games
    //then we can just reduce it, shoving the highest average in the acc
    data = data.reduce(function(acc, item) {
        let hTeam = item["Home Team Name"];
        let aTeam = item["Away Team Name"];
        if (acc[hTeam]) {
            acc[hTeam].score += item["Home Team Goals"];
            acc[hTeam].count += 1;
        } else if (!acc[hTeam]) {
            acc[hTeam] = {};
            acc[hTeam].score = item["Home Team Goals"];
            acc[hTeam].count = 1;
        }
        if (acc[aTeam]) {
            acc[aTeam].score += item["Away Team Goals"];
            acc[aTeam].count += 1;
        } else if (!acc[aTeam]) {
            acc[aTeam] = {};
            acc[aTeam].score = item["Away Team Goals"];
            acc[aTeam].count = 1;
        }
        return acc;
    }, {})
    return data;
    //okay, this is great, but I'm returning an object, and need to use the object key(name)
    //and... How do I do that? I think I needed to make an array.
}
function getGoals2(data) {
    data = data.reduce(function(acc, item) {
        let hTeam = item["Home Team Name"];
        let aTeam = item["Away Team Name"];

        let index = acc.findIndex(item => item.team == hTeam);
        if (index == -1) {
            acc.push({team: hTeam, score: item["Home Team Goals"], games: 1});
        } else {
            acc[index].games++;
            acc[index].score += item["Home Team Goals"];
        }
        index = acc.findIndex(item => item.team == aTeam);
        if (index == -1) {
            acc.push({team: aTeam, score: item["Away Team Goals"], games: 1});
        } else {
            acc[index].games++;
            acc[index].score += item["Away Team Goals"];
        }
        return acc;
    }, [])
    data = data.reduce(function(acc, item) {
        if ((item.score / item.games) > acc.ave) {
            acc = item;
        }
        return acc;
    });
    return data.team;
} //I just realized this is supposed to only be for games for the world cup finals. I'm not re-writing it though, just call getFinals first.
console.log(getGoals2(getFinals(fifaData))); //uruguay
console.log(getGoals2(fifaData)); // france


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
    //same as previous function, just swapped out adding
    //opposing teams goals (swap hTeam and aTeam variables)
    data = data.reduce(function(acc, item) {
        let hTeam = item["Home Team Name"];
        let aTeam = item["Away Team Name"];

        let index = acc.findIndex(item => item.team == aTeam);
        if (index == -1) {
            acc.push({team: aTeam, score: item["Home Team Goals"], games: 1});
        } else {
            acc[index].games++;
            acc[index].score += item["Home Team Goals"];
        }
        index = acc.findIndex(item => item.team == hTeam);
        if (index == -1) {
            acc.push({team: hTeam, score: item["Home Team Goals"], games: 1});
        } else {
            acc[index].games++;
            acc[index].score += item["Away Team Goals"];
        }
        return acc;
    }, [])
    data = data.reduce(function(acc, item) {
        if ((item.score / item.games) > acc.ave) {
            acc = item;
        }
        return acc;
    });
    return data.team;
};

console.log(badDefense(getFinals(fifaData)));

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
