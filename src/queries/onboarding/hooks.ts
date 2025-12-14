import { useMutation } from "@tanstack/react-query"
import { serverAction } from "../lib"
import { updateProfile } from "./actions"

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: serverAction(updateProfile),
    })
}