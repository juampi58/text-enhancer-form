import { useState } from 'react';
import './App.css';
import CommentsPage from './CommentsPage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CommentsPage />
    </>
  );
}

export default App;
