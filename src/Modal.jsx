import React from 'react'
import { useGlobalContext } from './context'
const Modal = () => {
  const {isModalOpen , closeModel , correct ,questions} = useGlobalContext();
  console.log(correct);
  console.log(questions);
  return (
    <div className={`${isModalOpen ? 'modal-containerr isOpen ' : 'modal-containerr'} `}>
      <div className='modal-container'> 
        <h2>congrats!</h2>
        <p>you answered {((correct / questions.length)*100).toFixed(1)}% of questions correctly</p>
        <button onClick={closeModel} className='close-btn'>play again</button>
      </div>
    </div>
  )
}

export default Modal