import './MainSearchBar.css';
import React from 'react';
import {useState} from 'react';
import {search} from 'react-icons-kit/ionicons/search';
function MainSearchBar(props) {
  const [input, setInput] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <div>
      <div className="row">
        <form className="search-bar" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for item"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default MainSearchBar;
