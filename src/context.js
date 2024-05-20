import axios from 'axios';
import React ,{useState,useContext,useEffect} from 'react';

const table ={
    sports:21,
    history:23,
    politics:24
}


const API_ENDPONIT = 'https://opentdb.com/api.php?'

const url = ''

const tempUrl = 'https://opentdb.com/api.php?amount=15&category=21&difficulty=easy&type=multiple'
const AppContext = React.createContext()

const AppProvider = ({children})=> {
    const [waiting,setWaiting] = useState(true);
    const [loading , setLoading] = useState(false);
    const [questions , setQuestions] = useState([]);
    const [index , setIndex] = useState(0);
    const [correct , setCorrect] = useState(0);
    const [error , setError] = useState(false);

    const [ quiz , setQuiz] =useState({
        amount:10,
        category:'sports',
        difficulty:'easy',
    })
    const [isModalOpen , setIsModalOpen] = useState(false);


    const fetchQuestions = async ( url ) => {
        setLoading(true);
        setWaiting(false);
        try {
            const response = await axios(url); // Making the HTTP request
            console.log(response);
    
            // Checking if response is defined and status is 200
            if (response && response.status === 200) {
                const data = response.data.results;
                if (data.length > 0) {
                    setWaiting(false);
                    console.log('ttt');
                    setQuestions(data);
                    setLoading(false);
                    setError(false);
                } else {
                    setWaiting(true);
                    setError(true);
                }
            } else {
                setWaiting(true);
            }
        } catch (err) {
            // Handle different HTTP error statuses
            if (err.response && err.response.status === 429) {
                console.error('Too many requests. Please try again later.');
                // You can also implement retry logic here with setTimeout or exponential backoff
            } else {
                console.error('Error fetching questions:', err);
                setWaiting(true);
                setLoading(false);
                setError(true);
            }
        }
    }
    const nextQuestion = ()=>{
        setIndex((old)=>{
            const index = old +1 ;
            if(index > questions.length -1 ){
                openModel()
                return 0
            }else{
                return index
            }
        })
    }

    const checkAnswer = value => {
        if(value){
            setCorrect( (old) => old + 1 )
        }
        nextQuestion();
    }


    const openModel = ()=>{
        setIsModalOpen(true)
    }
    const closeModel = ()=>{
        setWaiting(true)
        setCorrect(0)
        setIsModalOpen(false)
    }


    // useEffect(()=>{
    //     fetchQuestions(tempUrl)
    // },[])
    const handleChange = (e)=>{
        console.log(e);
        const name =  e.target.name; 
        const value =e.target.value;
        console.log(name,value);
        const newQuiz = {...quiz, [name]:value};
        setQuiz(newQuiz);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const {amount , category ,difficulty} =quiz;
        const url = `${API_ENDPONIT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
        fetchQuestions(url);
    }

    return <AppContext.Provider value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModel,
        quiz,
        handleChange,
        handleSubmit
        }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}