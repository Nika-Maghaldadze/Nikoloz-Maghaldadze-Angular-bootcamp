// Task 1:
// Day of the Week
// Write a function named getDayOfWeek. It must take one parameter named dayNumber (integer from 1 to 7). Use a switch statement to return the corresponding day of the week:
// 1 → "Monday"
// 2 → "Tuesday"
// 3 → "Wednesday"
// 4 → "Thursday"
// 5 → "Friday"
// 6 → "Saturday"
// 7 → "Sunday"

function getDayOfWeek(dayNumber) {
    switch (dayNumber) {
        case 1:
            console.log("Monday");
            break;
        case 2:
            console.log("Tuesday");
            break;
        case 3:
            console.log("Wednesday");
            break;
        case 4:
            console.log("Thursday");
            break;
        case 5:
            console.log("Friday");
            break;
        case 6:
            console.log("Saturday");
            break;
        case 7:
            console.log("Sunday");
            break;
        default:
            console.log("invalid day number entered!");
    }
}

getDayOfWeek(12);

// Task 2:

// Traffic Light
// Write a function named getTrafficAction. It must take one parameter named color (string: "red", "yellow", or "green"). Use a switch statement to return:
// "Stop" for "red"
// "Get ready" for "yellow"
// "Go" for "green"

function getTrafficAction(color) {
    switch (color) {
        case "red":
            console.log("Stop");
            break;
        case "yellow":
            console.log("Get ready");
            break;
        case "green":
            console.log("Go");
            break;
        default:
            console.log("invalid color entered!");
    }
}

// Task 3:
// Calculator
// Write a function named calculate. It must take three parameters named num1, num2, and operator.
// num1 → first number
// num2 → second number
// operator → string that can be "+", "-", "*", or "/"
// Use a switch statement on operator to return the calculation result.

function calculate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num1 === 0 || num2 === 0) {
                return "You can't divide number by 0!";
            } else {
                return num1 / num2;
            }
        default:
            return "invalid operator entered!";
    }
}

console.log(calculate(1, 4, "*"));

// Task 4:

// Seasons
// Write a function named getSeason. It must take one parameter named monthNumber (integer from 1 to 12). Use a switch statement to return the correct season:
// "Winter" → months 12, 1, 2
// "Spring" → months 3, 4, 5
// "Summer" → months 6, 7, 8
// "Autumn" → months 9, 10, 11

function getSeason(monthNumber) {
    if (monthNumber > 0 && monthNumber <= 12) {
        switch (monthNumber) {
            case (12, 1, 1):
                return "Winter";
            case (3, 4, 5):
                return "Spring";
            case (6, 7, 8):
                return "Summer";
            case (9, 10, 11):
                return "Autumn";
        }
    } else {
        return "invalid number entered!";
    }
}
