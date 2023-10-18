import { useState, useContext, useEffect } from "react";
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, register, msg, current: user } = useContext(DataContext);
    const navigate = useNavigate();
    //console.log(email, password);
    //console.log(user);

    const userLogin = async (email, password) => {
        try{
            login(email, password);
            setEmail("");
            setPassword("");
        }catch(err) {
            console.log(`Error in login: ${err.message}`);
            setEmail(email);
            setPassword(password);
        }

    }

    const userRegister = async (email, password) => {
        try{
            await register(email, password);
            setEmail("");
            setPassword("");
        } catch(err) {
            console.log(`Error in registration: ${err.message}`);
            setEmail(email);
            setPassword(password);
        }

    }

    useEffect(()=> {
        if(user) return navigate("/")
    }, [navigate, user])



    return (
            <>
                <section className="mt-[10vh] h-[70vh]">
                <div className="flex flex-col gap-y-4 items-center justify-center">
                <h1 className="font-semibold font-roboto text-2xl md:text-3xl lg:text-4xl">Login or register</h1>
                    <form onSubmit={e => e.preventDefault()} className="w-[60vh] flex items-center justify-center flex-col gap-y-8 bg-red-200 p-6">

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                setEmail(e.target.value);
                                }}
                                className="border border-b border-b-black py-4 bg-gray-200 px-2 rounded-lg w-[80%]"
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                setPassword(e.target.value);
                                }}
                                className="border border-b border-b-black py-4 bg-gray-200 px-2 rounded-lg w-[80%]"
                            />

                            <div className="flex items-center justify-between gap-x-6 w-[80%]">

                                <button
                                className="button bg-purple-500 px-4 py-2 font-semibold text-white font-roboto rounded-sm text-sm"
                                type="button"
                                onClick={() => userLogin(email, password)}
                                >
                                    Login
                                </button>

                                <button
                                className="button  bg-purple-500 px-4 py-2 text-white font-semibold font-roboto rounded-sm text-sm"
                                type="button"
                                onClick={() => userRegister(email, password)}
                                >
                                    Register
                                </button>

                        </div>
                    </form>
                    <p className="text-base font-roboto">{msg}</p>
            </div>
        </section>
    </>
    );
  
}

export default Login