import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import FeatureItem from '../components/ui/FeatureItem'
import InputField from '../components/ui/InputField'
import '../App.css'

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)

  const cardTitle = isSignUp ? 'Create Account' : 'Welcome Back'
  const cardSubtitle = isSignUp
    ? 'Fill in your details to create a new account'
    : 'Sign in to your account to continue'

  return (
    <div className="login-root-center">
      <main className="login-page">
        <section className="brand-panel">
          <header className="brand-header">
            <span className="brand-icon" aria-hidden="true">
              E
            </span>
            <div>
              <h1>EduEnroll NZ</h1>
              <p>Digital Student Enrolment Platform</p>
            </div>
          </header>

          <div className="feature-list">
            <FeatureItem
              iconClassName="feature-icon enrollment"
              title="Streamlined Enrolments"
              description="Replace paper forms with a secure online enrolment system designed for New Zealand schools."
            />
            <FeatureItem
              iconClassName="feature-icon workflow"
              title="Automated Workflows"
              description="From submission to approval, track every step of the enrolment journey."
            />
            <FeatureItem
              iconClassName="feature-icon support"
              title="Multilingual Support"
              description="Available in English, Te Reo Maori, and Mandarin Chinese."
            />
          </div>
        </section>

        <Card className="login-card">
          <h2>{cardTitle}</h2>
          <p className="card-subtitle">{cardSubtitle}</p>

          <form className="login-form" onSubmit={(event) => event.preventDefault()}>
            {isSignUp && (
              <InputField id="name" label="Name" placeholder="Enter your name" type="text" />
            )}
            <InputField id="email" label="Email" placeholder="Enter your email" type="email" />
            <InputField id="password" label="Password" placeholder="Enter your password" type="password" />
            {isSignUp && (
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
              />
            )}

            <Button type="submit">{isSignUp ? 'Create Account' : 'Sign In'}</Button>
            <Button type="button" className="secondary" onClick={() => setIsSignUp((p) => !p)}>
              {isSignUp ? 'Back to Sign In' : 'Sign Up'}
            </Button>
          </form>
          <p className="login-demo-link">
            <Link to="/parent/dashboard">View parent dashboard (demo)</Link>
          </p>
        </Card>
      </main>
    </div>
  )
}

export default LoginPage
