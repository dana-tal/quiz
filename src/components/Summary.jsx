import quizComplete from '../assets/quiz-complete.png';
import questions from '../utils/questions.js';

export default function Summary({ answers})
{
    let i=0,question,key,answer,j;
    let correct=0, wrong=0, skipped=0;
    let correct_per, wrong_per, skipped_per;

    for (j=0; j<answers.length;j++)
    {
        switch(answers[j].answerState)
        {
            case 'correct':
                           correct++;
                           break;
            case 'wrong':
                          wrong++;
                          break;
            case 'skipped':
                          skipped++;
        }
    }
    correct_per = Math.round((correct/answers.length)*100);
    wrong_per = Math.round(wrong/answers.length *100);
    skipped_per = Math.round(skipped/answers.length*100);

    return (<section id="summary">
             <img src={quizComplete} alt="quiz completed" />   
             <h2>Quiz Completed!</h2> 
             <div id="summary-stats">
                 <p>
                    <span class="number">{skipped_per}%</span>
                    <span class="text">SKIPPED</span>
                 </p>
                 <p>
                    <span class="number">{correct_per}%</span>
                    <span class="text">Answered Correctly</span>
                 </p>
                 <p>
                    <span class="number">{wrong_per}%</span>
                    <span class="text">Answered Incorrectly</span>
                 </p>
             </div>
             <ol> 
             {
                answers.map( (answerObj)=>{
                    question = questions[i].text;
                    key = questions[i].id;
                    answer = answerObj.selectedKey? questions[i].answers[answerObj.selectedKey]:'skipped';
                    i++;
                    return(<li key={key}>
                              <p className="question">{question}</p>
                              <p className={`user-answer ${answerObj.answerState}`} >{answer}</p>  
                    </li>);

                })
             }
             </ol>
    </section>);
}