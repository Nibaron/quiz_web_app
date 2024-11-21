import Field from "../common/fields";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import axios from "axios";
import { useState } from "react";

const LoginForm = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const submitForm = async (formData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, formData);

            if (response.status === 200) {
                const { tokens, user } = response.data.data;
                if (tokens) {
                    const authToken = tokens.accessToken;
                    const refreshToken = tokens.refreshToken;

                    console.log(`Login time auth token: ${authToken}`);
                    setAuth({ user, authToken, refreshToken });

                    if (isAdmin) navigate("/admin/dashboard");
                    else navigate("/");
                }
            }
        } catch (error) {
            console.error(error);
            setError("root.random", {
                type: "random",
                message: `User with email ${formData.email} is not found`,
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(submitForm)} >
            <div className="mb-4">
                <Field label="Enter your username or email address" error={errors.email}>
                    <input
                        {...register("email", { required: "Email ID is Required" })}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                        type="email"
                        id="email"
                        placeholder="Username or email address"
                        autoComplete="email"
                    />
                </Field>
            </div>

            <div className="mb-6">
                <Field label="Enter your Password" error={errors.password}>
                    <input
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Your password must be at least 8 characters",
                            },
                        })}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                        type="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="password"
                    />
                </Field>
            </div>

            <div className="mb-6 flex gap-2 items-center">
                <input type="checkbox" id="admin" className="px-4 py-3 rounded-lg border border-gray-300" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
                <label htmlFor="admin" className="block ">Login as Admin</label>
            </div>
            <p className="text-red-600">{errors?.root?.random?.message}</p>
            <Field>
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg mb-4">Sign in</button>
            </Field>

        </form>
    )
}

export default LoginForm;

