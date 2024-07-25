import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'
import styles from './chat.module.css'
import { getUserColor } from './colors';
import { formatTimestamp } from '../../backend/timeUtils';

interface Message {
    username: string;
    message: string;
    timestamp: number; 
  }

  const socket = io('http://localhost:8080');

  const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        socket.on('previousMessages', (msgs: Message[]) => {
            setMessages(msgs);
        });

        socket.on('chatMessage', (msg: Message) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('previousMessages');
            socket.off('chatMessage')
        };
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'instant'})
        }
    }, [messages])

    const handleSend = () => {
        if (input) {
            const message: Message = { 
                username: username || 'Anonymous', 
                message: input,
                timestamp: Date.now()
            };
            socket.emit('chatMessage', message);
            setInput('');
        }
    };

    return (
        <div className={styles.chatContainer}>
            <h4 className={styles.commentTitle}>chat</h4>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div key={index} className={styles.msgDiv}>
              <strong className={styles.cauthor} style={{ color: getUserColor(msg.username)}}><span>{'<'}</span>{msg.username}<span>{'>'}</span></strong> {msg.message} <div className={styles.ctime}><span className={styles.unselectTxt}>{formatTimestamp(msg.timestamp)}</span></div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.inputbox}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username (optional)"
          />
          <input
            className={styles.inputbox}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter message"
            autoComplete='off'
            maxLength={300}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    );
  };

  export default ChatApp;