const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function getSeason(month: number): string {
  switch (month) {
    case 0:
      return "winter";
    case 1:
      return "winter";
    case 2:
      return "spring";
    case 3:
      return "spring";
    case 4:
      return "spring";
    case 5:
      return "summer";
    case 6:
      return "summer";
    case 7:
      return "summer";
    case 8:
      return "fall";
    case 9:
      return "fall";
    case 10:
      return "fall";
    case 11:
      return "winter";
    default:
      return "";
  }
}
export function verifyAnswer(
  type: string = "",
  points: number = 0,
  userInput: string,
): void | number {
  /**
   * Verifies users answer is correct
   *
   * @param type - type of question
   * @param points - total points of the question
   * @param userInput - users answer
   * @returns The total points a user recieves from their answer
   */

  const dateObj = new Date(Date.now());
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const day = dateObj.getDate();
  switch (type.toLowerCase()) {
    case "year":
      if (parseInt(userInput) === year) return points;
      else return 0;
    case "month":
      if (userInput.trim().toLowerCase() === months[month]) return points;
      else return 0;
    case "day":
      if (userInput.trim().toLowerCase() === days[dateObj.getDay()])
        return points;
      else return 0;
    case "date":
      try {
        const [userDay, userMonth, userYear] = userInput.split("/").map(Number);
        if (userDay === day && userMonth === month + 1 && userYear === year)
          return points;
        return 0;
      } catch {
        return 0;
      }
    case "season":
      if (userInput.toLocaleLowerCase() === getSeason(month)) return points;
      else return 0;
    case "memory":
      try {
        const userValue = userInput
          .split(",")
          .map((v) => v.trim().toLocaleLowerCase());

        if (userValue.join(" ") === "Apple Chair River") return points;

        let totalPoints = 0;

        if (userValue[0] === "apple") totalPoints += 1;
        else if (userValue.includes("apple")) totalPoints += 0.5;

        if (userValue[1] === "chair") totalPoints += 1;
        else if (userValue.includes("chair")) totalPoints += 0.5;

        if (userValue[2] === "river") totalPoints += 1;
        else if (userValue.includes("river")) totalPoints += 0.5;

        return totalPoints;
      } catch {
        return 0;
      }
    case "subtraction": {
      const userValue = userInput.split(",").map((v) => Number(v.trim()));

      if (userValue.some(Number.isNaN)) return 0;

      if (userValue.length > 6) return 0;

      const total = userValue.reduce((sum, num) => sum + num, 0);

      if (total === 495) return points;

      return 0;
    }
    case "sentence_repetition": {
      if (
        userInput
          .toLocaleLowerCase()
          .replace(/[^\w\s]/g, "")
          .trim() === "The dog ran quickly across the park"
      )
        return points;
      return 0;
    }
    case "action" : {
        const userValue = Number(userInput)

        if (userValue < 1.5 || userValue > 2.5) return 0;
        else if (
          (userValue >= 1.5 && userValue < 1.7) ||
          (userValue >= 2.4 && userValue <= 2.5)
        )
          return 1;
        else if (
          (userValue >= 1.7 && userValue < 1.9) ||
          (userValue >= 2.2 && userValue < 2.4)
        )
          return 2;
        else return points
    }
    case 'multiple_choice': {
        if (userInput.trim().toLocaleLowerCase() === 'apple') return points
        else return 0
    }
  }
}
