import React, {useState, useEffect} from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  setDoc,
} from 'firebase/firestore';
import {auth, db} from '../config/firebaseConfig';
import './Chat.css';
import {decrypt, encrypt} from '../firebaseFunctions/encryptionFunctions';

function Chat({selectedChat, onBack}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // ...
  const currentUserId = auth.currentUser.uid; // Get the current user's ID from Firebase Auth

  useEffect(() => {
    if (!selectedChat) return;
    const messageRef = collection(
      db,
      'privateChats',
      selectedChat.id,
      'messages',
    );
    const q = query(messageRef, orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})));
    });

    return () => {
      unsubscribe();
    };
  }, [selectedChat]);

  const sendMessage = async e => {
    e.preventDefault();

    if (!input.trim()) return;

    const recipientId = Object.keys(selectedChat.data.members).find(
      id => id !== auth.currentUser.uid,
    );
    const messageData = {
      content: encrypt(input),
      timestamp: Date.now(),
      sender: auth.currentUser.uid,
      recipient: recipientId,
    };

    console.log('selectedChat: ', selectedChat);

    await addDoc(
      collection(db, 'privateChats', selectedChat.id, 'messages'),
      messageData,
    );
    setInput('');
  };

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.map(({id, data}) => (
          <div key={id} className="chat-message">
            <p>
              {(() => {
                try {
                  return decrypt(data.content);
                } catch (e) {
                  console.error('Error decrypting message:', e);
                  return 'Error: Malformed message data';
                }
              })()}
            </p>
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
