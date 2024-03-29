import './App.css';
import Avatar from 'react-avatar';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios'

function App() {

  const [queryResults, setQueryResults] = useState([{
    "question": "Hi",
    "answer": "Hello! How may I help you?"
  }])
  const [query, setQuery] = useState("")
  const [enabled, setEnabled] = useState(false)
  const messagesEndRef = useRef(null);


  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [queryResults]);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.get(`http://localhost:8000/${enabled ? "query_gpt" : "query"}?query=${query}`).then(
      res => (setQueryResults([...queryResults, { "question": query, "answer": res.data }]))
    )

    setQuery('')
  }
  const enableGPT = () => {
    setEnabled(true)
    alert("Genrative AI enabled!");
  }
  return (
    <div className="App">
      <h1 className='logo'>NEO</h1>
      {enabled?<h3>enabled</h3>:<></>}
      <div className="side-container">
        <h1 className="hero">Chatbot for Student Assistance</h1>
        <p className="content">Say Hi to Neo. Our very own personel assistant who is here to answer all your questions. </p>
        <button className="btn" onClick={e => (enableGPT(e))}>Enable GPT</button>
        <button className="btn" onClick={e => (setEnabled(false))}>Disable GPT</button>
      </div>
      <div className="chatbot-container">
        <div className="messages-container" ref={messagesEndRef}>
          {queryResults.map(res => {
            return (
              <>
                <>
                  <Avatar style={{ "alignSelf": "flex-end" }} round={true} size="27" facebook-id="invalidfacebookusername" src="https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-18.jpg" />
                  <div className="message-container" style={{ "alignSelf": "flex-end" }}>
                    {res.question}
                  </div>
                </>
                <>
                  <Avatar round={true} size="27" facebook-id="invalidfacebookusername" src="https://i.pinimg.com/564x/61/19/a9/6119a94aeaa05675168ef4941b4b739b.jpg" />
                  <div className="message-container">
                    {res.answer}
                  </div>
                </>
              </>
            )
          })
          }
        </div>
        <form action="#" onSubmit={e => handleSubmit(e)}>
          <input type="text" required className='query' style={{ color: "white" }} value={query} onChange={e => setQuery(e.target.value)} />
        </form>
      </div>
    </div>
  );
}

export default App;
