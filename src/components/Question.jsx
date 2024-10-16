import questions from '../utils/questions.js';
import Answers from './Answers.jsx';
import ProgressBar from './ProgressBar.jsx';
import {useState,useEffect} from 'react';

export default function Question({questionInd,onSelect,timeout})
{

    const [answer, setAnswer] = useState({ answerState:'initial',selectedKey:''});

    
    function handleClick(selectedAnswerKey)
    {
        setAnswer({answerState:'selected',selectedKey:selectedAnswerKey});
    }

       // useEffect for handling states : selected, correct, wrong  
    useEffect(()=>{
        let intervalId;

       if (answer.answerState !== 'initial') 
       {
            if ( answer.answerState=== 'selected')
            {
                  intervalId=setTimeout(()=>{
                        if ( answer.selectedKey==='a1')
                        {
                            setAnswer( (prevAnswer)=>({ ...prevAnswer, answerState:'correct'}) );
                        }
                        else
                        {
                            setAnswer( (prevAnswer)=>({ ...prevAnswer, answerState:'wrong'}) );
                        }
                   },1000);  // the 1 second wait is to enable showing the orange color on the selected answer
                  
            }
           else // if answer is either correct or wrong already, then insert it to the array of answers
            {
                onSelect(answer);              
            }
       }
      
      return ()=>clearInterval(intervalId);

    },[answer.answerState]);

       // useEffect for handling question timeout , skipped state 
    useEffect( ()=>{
        
        let intervalId;

        intervalId=setTimeout(()=>{
            onSelect({ answerState:'skipped',selectedKey:''})
        },timeout);


        return ()=>clearInterval(intervalId);

    },[]); 

    return ( <section id="question">
                   <ProgressBar timer={timeout} />
                   <h2>{questions[questionInd].text}</h2> 
                   <Answers  questionInd={questionInd}  answer={answer} onClick={handleClick} />
    </section>);

}