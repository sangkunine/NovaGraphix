"use client";

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

    const onSubmit = async (e) =>
    {
        e.preventDefault();
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const input_style = "w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out";
    const button_style = "inline-block px-7 py-4 bg-blue-600 text-white font-bold text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 focus:outline-none w-full";

    return (
        <form onSubmit={onSubmit} autoComplete="on">
            {/* error */}
            {error && (
                <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
            )}

            {/* input: name */}
            <div className="mb-6">
                <input
                    required
                    type="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className={`${input_style}`}
                />
            </div>

            {/* input: email */}
            <div className="mb-6">
                <input
                    required
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`${input_style}`}
                />
            </div>

            {/* input: password */}
            <div className="mb-6">
                <input
                    required
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`${input_style}`}
                />
            </div>

            {/* button: submit */}
            <button
                type="submit"
                className={`${button_style}`}
                disabled={loading}
            >
                {loading ? "loading..." : "Sign Up"}
            </button>
        </form>
    );
}