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

type CategoryScore = {
  orientation: number;
  language: number;
  registration: number;
  calculation: number;
  recall: number;
};

type Category = keyof CategoryScore;

export function verifyAnswer(
  type: string = "",
  category: string = "",
  points: number = 0,
  userInput: string,
  setCategoryScore: React.Dispatch<React.SetStateAction<CategoryScore>>,
): number {
  /**
   * Verifies users answer is correct
   *
   * @param type - type of question
   * @param points - total points of the question
   * @param userInput - users answer
   * @params setCategoryScore - to set the score of the user based of the category
   * @returns The total points a user recieves from their answer
   */

  const dateObj = new Date(Date.now());
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const day = dateObj.getDate();

  const increaseCategory = (category: Category, points: number = 1) => {
    setCategoryScore((scoreObj) => ({
      ...scoreObj,
      [category]: scoreObj[category] + points,
    }));
  };
  switch (type.toLowerCase()) {
    case "year":
      if (parseInt(userInput) === year) {
        increaseCategory("orientation");
        return points;
      } else return 0;
    case "month":
      if (userInput.trim().toLowerCase() === months[month]) {
        increaseCategory("orientation");
        return points;
      } else return 0;
    case "day":
      if (userInput.trim().toLowerCase() === days[dateObj.getDay()]) {
        increaseCategory("orientation");
        return points;
      } else return 0;
    case "date":
      try {
        const [userDay, userMonth, userYear] = userInput.split("/").map(Number);
        if (userDay === day && userMonth === month + 1 && userYear === year) {
          increaseCategory("orientation");
          return points;
        }
        return 0;
      } catch {
        return 0;
      }
    case "season":
      if (userInput.toLocaleLowerCase() === getSeason(month)) {
        increaseCategory("orientation", points);
        return points;
      } else return 0;
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

        increaseCategory(
          category && category === "registration" ? "registration" : "recall",
          totalPoints,
        );
        return totalPoints;
      } catch {
        return 0;
      }
    case "subtraction": {
      const userValue = userInput.split(",").map((v) => Number(v.trim()));

      if (userValue.some(Number.isNaN)) return 0;

      if (userValue.length > 6) return 0;

      const total = userValue.reduce((sum, num) => sum + num, 0);

      if (total === 495) {
        increaseCategory("calculation", points);
        return points;
      }
      return 0;
    }
    case "sentence_repetition": {
      if (
        userInput
          .toLocaleLowerCase()
          .replace(/[^\w\s]/g, "")
          .trim() === "The dog ran quickly across the park"
      ) {
        increaseCategory("language", points);
        return points;
      }
      return 0;
    }
    case "action": {
      const userValue = Number(userInput);

      if (userValue < 1.5 || userValue > 2.5) return 0;
      if (
        (userValue >= 1.5 && userValue < 1.7) ||
        (userValue >= 2.4 && userValue <= 2.5)
      ) {
        increaseCategory("calculation", 1);
        return 1;
      } else if (
        (userValue >= 1.7 && userValue < 1.9) ||
        (userValue >= 2.2 && userValue < 2.4)
      ) {
        increaseCategory("calculation", 2);
        return 2;
      } else {
        increaseCategory("calculation", points);
        return points;
      }
    }
    case "multiple_choice": {
      if (userInput.trim().toLocaleLowerCase() === "apple") {
        increaseCategory("language", points);
        return points;
      } else return 0;
    }
    case "country": {
      increaseCategory("language", points);
      return points;
    }
    case "city": {
      increaseCategory("language", points);
      return points;
    }
    case "object_naming": {
      increaseCategory("language", points);
      return points;
    }
    case "sentence_generation": {
      increaseCategory("language", points);
      return points;
    }
    default:
      return 0;
  }
}
