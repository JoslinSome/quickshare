import React, {useState, useEffect} from 'react';
import {
  collection,
  onSnapshot,
  query,
  where,
  FieldPath,
} from 'firebase/firestore';
import {db} from '../config/firebaseConfig';
import {auth} from '../config/firebaseConfig';
import './ChatList.css';

function ChatList({onSelectChat}) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const currentUserId = auth.currentUser.uid;
    const chatRef = collection(db, 'privateChats');
    const q = query(
      chatRef,
      where(new FieldPath('members', currentUserId), '!=', null),
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      console.log('snapshot: ', snapshot);
      console.log('snapshot.docs: ', snapshot.docs);
      console.log(
        'snapshot.docs.map: ',
        snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})),
      );
      setChats(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="chat-list">
      {chats.map(chat => (
        <div
          key={chat.id}
          className="chat-list-item"
          onClick={() => onSelectChat(chat)}>
          <h1>Chat with {chat.data.members[auth.currentUser.uid].name}</h1>
          {/* Display the recipient's name */}
          {chat.data.members &&
            Object.keys(chat.data.members)
              .filter(id => id !== auth.currentUser.uid)
              .map(id => chat.data.members[id].name)
              .join(', ')}
        </div>
      ))}
    </div>
  );
}

export default ChatList;
