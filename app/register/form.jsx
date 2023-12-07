"use client"

import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useState } from "react";

export const RegisterForm = () =>
{
    const [ loading, setLoading ] = useState( false );
    const [ formValues, setFormValues ] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [ error, setError ] = useState("");
    const [ checked, setChecked ] = useState( false );

    const onSubmit = async (e) =>
    {
        e.preventDefault();

        if( !checked )
        {
            alert( "Please accept the Terms & Conditions and Privacy Policy to continue" );
            return;
        }

        setLoading( true );
        setFormValues({ name: "", email: "", password: "" });

        try
        {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setLoading( false );
            if( !res.ok )
            {
                setError( (await res.json()).message );
                return;
            }

            const { user } = await res.json();
            // (cf) user: {
            //     name: name,
            //     email: email,
            //     password: password
            // }

            signIn( "credentials", {
                redirect: true,
                email: user.email,
                password: user.password,
                callbackUrl: "/",
            });
        }
        catch( error )
        {
            setLoading( false );
            setError( error );
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const checkHandler = (e) => {
        // console.log('checked:', e.target.checked);
        setChecked( e.target.checked );
    };

    const inputStyle = "py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400";
    const svgDiv = "hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3";
    const svgPath = "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z";
    const labelStyle = "block text-sm mb-2 dark:text-white";
    const errStyle = "hidden text-xs text-red-600 mt-2";
    const signupStyle = "py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800";
    const acceptStyle = "text-blue-600 decoration-2 hover:underline font-medium";

    return (
        <div className="h-full dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
            <div className="w-full max-w-md mx-auto p-6">
                <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign up</h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?
                                <a href="/login" className="text-blue-600 decoration-2 hover:underline font-medium ml-1.5">
                                    Sign in here
                                </a>
                            </p>
                        </div>
                        <div className="mt-5">
                            <form onSubmit={onSubmit} autoComplete="on">

                                {/* error */}
                                {error && (
                                    <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
                                )}

                                <div className="grid gap-y-4">

                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className={labelStyle}>Name</label>
                                        <div className="relative">
                                            <input 
                                                type="name" id="name" name="name" 
                                                value={formValues.name} 
                                                onChange={handleChange} 
                                                className={inputStyle} 
                                                autoComplete="current-name" 
                                                required 
                                                aria-describedby="name-error"/>
                                            <div className={svgDiv}>
                                                <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path d={svgPath}/>
                                                </svg>
                                            </div>
                                        </div>
                                        <p className={errStyle} id="name-error">Please enter a valid user name</p>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className={labelStyle}>Email address</label>
                                        <div className="relative">
                                            <input 
                                                type="email" id="email" name="email" 
                                                value={formValues.email} 
                                                onChange={handleChange} 
                                                className={inputStyle} 
                                                autoComplete="current-email" 
                                                required 
                                                aria-describedby="email-error"/>
                                            <div className={svgDiv}>
                                                <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path d={svgPath}/>
                                                </svg>
                                            </div>
                                        </div>
                                        <p className={errStyle} id="email-error">Please include a valid email address so we can get back to you</p>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label htmlFor="password" className={labelStyle}>Password</label>
                                        <div className="relative">
                                            <input 
                                                type="password" id="password" name="password" 
                                                value={formValues.password} 
                                                onChange={handleChange} 
                                                className={inputStyle} 
                                                autoComplete="current-password" 
                                                required 
                                                aria-describedby="password-error"/>
                                            <div className={svgDiv}>
                                                <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path d={svgPath}/>
                                                </svg>
                                            </div>
                                        </div>
                                        <p className={errStyle} id="password-error">8+ characters required</p>
                                    </div>

                                    {/* Checkbox */}
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <input id="remember-me" name="remember-me" type="checkbox" onChange={checkHandler} />
                                        </div>
                                        <div className="ml-3">
                                            <label htmlFor="remember-me" className="text-sm dark:text-white">
                                                I accept the <Link target="_blank" href="/register/terms" className={acceptStyle}>Terms & Conditions</Link> and <Link target="_blank" href="/register/privacy" className={acceptStyle}>Privacy Policy</Link>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Sign Up */}
                                    <button type="submit" className={signupStyle} disabled={loading}>
                                        {loading ? "Loading..." : "Sign up"}
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}