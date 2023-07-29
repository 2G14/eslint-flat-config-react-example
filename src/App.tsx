import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      <h1>React</h1>
      <button type="button" onClick={incrementCount}>
        count is {count}
      </button>
    </>
  );
}

export default App;
