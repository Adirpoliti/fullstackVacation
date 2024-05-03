import { useForm } from "react-hook-form"
import { useState } from "react"
import { LoginCredentials, SignupCredentials } from "../../Types/Auth/AuthType"
import "./signin.css"
import { signinUser, signupUser } from "../../services/authServices/authServices"

export const Signin = () => {
    const [title, setTitle] = useState("Login")
    const [rePassErr, setRePassErr] = useState("")
    const [isSignin, setIsSignin] = useState(true)
    const [changeForm, setChangeForm] = useState("Dont have an account? Signup")

    const { register, handleSubmit, reset } = useForm<LoginCredentials | SignupCredentials>();

    const handleChangeForm = () => {
        reset();
        clearAllErrors();
        if (isSignin) {
            setIsSignin(false);
            setTitle("Sign up");
            setChangeForm("Already have an account? Signin");
        }
        else {
            setIsSignin(true);
            setTitle("Sign in");
            setChangeForm("Dont have an account? Signup");
        }
    };

    const clearAllErrors = () => {
        setRePassErr("");
    }

    const handleSigninForm = async (data: LoginCredentials | SignupCredentials) => {
        clearAllErrors()
        if (isSignin) {
            signinUser(data as LoginCredentials)
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err))
        } else {
            const signupData = data as SignupCredentials;
            if (signupData.repassword === signupData.password) {
                signupUser(data as SignupCredentials)
                    .then((res) => console.log(res.data))
                    .catch((err) => console.log(err))
            } else {
                setRePassErr("Passwords not match")
            }
        }
    };

    return (
        <>
            <div className="signinContainer">
                <h1>{title}</h1>
                <form onSubmit={handleSubmit(handleSigninForm)} className="signinForm">
                    {!isSignin && (
                        <>
                            <input {...register("firstname")} placeholder="First name" className="formInput" />
                            <input {...register("lastname")} placeholder="Last name" className="formInput" />
                        </>
                    )}
                    <input {...register("username")} placeholder="Username" className="formInput" />
                    <input {...register("password")} placeholder="Password" type="password" className="formInput" />
                    {!isSignin && (
                        <>
                            <input {...register("repassword")} placeholder="Re-password" type="password" className="formInput" />
                            {rePassErr && <span>{rePassErr}</span>}
                        </>
                    )}
                    <button className="formButton">{title}</button>
                </form>
                <p onClick={handleChangeForm} className="pageLink">{changeForm}</p>
            </div>
        </>
    )
}