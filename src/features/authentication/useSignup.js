import { useMutation } from "@tanstack/react-query";
import { signUp as signupApi } from '../../services/apiAuth';
import toast from "react-hot-toast";

export function useSignup() {
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupApi,
        onSuccess: (user) => {
            console.log(user)
            toast.success("Account successfully created! Please verify the new account from the user's email address.");
        },

        onError: () => {
            toast.error("Unable to signup user");
        }
    });


    return { signup, isLoading };
}