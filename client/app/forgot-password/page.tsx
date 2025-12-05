"use client"

import ButtonFooter from "@/components/ButtonFooter"
import { useState } from "react";
import { authAPI } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbarr";
import { Footeer } from "@/components/Footeer";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await authAPI.forgotPassword(email);
            setSuccess("Password reset link has been sent to your email.");
            setEmail("");
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : typeof err === "string" ? err : "Failed to send reset email. Please try again.";
            setError(message);
            console.error("Forgot password error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-black min-h-screen min-w-dvh pt-24 pb-20 px-4 flex items-center" 
                style={{ backgroundImage: "url('/signupbg.jpg')", backgroundSize: "cover", backgroundPosition: "center"  }}
            > 
                <div className="top-1 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                
                {/* Left Section */}
                <div className="order-1 lg:order-0 text-white mt-6 lg:mt-10">
                    
                    <h1 className="text-2xl md:text-3xl text-center text-nowrap bbh-sans-bartle">
                        Reset Your Password
                    </h1>

                    <p className="mt-12 text-left text-neutral-300 text-4xl font-bold md:text-center sm:text-center zalando-sans-expanded">
                        No worries! Enter your email and we&apos;ll send you a link to reset your password.
                    </p>

                    <p className="mt-12 text-left text-neutral-300 text-4xl font-bold md:text-center sm:text-center zalando-sans-expanded">
                        Check your inbox and follow the instructions to create a new password.
                    </p>

                    <div className="flex justify-center mt-8">
                        <ButtonFooter title="Back to Sign In" href="/signin"/>
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="-mt-9 lg:-mt-12">
                    <div className="shadow-input mx-auto w-full max-w-md rounded-2xl bg-slate-400 p-4 md:rounded-2xl md:p-8 dark:bg-black">
                        <h2 className="text-xl font-bold text-black dark:text-neutral-200">
                            Forgot Password?
                        </h2>
                        <p className="mt-2 max-w-sm text-sm text-black dark:text-neutral-300">
                            Enter your email to receive a reset link
                        </p>

                        {error && (
                            <div className="mt-4 p-3 rounded-md bg-red-500/10 border border-red-500/50">
                                <p className="text-sm text-red-500">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="mt-4 p-3 rounded-md bg-green-500/10 border border-green-500/50">
                                <p className="text-sm text-red-500">{success}</p>
                            </div>
                        )}

                        <form className="my-8" onSubmit={handleSubmit}>
                            <div className="flex w-full flex-col space-y-2 mb-6">
                                <Label htmlFor="email">Email Address</Label>
                                <Input 
                                    id="email" 
                                    className="cursor-pointer" 
                                    placeholder="projectmayhem@fc.com" 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                className="group/btn cursor-pointer relative block h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 bbh-sans-bartle font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Reset Link"}
                                <BottomGradient />
                            </button>
                        </form>
                    </div>
                </div>

                </div>
            </div>
            <Footeer />
        </>
    )
}

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};
