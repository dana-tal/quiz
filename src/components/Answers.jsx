import questions from '../utils/questions.js';
import { useRef} from 'react';


export default function Answers({questionInd,answer,onClick})
{
   
    const answersKeys = useRef();

    if (! answersKeys.current) // shuffle the answers keys only once, on the first render 
    {
         answersKeys.current = ['a1','a2','a3','a4']; 
         answersKeys.current.sort( ()=>Math.random() -0.5); // shuffle the question answer keys 
    }

    return(
        <ul id="answers">
              { 
                answersKeys.current.map( (key)=>
                    {                     
                        return(<li key={key} className="answer">
                                       <button 
                                                className={key===answer.selectedKey ? answer.answerState:''} 
                                                onClick={ ()=>onClick(key) }   
                                                disabled={ answer.answerState==='initial'? false:true}                                              
                                            >{questions[questionInd].answers[key]}</button>
                                       </li> );
                    })
              }
        </ul>
    )
    //console.log( questions[questionInd].answers);
}
