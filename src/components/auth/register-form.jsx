import Field from "../common/fields";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
    } = useForm();

    const password = watch('password');
    const submitForm = async (formData) => {
        try {
            //console.log(formData)
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`, formData
            );

            if (response.status === 201) {
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            setError('email', {
                type: 'server',
                message: `User with email ${formData.email} already exists.`,
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(submitForm)} >
            <div className="mb-4">
                <Field label="Full Name" error={errors.name}>
                    <input
                        {...register("full_name", { required: "Name is Required" })}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                        type="text"
                        id="full_name"
                        placeholder="John Doe"
                    />
                </Field>
            </div>

            <div className="mb-4">
                <Field label="Email" error={errors.email}>
                    <input
                        {...register("email", { required: "Email is Required" })}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                        type="email"
                        id="email"
                        placeholder="Email address"
                    />
                </Field>
            </div>

            <div className="flex gap-4">
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
                        />
                    </Field>
                </div>

                <div className="mb-6">
                    <Field label="Confirm Password" error={errors.confirmPassword}>
                        <input
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                }`}
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                        />
                    </Field>
                </div>
            </div>



            <div className="mb-6 flex gap-2 items-center">
                <input type="checkbox" id="admin" className="px-4 py-3 rounded-lg border border-gray-300" />
                <label id="admin" className="block ">Register as Admin</label>
            </div>
            {errors.email && <p role="alert" className="text-red-600">{errors.email.message}</p>}
            <Field>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg mb-2"
                >
                    Create Account
                </button>
            </Field>
        </form>
    )
}
