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
//this does NOT seem like the right way to do this.
//But I think the right way, is start over with the original finals data, and .map() it.
function getWinnersByYear(getWinners, getYears, data) {
    const country = getWinners(getFinals, data); //A wild function appears!
    return getYears(getFinals, data).map(function(year, i) {
        return `In ${year}, ${country[i]} won the world cup!`;
    })
};
//I'm totally going to come back and do this more elegantly.


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

function getCountryWins(/* code here */) {

    /* code here */

};

getCountryWins();


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

};

getGoals();


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
