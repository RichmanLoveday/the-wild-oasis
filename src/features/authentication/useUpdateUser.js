import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export const useUpdateUser = () => {
    // communicating with mutation
    const queryClient = useQueryClient();

    // For editing cabin
    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            toast.success("User account successfully updated");
            //   queryClient.setQueryData("user", user)
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },
        onError: (error) => toast.error(error.message),
    });

    return { isUpdating, updateUser }

}