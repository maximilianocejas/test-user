
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import UserList from './components/UserList'
import { SortBy, User } from './types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColor,setShowColor] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sorting,setSorting] = useState<SortBy>(SortBy.NONE)
  const usersInitialRef = useRef<User[]>([])
  const [filterCountry, setFilterContry] = useState<string | null>(null)
  useEffect(()=>{
    fetch('https://randomuser.me/api/?results=100')
    .then((res)=> res.json())
    .then((data)=> {
      setUsers(data.results)
      usersInitialRef.current = data.results
    })
    .catch((error)=>console.log('Error:',error))
    .finally(()=> setLoading(false))
  },[])

  const handleUsersReset = ()=>{
    setUsers(usersInitialRef.current)
  }
    const toggleColor = ()=>{
        setShowColor(!showColor)
    }
    const toggleSortByCountry=()=>{
      const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
      setSorting(newSorting)
    }
    const handleDelete = (email: string)=>{
      setUsers(()=>{
        return users.filter((user)=> user.email !== email)
      })
    }
    const handleSortBy = (sort: SortBy)=>{
      setSorting(sort)
    }
    const filteredUsers = useMemo(()=>{
      return filterCountry ?
      users.filter(user=>{
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      }): users
    },[users, filterCountry])
  
    
    const sortedUsers = useMemo(()=>{
      if (sorting === SortBy.NONE) return filteredUsers
      const compareSortProperty : Record<string,(user:User)=> any> = {
        [SortBy.COUNTRY] : user => user.location.country,
        [SortBy.NAME] : user => user.name.first,
        [SortBy.LAST] : user => user.name.last 
      }

      return filteredUsers.toSorted((a,b)=>{
        const extractProperty = compareSortProperty[sorting]
        return extractProperty(a).localeCompare(extractProperty(b))
      })
    },[filteredUsers, sorting])

      
   
  return (
    <>
    <header style={{display: "flex",flexDirection:"column"}}>
      <div>
      <h1>Prueba técnica</h1>
      </div>
      <div>
      <button onClick={toggleColor}>Colorear filas</button>
      <button onClick={toggleSortByCountry}>
        {sorting?'Desordenar por país':'Ordenar por país'}
      </button>
      <button onClick={handleUsersReset}>Resetear estado</button>
      <input onChange={(e)=> setFilterContry(e.target.value)} placeholder='Filtrar por país'/>
      </div>
      
     
    </header>
      <main style={{width:"100%", display: "flex",flexDirection:"column", marginTop:"24px"}}>
        {loading && <p>Loading...</p>}
        {users && <UserList handleSortBy={handleSortBy} users={sortedUsers} showColor={showColor} handleDelete={handleDelete}/>}
      </main>
    </>
  )
}

export default App
