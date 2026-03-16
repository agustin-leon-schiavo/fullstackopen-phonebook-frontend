const Notification = ({ message, type }) => {
  const successStyle = {
    color: 'green',
    fontSize: '20px',
    border: 'solid 1px green',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px'
  }

  const errorStyle = {
    color: 'red',
    fontSize: '20px',
    border: 'solid 1px red',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px'
  }

  if (message === null) {
    return null
  }

  const style = type === 'error' ? errorStyle : successStyle

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
