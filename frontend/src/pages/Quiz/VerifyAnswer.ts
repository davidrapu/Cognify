const questionObj = {
  id: 1,
  category: "orientation",
  question: "What year is it?",
  type: "system_time date",
  points: 1,
};

type QuestionObjectType = {
  id: number,
  category: string,
  question: string,
  type: string,
  points: number
};

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
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
]

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
function getSeason(month: number) : string {
    switch (month) {
        case 0:
            return 'winter'
        case 1:
            return 'winter'
        case 2:
            return 'spring'
        case 3:
            return 'spring'
        case 4:
            return 'spring'
        case 5:
            return 'summer'
        case 6:
            return 'summer'
        case 7:
            return 'summer'
        case 8:
            return 'fall'
        case 9:
            return 'fall'
        case 10:
            return 'fall'
        case 11:
            return 'winter'
        default:
            return ''
    }
}
function verifyAnswer(questionObj : QuestionObjectType) : void {
    const dateObj = new Date(Date.now())
    const month = dateObj.getMonth()
    switch (questionObj.type.split(" ")[1].toLowerCase()){
        case 'year':
            console.log(dateObj.getFullYear())
            break;
        case 'month':
            console.log(months[month]);
            break;
        case 'day': 
            console.log(days[dateObj.getDay()]);
            break;
        case 'date':
            console.log(dateObj.toLocaleDateString(undefined, options))
            break
        case 'season':
            console.log(getSeason(month))
    }
}

verifyAnswer(questionObj)