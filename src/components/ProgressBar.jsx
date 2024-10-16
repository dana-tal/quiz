import {useEffect,useState} from 'react';

export default function ProgressBar({timer})
{
    const [remainingTime,setRemainingTime] = useState(timer);

        useEffect( ()=>{
           
        const  intervalId = setInterval( ()=>{
                    setRemainingTime(prevTime=>prevTime-100);
                },100);

           return ()=> {
                    clearInterval(intervalId);                    
               
            };
        },[]);
              
    return (<progress  value={remainingTime} max={timer} />);
}