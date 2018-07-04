var jsonQuery = require('json-query');

const letters = /^[A-Z]+$/;
export const findCourseJSON = (courseCode, courseData) => {
  // we must remove the * when searching in the JSON because course codes don't have this in storage
  var courseCode = courseCode.replace('*', '');
  var arr = [];

  // performing a deep query to find the JSON object associated with the course code
  // TODO FIX FOR LOOP TO BREAK WHEN QUERY IS FOUND AND PROPERLY RETURN THE OBJECT
  Object.keys(courseData).some((department) => {
    arr = jsonQuery(`${department}[**][*course_code=${courseCode}]`, { data: courseData }).value;
    if (!Array.isArray(arr) || !arr.length == 0) {
      return true;  // .some() breaks under return true
    }
  });
  return arr;
};

export const isCourse = (word) => {
  // default to true, if we suspect otherwise then set to false
  var isCourseAnswer = true;
  var digitOrLetters = [];

  // must be 5 characters or greater
  if (word.length > 4) {
    // must have all capital alphabetical characters followed by all digits
    for (i = 0; i < word.length; i++) {
      if (word[i].match(letters) == word[i]) {
        // check to see if the character is a letter
        digitOrLetters.push('letter');
        if (digitOrLetters[digitOrLetters.length - 1] === 'digit') {
          // digits must proceed letters. if the previous character was a digit, this is not a valid course
          isCourseAnswer = false;
          return isCourseAnswer;
        }
      } else if (Number.isInteger(parseInt(word[i]))) {
        // check to see if the character is a digit
        digitOrLetters.push('digit');
      } else if (word[i] === '/') {
        digitOrLetters.push('');
      } else {
        isCourseAnswer = false;
        return isCourseAnswer;
      }
    }
  } else {
    isCourseAnswer = false;
    return isCourseAnswer;
  }

  if (word.match(letters) == word) {
    // the word only contains letters, not a valid courses
    isCourseAnswer = false;
    return isCourseAnswer;
  }

  // if we get here, the course is true
  return isCourseAnswer;
};
