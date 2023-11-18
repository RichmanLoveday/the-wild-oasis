import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";


export const useDeleteBooking = () => {
    // communicate with queryClient to set invalidate
    const queryClient = useQueryClient();

    // mutate data, that is to delte data
    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: deleteBookingApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });

            toast.success("Booking successfully deleted");
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteBooking };
}