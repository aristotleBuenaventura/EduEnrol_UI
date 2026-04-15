function Card({ children, className = '' }) {
  const combinedClassName = `ui-card ${className}`.trim()

  return <section className={combinedClassName}>{children}</section>
}

export default Card
