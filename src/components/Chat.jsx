import React, { useState, useEffect, useRef } from 'react';
import '../styles/Chat.css';

const Chatbot = ({file}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const [animatedText, setAnimatedText] = useState('');
  const [isArrowButtonLoading, setIsArrowButtonLoading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const chatWindowRef = useRef(null);
  const arrowButtonRef = useRef(null);
  const hasSentPresetQuery = useRef(false);

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  };

  useEffect(() => {
    if (!hasSentPresetQuery.current) {
      sendPresetQuery();
      console.log('sendPresetQuery')
      hasSentPresetQuery.current = true;
    }
  }, []);

  // useEffect(() => {
  //   if (file) {
  //     console.log('Uploading file', file)
  //     uploadFile(file);
  //   }
  // }, [file]);

  // const uploadFile = async (file) => {
  //   setFileUploading(true);
  //   const formData = new FormData();
  //   formData.append('files', file);

  //   try {
  //     const response = await fetch('http://localhost:8000/upload_files', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       setFileUploading(false);
  //       setIsFileUploaded(true);
  //     } else {
  //       console.error('Error uploading file:', response.statusText);
  //       setFileUploading(false);
  //     }
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     setFileUploading(false);
  //   }
  // };

  const sendPresetQuery = async () => {
    const response = await fetch('http://127.0.0.1:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({question: 'What are the main topics of the documents in four words at maximum?What are the the possible questions I can ask about the document. Make sure to give only relavent infomation. DONT GIVE ANY ABSURD INFORMATION.'}),
    });
    const botMessage = await response.json();
    setIsFileUploaded(true);
    setBotTyping(true);
    setIsArrowButtonLoading(true);
    const firstResponse  = `Hello, I am your document assistant. I can help you with any questions you may have regarding the submited documents.<br/><br/> Possible queries could be about: ${botMessage.response}<br/><br/> Please feel free to ask me a question about the document.`;
    animateText(firstResponse);
  };

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatWindowRef.current) {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input, time: formatTime(new Date()), initials: 'U' };
      setMessages([...messages, userMessage]);
      setInput('');

      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({question: input}),
      });
      
      if (response.ok) {
        setIsArrowButtonLoading(true);
        const data = await response.json();
        setBotTyping(true);
        animateText(data.response);
      } else {
        console.error('Error:', response.statusText);
      }
    }
  };

  const animateText = (text) => {
    let index = 0;
    const words = text.split(/(\s+|\n)/); 
    // Split by spaces and newline characters
    setAnimatedText('');

    const intervalId = setInterval(() => {
        if (index < words.length) {
            const currentWord = words[index];
            setAnimatedText((prev) => {
                if (currentWord === '\n') {
                    return prev ? `${prev}<br />` : '<br />';
                } else {
                    return prev ? `${prev} ${currentWord}` : currentWord;
                }
            });
            index++;
            scrollToBottomOnClick();
        } else {
            clearInterval(intervalId);
            setBotTyping(false);
            setIsArrowButtonLoading(false);
            const botResponse = { sender: 'bot', text: text, time: formatTime(new Date()), initials: 'C' };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        }
    }, 100);
};


  const scrollToBottomOnClick = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
    console.log('scrollToBottomOnClick')
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    const textarea = e.target;
    textarea.classList.toggle('expanded', textarea.scrollHeight > textarea.clientHeight);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } 
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (chatWindowRef.current) {
        const threshold = 2;
        const { scrollTop, scrollHeight, clientHeight } = chatWindowRef.current;
        const isAtBottom = scrollHeight - scrollTop <= clientHeight + threshold;
        console.log('isAtBottom', isAtBottom)
        if (!isAtBottom) {
          arrowButtonRef.current.style.display = 'block';
        } else {
          arrowButtonRef.current.style.display = 'none';
        }
      }
    };

    if (chatWindowRef.current) {
      chatWindowRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (chatWindowRef.current) {
        chatWindowRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  
  return (
    <div className="chatbot">
      {isFileUploaded ? (
      <>
        <div className="arrow-button" onClick={scrollToBottomOnClick} ref={arrowButtonRef}>
          ▼
        </div>
        <div className="chat-window" ref={chatWindowRef}>
          <div className="messages">
            {messages.map((msg, index) => (
              <>
              <div key={index} className={`message ${msg.sender}`} data-initials={msg.initials}>
              <div className="message-text" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />              
              <div className='timecopy'>
                  {msg.sender === "bot" && (<img
                    src="clipboard.png"
                    alt="Copy"
                    className={`copy-button ${msg.sender === 'user' ? 'left' : 'right'}`}
                    onClick={() => handleCopy(msg.text)}
                  />)}
                  <div className="message-time">
                    {msg.time}
                  </div> 
                </div>
                
              </div>
              
              </>
          ))}
            {botTyping && (
              <div className="message bot" data-initials="DA">
              <div className="message-text" dangerouslySetInnerHTML={{ __html: animatedText }} />              
              <div className="message-time">{formatTime(new Date())}</div>
              </div>
            )}
          </div>
        </div>
        <div className="input-area">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className='message-input'
          rows={3}
        />
          {
            isArrowButtonLoading ? (
            <img className='loading-button' src='loading.gif' alt='loading' />
            ):
            (<img className='send-button' src='images.png' alt='send' onClick={handleSend} />)
          }
          
        </div>
      </>
      ) : (fileUploading ? 
        (
        <>
          <div className="loading-message">
            <img src='scanningdoc.gif' className='sun'/>
            <div className='loadmsg-text'>Executing document...</div>
          </div>
        </>
        )
        :
        (
        <>
          <div className="loading-message">
            <img src='chatbot.jpeg' className='sun'/>
            <div className='loadmsg-text'>Ready to work on your document!</div>
            <div className='loadmsg-text'>Select a file to get started.</div>
          </div>
        </>
        )
      )
    }
    </div>
  );
};

export default Chatbot;
