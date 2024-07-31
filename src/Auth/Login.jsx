import { useNavigate } from "react-router-dom"
import "./Login.css"
import { useState } from "react"
import { getUserByEmail } from "../Services/UserService"

export const Login = () => {
  const [email, set] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "stitch_user",
          JSON.stringify({
            id: user.id
          })
        )

        navigate("/projects")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1 className="logo">
            <span className="orange">S</span>
            <span className="pink">t</span>
            <span className="green">i</span>
            <span className="red">t</span>
            <span className="orange">c</span>
            <span className="pink">h</span>

            <span className="green">S</span>
            <span className="red">t</span>
            <span className="orange">a</span>
            <span className="pink">r</span>
            <span className="green">*</span>
            </h1>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="form-control"
                placeholder="Email Address"
                required
                autoFocus
              />
              <button className="login-btn" type="submit">
                Sign In
              </button>
              <button className="login-btn" type="submit" onClick={() => {
                navigate("/register")
              }}>
                Register Here
              </button>
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  )
}
