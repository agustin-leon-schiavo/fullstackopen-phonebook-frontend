const PersonsToShow = ({persons, filter, removePerson}) => {
    return (
        <div>
            {persons
                .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map(person => <p key={person.name}>
                    {person.name} {person.number}
                    <button onClick={() =>removePerson(person.id)}>Delete</button>
                    </p>)}
        </div>
    )
}

export default PersonsToShow
