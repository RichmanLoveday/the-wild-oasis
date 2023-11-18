import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export const useEditCabin = (reset) => {
    // communicating with mutation
    const queryClient = useQueryClient();

    // For editing cabin
    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin Edited successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            reset();
        },
        onError: (error) => toast.error(error),
    });

    return { isEditing, editCabin }

}