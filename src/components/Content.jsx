import Home from "./Home";
import Login from "./Login";

const Content = () => {
    const isLoginPage = window.location.pathname === "/login";
  return (
        <main>
            {isLoginPage? <Login /> : <Home />}
        </main>
  )
}

export default Content