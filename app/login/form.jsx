"use client"

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export const LoginForm = () =>
{
    const router = useRouter();
    const [ loading, setLoading ] = useState(false);
    const [ formValues, setFormValues ] = useState({
        email: "",
        password: "",
    });
    const [ error, setError ] = useState("");

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const onSubmit = async (e) =>
    {
        e.preventDefault();

        try
        {
            setLoading( true );
            setFormValues({ email: "", password: "" });

            const res = await signIn( "credentials", {
                redirect: false,
                email: formValues.email,
                password: formValues.password,
                callbackUrl,
            });

            setLoading( false );

            if( !res.error )
            {
                router.push( callbackUrl );
            }
            else
            {
                setError("invalid email or password");
            }
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

    const oauthStyle = "w-full mb-2 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800";
    const inputStyle = "py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400";
    const svgPath = "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z";
    const svgDiv = "hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3";
    const checkboxStyle = "shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800";
    const signinStyle = "py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800";
    const errStyle = "hidden text-xs text-red-600 mt-2";
    const labelStyle = "block text-sm mb-2 dark:text-white";

    return (
        <div className="h-full dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
            <div className="w-full max-w-md mx-auto p-6">
                <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Don&apos;t have an account yet?
                                <a href="/register" className="text-blue-600 decoration-2 hover:underline font-medium ml-1.5">
                                    Sign up here
                                </a>
                            </p>
                        </div>
                        <div className="mt-5">
                            <form onSubmit={onSubmit} autoComplete="on">

                                {/* error */}
                                {error && (
                                    <p className="text-center text-slate-900 dark:text-slate-900 bg-red-300 py-3 mb-6 rounded">{error}</p>
                                )}

                                {/* Google Credentials */}
                                <button onClick={() => signIn("google", { callbackUrl })} type="button" className={oauthStyle}>
                                    <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                                        <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4"/>
                                        <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853"/>
                                        <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05"/>
                                        <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335"/>
                                    </svg>
                                    Sign in with Google
                                </button>

                                {/* GitHub Credentials */}
                                <button onClick={() => signIn("github", { callbackUrl })} type="button" className={oauthStyle}>
                                    <svg className="w-5 h-auto" viewBox="0 0 1024 1024" fill="#34A853">
                                        <path d="M511.542857 14.057143C228.914286 13.942857 0 242.742857 0 525.142857 0 748.457143 143.2 938.285714 342.628571 1008c26.857143 6.742857 22.742857-12.342857 22.742858-25.371429v-88.571428c-155.085714 18.171429-161.371429-84.457143-171.771429-101.6C172.571429 756.571429 122.857143 747.428571 137.714286 730.285714c35.314286-18.171429 71.314286 4.571429 113.028571 66.171429 30.171429 44.685714 89.028571 37.142857 118.857143 29.714286 6.514286-26.857143 20.457143-50.857143 39.657143-69.485715-160.685714-28.8-227.657143-126.857143-227.657143-243.428571 0-56.571429 18.628571-108.571429 55.2-150.514286-23.314286-69.142857 2.171429-128.342857 5.6-137.142857 66.4-5.942857 135.428571 47.542857 140.8 51.771429 37.714286-10.171429 80.8-15.542857 129.028571-15.542858 48.457143 0 91.657143 5.6 129.714286 15.885715 12.914286-9.828571 76.914286-55.771429 138.628572-50.171429 3.314286 8.8 28.228571 66.628571 6.285714 134.857143 37.028571 42.057143 55.885714 94.514286 55.885714 151.2 0 116.8-67.428571 214.971429-228.571428 243.314286a145.714286 145.714286 0 0 1 43.542857 104v128.571428c0.914286 10.285714 0 20.457143 17.142857 20.457143 202.4-68.228571 348.114286-259.428571 348.114286-484.685714 0-282.514286-229.028571-511.2-511.428572-511.2z"/>
                                    </svg>
                                    Sign in with GitHub
                                </button>

                                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                                    Or
                                </div>

                                {/* NovaGraphix Credentials */}
                                <div className="grid gap-y-4">

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
                                        <div className="flex justify-between items-center">
                                            <label htmlFor="password" className={labelStyle}>Password</label>
                                            <a className="text-sm text-blue-600 decoration-2 hover:underline font-medium" href="#">Forgot password?</a>
                                        </div>
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
                                            <input id="remember-me" name="remember-me" type="checkbox" className={checkboxStyle}/>
                                        </div>
                                        <div className="ml-3">
                                            <label htmlFor="remember-me" className="text-sm dark:text-white">Remember me</label>
                                        </div>
                                    </div>

                                    {/* Sign In */}
                                    <button type="submit" className={signinStyle} disabled={loading}>
                                        {loading ? "Loading..." : "Sign in"}
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