import Button from './components/ui/Button'
import Card from './components/ui/Card'
import FeatureItem from './components/ui/FeatureItem'
import InputField from './components/ui/InputField'
import './App.css'

function App() {
  return (
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
        <h2>Welcome Back</h2>
        <p className="card-subtitle">Sign in to your account to continue</p>

        <form className="login-form">
          <InputField
            id="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
          />
          <InputField
            id="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <Button type="submit">Sign In</Button>
        </form>
      </Card>
    </main>
  )
}

export default App
