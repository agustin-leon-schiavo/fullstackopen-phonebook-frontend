import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './Assets/Filter'
import PersonForm from './Assets/PersonForm'
import PersonsToShow from './Assets/PersonsToShow'
import Notification from './Assets/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personsService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const updateExisting = (person, newObject) => {
    if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
      personsService.update(person.id, newObject)
        .then(response => {
          setPersons(persons.map(p => p.id === person.id ? response.data : p))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Updated ${person.name} successfully`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Error updating ${person.name}: ${error.message}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    if (newName === '') {
      alert('Please enter a name')
      return
    }
    if (newNumber === '') {
      alert('Number is required')
      return
    }

    const nameObject = { name: newName, number: newNumber }
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      updateExisting(existingPerson, nameObject)
      return
    }

    personsService.create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${nameObject.name} successfully`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Error adding ${nameObject.name}: ${error.message}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removePerson = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    if (window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)) {
      personsService.remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`Deleted ${personToDelete.name} successfully`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Error deleting ${personToDelete.name}: ${error.message}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  return (
    <div>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName} />
      <h2>Numbers</h2>
      <PersonsToShow persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  )
}

export default App