import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export const useCreateCabin = () => {
    // communicating with mutation
    const queryClient = useQueryClient();

    // For creating new cabin
    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (error) => toast.error(error),
    });

    return { isCreating, createCabin };
}