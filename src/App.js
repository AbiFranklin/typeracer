import React, {useState} from 'react';
import './App.css'

const App = () => {
  const SNIPPETS = [
    'Bears, beets, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hangout? The Foo Bar'
  ];
  const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null }
  const [snippet, setSnippet] = useState('');
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  // gameState.victory and gameState.endTime updated when target.value === snippet
  const updateUserText = e => {
    setUserText(e.target.value);
    console.log('Current User Text', userText);

    if (e.target.value === snippet) {
      setGameState({ ...gameState, victory: true, endTime: (new Date().getTime() - gameState.startTime)/1000 })
    }
  }

  // gameState.startTime updated with selection of snippet
  const chooseSnippet = snippetIndex => () => {
    console.log('set snippet', snippetIndex);
    setSnippet(SNIPPETS[snippetIndex]);
    setGameState({... gameState, startTime: new Date().getTime() })
  };

  return (
    <div>
      <h2>Type Racer</h2>
      <h3>{gameState.victory ? `Done! 🎉 Time: ${gameState.endTime} seconds ... choose a new challenge` : 'Copy the text as fast as you can...'}</h3>
      <hr />
      <h3>Text: {snippet}</h3>
      
      <input value={userText} onChange={updateUserText} />
      <hr />
      {SNIPPETS.map((SNIPPET, index) => (
        // refactor SNIPPETS to include ids
        <button onClick={chooseSnippet(index)} key={index}>
        {SNIPPET.substring(0, 10)}...
        </button>
      ))}
    </div>
  )
}

export default App;