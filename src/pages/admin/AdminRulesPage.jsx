import { useEffect, useRef, useState } from 'react'
import RuleCategoryCard from '../../components/dashboard/RuleCategoryCard.jsx'
import RuleConfigCard from '../../components/dashboard/RuleConfigCard.jsx'
import { adminRuleCategorySummary, adminRulesList } from '../../data/adminRulesDummy.js'

const iconByName = {
  zoning: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s6-5.8 6-11a6 6 0 1 0-12 0c0 5.2 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  capacity: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="9" r="2.8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.8 18.5c0-2.2 2.2-4 4.9-4s4.9 1.8 4.9 4M13 18.5c.4-1.5 1.9-2.6 3.8-2.6 1.5 0 2.8.7 3.4 1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  completeness: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M7 4h7l4 4v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 4v4h4M9 13h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  routing: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M7 7h12M7 7l3-3M7 7l3 3M17 17H5M17 17l-3-3M17 17l-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

function AdminRulesPage() {
  const [rules, setRules] = useState(adminRulesList)
  const [editingRuleId, setEditingRuleId] = useState(null)
  const [showToggleToast, setShowToggleToast] = useState(false)
  const toastTimerRef = useRef(null)

  const handleToggleRule = (ruleId) => {
    setRules((previousRules) =>
      previousRules.map((rule) => (rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule)),
    )
    setEditingRuleId((previousEditingRuleId) => (previousEditingRuleId === ruleId ? null : previousEditingRuleId))
    setShowToggleToast(true)
  }

  const handleFieldChange = (ruleId, field, value) => {
    setRules((previousRules) =>
      previousRules.map((rule) => (rule.id === ruleId ? { ...rule, [field]: value } : rule)),
    )
  }

  const summaryCards = adminRuleCategorySummary.map((item) => {
    const categoryRules = rules.filter((rule) => rule.icon === item.icon)
    const total = categoryRules.length
    const active = categoryRules.filter((rule) => rule.isActive).length
    return {
      ...item,
      statusText: `${active}/${total} active`,
    }
  })

  useEffect(() => {
    if (!showToggleToast) {
      return undefined
    }

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
    }

    toastTimerRef.current = setTimeout(() => {
      setShowToggleToast(false)
    }, 2200)

    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current)
      }
    }
  }, [showToggleToast])

  return (
    <div className="admin-rules">
      <header className="admin-rules__hero">
        <div>
          <h1 className="admin-rules__title">Rules Configuration</h1>
          <p className="admin-rules__subtitle">Configure automated rules for enrolment processing</p>
        </div>
        <button type="button" className="admin-rules__cta">
          <span aria-hidden="true">+</span>
          <span>Add Rule</span>
        </button>
      </header>

      <section className="admin-rules__summary" aria-label="Rule categories summary">
        {summaryCards.map((item) => (
          <RuleCategoryCard
            key={item.id}
            icon={iconByName[item.icon]}
            title={item.title}
            statusText={item.statusText}
            tone={item.tone}
          />
        ))}
      </section>

      <section className="admin-rules__list" aria-label="Configured rules">
        {rules.map((rule) => (
          <RuleConfigCard
            key={rule.id}
            id={rule.id}
            icon={iconByName[rule.icon]}
            title={rule.title}
            tone={rule.icon}
            category={rule.category}
            priority={rule.priority}
            description={rule.description}
            condition={rule.condition}
            action={rule.action}
            isActive={rule.isActive}
            isEditing={editingRuleId === rule.id}
            onEdit={() => (rule.isActive ? setEditingRuleId(rule.id) : null)}
            onToggle={() => handleToggleRule(rule.id)}
            onSave={() => setEditingRuleId(null)}
            onFieldChange={(field, value) => handleFieldChange(rule.id, field, value)}
          />
        ))}
      </section>

      {showToggleToast ? (
        <div className="admin-rules__toast" role="status" aria-live="polite">
          <span className="admin-rules__toast-icon" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" fill="currentColor" />
              <path
                d="m8.3 12.1 2.3 2.3 5.1-5.1"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>Rule updated</span>
        </div>
      ) : null}
    </div>
  )
}

export default AdminRulesPage
