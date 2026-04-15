function Button({ children, type = 'button', onClick, className = '' }) {
  const buttonClassName = `ui-button ${className}`.trim()

  return (
    <button type={type} className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
