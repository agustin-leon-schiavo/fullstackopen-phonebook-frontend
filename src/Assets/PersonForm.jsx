const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, addName}) => {
    return (
        <form onSubmit={addName}>
            <div>
                name: <input type="text" value={newName} onChange={handleNameChange}/>
                number: <input type="text" value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
