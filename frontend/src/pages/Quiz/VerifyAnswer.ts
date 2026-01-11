const questionObj = {
  id: 1,
  category: "orientation",
  question: "What year is it?",
  type: "system_time year",
  points: 1,
};

type QuestionObjectType = {
  id: number,
  category: string,
  question: string,
  type: string,
  points: number
};


function verifyAnswer(questionObj : QuestionObjectType) : void {
    const dateObj = new Date(Date.now())
    switch (questionObj.type.split(" ")[1].toLowerCase()){
        case 'year':
            console.log(dateObj.getFullYear)
    }
}

verifyAnswer(questionObj)