import './App.css';
import Loading from './Loading';
import Modal from './Modal';
import SetUpForm from './SetUpForm';
import { useGlobalContext } from './context';

function App() {
  const {waiting,loading,questions,index,correct,nextQuestion,checkAnswer}=useGlobalContext();

  if(waiting){
    return <SetUpForm/>
  }
  if(loading){
    return <Loading/>
  }
  console.log(questions[1]);
  const {question,incorrect_answers,correct_answer} = questions[index];
  console.log(correct_answer);
  // const answers = [...incorrect_answers,correct_answer];
  let answers =[...incorrect_answers]
  const tempIndex =Math.floor(Math.random() * 4);
  if(tempIndex === 3){
    answers.push(correct_answer);
  }else{
    answers.push(answers[tempIndex]);
    answers[tempIndex]= correct_answer
  }
  return (
    <main>
        <Modal />
        <section className='quiz'>
          <p className='correct-answers'>
            correct answers : {correct}/{index}
          </p>
          <article className='container'>
            <h2 dangerouslySetInnerHTML={{__html:question}}/> {/* don't show any code html from api like it&#039 */}
            <div className='btn-container'>
              {answers.map((answer , index) =>{
                return(
                  <button 
                  key={index}
                  className='answer-btn'
                  onClick={()=> checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{__html: answer}}
                />
                )
              })}
            </div>
          </article>
          <button className='next-question' onClick={nextQuestion}>next question</button>
        </section>
    </main>
  )
}

export default App;