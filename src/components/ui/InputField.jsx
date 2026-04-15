function InputField({ id, label, type = 'text', placeholder = '' }) {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} placeholder={placeholder} />
    </div>
  )
}

export default InputField
