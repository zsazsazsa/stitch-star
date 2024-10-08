import { Routes, Route } from "react-router-dom"
import { Authorized } from "./Views/Authorized"
import { Login } from "./Auth/Login"
import { ApplicationViews } from "./Views/ApplicationViews"
import "./App.css"
import { Register } from "./Auth/Register"

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={
        <Authorized>
          <ApplicationViews />
        </Authorized>
      } />

    </Routes>
  )
}
