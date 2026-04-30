import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import FeatureItem from '../components/ui/FeatureItem'
import InputField from '../components/ui/InputField'
import { IconGradCap } from '../components/icons/NavIcons.jsx'
import '../App.css'

function LoginPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const navigate = useNavigate()

  const featureItems = isRegisterMode
    ? [
        {
          iconClassName: 'feature-icon enrollment',
          title: 'Easy Registration',
          description: "Create your account to start managing your child's school enrolment online.",
        },
        {
          iconClassName: 'feature-icon workflow',
          title: 'Secure & Private',
          description: 'Your data is protected with industry-standard encryption and privacy controls.',
        },
        {
          iconClassName: 'feature-icon support',
          title: 'Access Anywhere',
          description: 'Complete enrolment forms from any device - desktop, tablet, or mobile.',
        },
      ]
    : [
        {
          iconClassName: 'feature-icon enrollment',
          title: 'Streamlined Enrolments',
          description:
            'Replace paper forms with a secure online enrolment system designed for New Zealand schools.',
        },
        {
          iconClassName: 'feature-icon workflow',
          title: 'Automated Workflows',
          description: 'From submission to approval, track every step of the enrolment journey.',
        },
        {
          iconClassName: 'feature-icon support',
          title: 'Multilingual Support',
          description: 'Available in English, Te Reo Maori, and Mandarin Chinese.',
        },
      ]

  return (
    <div className="login-root-center">
      <main className="login-page">
        <section className="brand-panel">
          <header className="brand-header">
            <span className="brand-icon" aria-hidden="true">
              <IconGradCap width={22} height={22} />
            </span>
            <div>
              <h1>EduEnroll NZ</h1>
              <p>Digital Student Enrolment Platform</p>
            </div>
          </header>
          <p className="ministry-badge">
            <span className="ministry-badge__icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3 18.5 5.8v5.5c0 4.1-2.8 7.9-6.5 9.3-3.7-1.4-6.5-5.2-6.5-9.3V5.8L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m9.2 12 1.9 1.9 3.6-3.6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Ministry of Education (MoE) Verified</span>
          </p>

          <div className="feature-list">
            {featureItems.map((feature) => (
              <FeatureItem
                key={feature.title}
                iconClassName={feature.iconClassName}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        <Card className="login-card">
          <h2>{isRegisterMode ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="card-subtitle">
            {isRegisterMode
              ? 'Register to start your enrolment journey'
              : 'Sign in to your account to continue'}
          </p>

          <form className="login-form" onSubmit={(event) => event.preventDefault()}>
            {isRegisterMode && (
              <InputField id="username" label="Username" placeholder="Choose a username" type="text" />
            )}
            <InputField id="email" label="Email" placeholder="Enter your email" type="email" />
            <InputField
              id="password"
              label="Password"
              placeholder={isRegisterMode ? 'Create a password' : 'Enter your password'}
              type="password"
            />
            {isRegisterMode && (
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
              />
            )}
            {!isRegisterMode && (
              <p className="forgot-password-link">
                <a href="#">Forgot password?</a>
              </p>
            )}

            <Button type="submit">{isRegisterMode ? 'Create Account' : 'Sign In'}</Button>
          </form>
          <p className="register-text">
            {isRegisterMode ? 'Already have an account?' : 'Do not have an account?'}{' '}
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault()
                setIsRegisterMode((previousValue) => !previousValue)
              }}
            >
              {isRegisterMode ? 'Sign in' : 'Register'}
            </a>
          </p>
          <p className="self-register-link">
            <Link to="/staff-login">Staff Login</Link>
          </p>
          <div className="login-demo-actions">
            <Button className="login-demo-button" onClick={() => navigate('/parent/dashboard')}>
              View parent dashboard (demo)
            </Button>
            <Button className="login-demo-button" onClick={() => navigate('/admin/dashboard')}>
              View admin dashboard (demo)
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}

export default LoginPage
