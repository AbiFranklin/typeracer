import React, {useState, useEffect} from 'react';
import './App.css'
import stringSimilarity from 'string-similarity'

const App = () => {
  const SNIPPETS = [
    'Bears, beets, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hangout? The Foo Bar',
  ];
  const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null }
  const [snippet, setSnippet] = useState('');
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [completion, setCompletion] = useState(null);
  const [challenges, setChallenges] = useState(SNIPPETS)

  const sim = (a, b) => {
    let correctness = stringSimilarity.compareTwoStrings(a, b);
    let percentDone = a.length / b.length

    return (correctness * percentDone)*100
  }
  // gameState.victory and gameState.endTime updated when target.value === snippet
  const updateUserText = e => {
    setUserText(e.target.value);
    setCompletion(sim(userText, snippet))

    if (e.target.value === snippet) {
      setGameState({ ...gameState, victory: true, endTime: (new Date().getTime() - gameState.startTime)/1000 })
      setCompletion(100)
    }
  }

  useEffect(() => {
    if (gameState.victory) {
      document.title = 'Victory!'}
    else {
      document.title="Type Racer - Go!"
    }
  });

  // gameState.startTime updated with selection of snippet
  const chooseSnippet = snippetIndex => () => {
    console.log('set snippet', snippetIndex);
    setSnippet(challenges[snippetIndex]);
    setGameState({... gameState, startTime: new Date().getTime(), victory: false })
    setCompletion(0)
    setUserText('')
    document.getElementById("input").focus();
    document.getElementById("drop").blur();
  };



  var width = {width: `${completion}%`}

  return (
    <div className="container">
      <h2>Type Racer</h2>
      <h3 id="header">{gameState.victory ? `Done! 🎉 Time: ${gameState.endTime} seconds ... choose a new challenge` : 'Choose a challenge and copy the text as fast as you can...'}</h3>
      {gameState.victory ? 
      <div className="progress success">
        <div className="progress-bar striped animated-stripe" style={width}></div>
      </div> :
      <div className="progress secondary">
        <div className="progress-bar striped animated-stripe" style={width}></div>
      </div>
      }
      <hr />
      <h3>Text: {snippet}</h3>
      
      <input id="input" value={userText} onChange={updateUserText} />
      <hr />

      <div className="dropdown btn secondary" id="drop">
        <div>Typing Challenges</div>
          <ul className="dropdown-menu">
          {challenges.map((challenge, index) => (
          // refactor SNIPPETS to include ids
          <li><a onClick={chooseSnippet(index)} key={index}>
          {challenge.substring(0, 10)}...
          </a></li>
          ))}
        </ul>
      </div>
      <h3>Or add a challenge... </h3>
      <input id="newChallenge" />
      <button className="btn secondary" onClick={() => {
        setChallenges([...challenges, document.getElementById("newChallenge").value]);
        document.getElementById("newChallenge").value = ''}}>Add Challenge</button>
    </div>
  )
}

export default App;