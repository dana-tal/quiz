import questions from '../utils/questions.js';
import Question from '../components/Question.jsx';
import Summary from '../components/Summary.jsx';
import {useState} from 'react';

const TIMEOUT =20000;

export default function Quiz()
{
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length ;
    const quizEnded = activeQuestionIndex === questions.length ? true: false;

    function handleSelectAnswer(answerObj)
    {
        if ( activeQuestionIndex < questions.length)
        {
            if ( answerObj.answerState === 'correct' || answerObj.answerState==='wrong')
            {
                setTimeout( ()=>{
                    setUserAnswers( (prevAnswers)=>[...prevAnswers,answerObj]);
                },1000);  // wait one second before moving on to the next question, in order to show feedback 
            }
            else // for skipped questions, no need to wait
            {
                setUserAnswers( (prevAnswers)=>[...prevAnswers,answerObj]);   
            }
        }
    }

    console.log("users Answers:");
    console.log(userAnswers);

    return(<section id="quiz">
           { quizEnded ? <Summary answers={userAnswers} />:
                        <Question key={activeQuestionIndex} questionInd={activeQuestionIndex}  onSelect={handleSelectAnswer} timeout={TIMEOUT} /> }
         </section>);
}