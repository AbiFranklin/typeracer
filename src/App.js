import React, {useState} from 'react';

const App = () => {
  const SNIPPETS = [
    'Bears, beets, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hangout? The Foo Bar'
  ];
  const [snippet, setSnippet] = useState('');
  const [userText, setUserText] = useState('');

  const updateUserText = e => {
    setUserText(e.target.value);
    console.log('Current User Text', userText);
  }

  const chooseSnippet = snippetIndex => () => {
    console.log('set snippet', snippetIndex);
    setSnippet(SNIPPETS[snippetIndex]);
  };

  return (
    <div>
      <h2>Type Racer</h2>
      <hr />
      <h3>Snippet</h3>
      {snippet}
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