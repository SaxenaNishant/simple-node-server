import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState(null)

  useEffect(() => {
    let timerId;
      const fetchUsers = () => {
          fetch(`https://dummyjson.com/users/search?q=${name}`).then(res => res.json()).then(result => {
            setUserLists(result.users);
            setLoading(false)
          })
      }

      timerId = setTimeout(fetchUsers, 2000);
      return () => {
        clearTimeout(timerId)
      }
  }, [name])

  const handleChange = (e) => {
    if(!loading) {
      setLoading(true)
    }
    setName(e.target.value)
  }
  return <>
    <h1>Search</h1>

    <input type="text" name="name" value={name} onChange={handleChange} placeholder='enter name...'/>
    {loading && <p>Loading...</p>}
    {!userLists &&<p>No search has been performed yet</p>}
    {userLists && userLists.length ? <>
      <p>Search Results</p>
      {userLists.map(user => <div>{`${user.firstName} - ${user.lastName}`}</div>)}
    </>: <p>No results found</p>}
  </>
}

export default App
