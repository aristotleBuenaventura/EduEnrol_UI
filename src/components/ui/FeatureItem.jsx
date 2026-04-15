function FeatureItem({ title, description, iconClassName = '' }) {
  return (
    <article className="feature-item">
      <span className={iconClassName} aria-hidden="true" />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  )
}

export default FeatureItem
