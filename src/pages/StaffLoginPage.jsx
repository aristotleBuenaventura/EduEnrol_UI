import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import InputField from '../components/ui/InputField'
import '../App.css'

function StaffLoginPage() {
  return (
    <div className="staff-login-root">
      <Card className="staff-login-card">
        <span className="staff-shield-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3 19 6v5.8c0 4.2-2.9 8.1-7 9.6-4.1-1.5-7-5.4-7-9.6V6l7-3Z"
              stroke="currentColor"
              strokeWidth="1.85"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2>Staff Portal</h2>
        <p className="card-subtitle">Sign in with your staff credentials</p>

        <form className="login-form" onSubmit={(event) => event.preventDefault()}>
          <InputField id="staff-username" label="Username" placeholder="Enter your username" type="text" />
          <InputField id="staff-password" label="Password" placeholder="Enter your password" type="password" />
          <Button type="submit">Sign In</Button>
        </form>

        <p className="staff-parent-link">
          Parent or guardian? <Link to="/">Sign in here</Link>
        </p>
      </Card>
    </div>
  )
}

export default StaffLoginPage
