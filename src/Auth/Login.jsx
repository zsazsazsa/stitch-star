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
          <h1><span className="star">E</span>stitchstar<span className="star">E</span></h1>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="form-control"
                placeholder="email address"
                required
                autoFocus
              />
              <button className="login-btn" type="submit">
                sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  )
}
