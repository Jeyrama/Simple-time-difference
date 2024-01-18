/*
You will be given a series of times at which an alarm sounds. 
Your task will be to determine the maximum time interval between alarms. 

Each alarm starts ringing at the beginning of the 
corresponding minute and rings for exactly one minute. 

The times in the array are not in chronological order. 
Ignore duplicate times, if any.

For example:
  solve(["14:51"]) = "23:59". If the alarm sounds now, 
  it will not sound for another 23 hours and 59 minutes.

  solve(["23:00","04:22","18:05","06:24"]) == "11:40". 
  The max interval that the alarm will not sound is 11 hours and 40 minutes.

In the second example, the alarm sounds 4 times in a day.
*/


// Solution

function solve(arr){
  let sortedAsMinutes = arr.map(x => timeToMinutes(x)).sort((a, b) => a - b);
  sortedAsMinutes.push(sortedAsMinutes[0] + 60 * 24);
  return minutesToTime(Math.max.apply(null, sortedAsMinutes.map((x, i, a) => 
    { return i < a.length - 1 ? a[i + 1] - x : 0 })) - 1);
}

function timeToMinutes(time) {
  let tokens = time.split(":");
  return parseInt(tokens[0], 10) * 60 + parseInt(tokens[1], 10);
}

function minutesToTime(minutes) {
  return ("" + Math.floor(minutes / 60)).padStart(2, "0") + ":" + ("" + minutes % 60).padStart(2, "0");
}

// or

const timeDiff = (time, i, arr) => {
  let a = new Date(`0${arr[i + 1] ? 1 : 2} Jan 2021 ${arr[i + 1] || arr[0]}`);
  a.setMinutes(a.getMinutes() - time.split(':')[1] - 1);
  a.setHours(a.getHours() - time.split(':')[0]);
  return `${`${a.getHours()}`.padStart(2, 0)}:${`${a.getMinutes()}`.padStart(2, 0)}`;
}

const solve = arr => [...new Set(arr)].sort().map(timeDiff).sort().pop();

// or

const solve = ([...arr]) => {
  const timeToMin = (str = '24:00') => ([hh, mm] = str.split`:`, hh * 60 + +mm);
  const minToTime = val => [val / 60, val % 60].map(val => `${~~val}`.padStart(2, '0')).join`:`;
  
  arr.sort().push(arr[0].replace(/../, ch => +ch + 24));
  const maxDiff = arr.reduce((acc, time, idx) => Math.max(acc, timeToMin(time) - timeToMin(arr[idx-1])), 0) - 1;
  
  return minToTime(maxDiff);
}