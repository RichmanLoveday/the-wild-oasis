import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";


export const useDeleteCabin = () => {
    // communicate with queryClient to set invalidate
    const queryClient = useQueryClient();

    // mutate data, that is to delte data
    const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: deleteCabinApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });

            toast.success("Cabin successfully deleted");
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteCabin };
}