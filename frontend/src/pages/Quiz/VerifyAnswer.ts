

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
export function verifyAnswer(type:string = '', points:number = 0, userInput:string) : void | number {

    /**
     * Verifies users answer is correct
     * 
     * @param type - type of question
     * @param points - total points of the question
     * @param userInput - users answer
     * @returns The total points a user recieves from their answer
     */

    const dateObj = new Date(Date.now())
    const month = dateObj.getMonth()
    const year = dateObj.getFullYear()
    const day = dateObj.getDate()
    switch (type.toLowerCase()){
        case 'year':
            if (parseInt(userInput) === year) return points
            else return 0
        case 'month':
            if(userInput.trim().toLowerCase() === months[month]) return points
            else return 0
        case 'day':
            if (userInput.trim().toLowerCase() === days[dateObj.getDay()])
              return points;
            else return 0;
        case 'date':
            try {
                const [userDay, userMonth, userYear] = userInput.split('/').map(Number)
                if (userDay === day && userMonth === month+1 && userYear === year) return points
                return 0
            }catch{
                return 0
            }
        case 'season':
            console.log(getSeason(month))
    }
}
