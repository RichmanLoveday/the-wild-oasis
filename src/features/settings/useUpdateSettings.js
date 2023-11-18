import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export const useUpdateSettings = () => {
    // communicating with mutation
    const queryClient = useQueryClient();

    // For editing cabin
    const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Settings successfully edited");
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
        },
        onError: (error) => toast.error(error),
    });

    return { isUpdating, updateSetting }

}