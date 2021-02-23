
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export enum Difficulty {
  EASY ='easy',
  MEDIUM='medium',
  HARD='hard',
}

export const getQuizQuestions = async(amount: number, difficulty: Difficulty) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const results = await (await fetch(url)).json();
  console.log(results)
}