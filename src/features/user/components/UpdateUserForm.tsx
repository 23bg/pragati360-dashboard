import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
// import { useAppDispatch } from "@/shared/hooks/reduxHooks"; // Remove this
import { useUser } from "../hooks/useUser";
// import { updateUserProfile } from "../slices/userSlice"; // Remove this

interface UpdateUserFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function UpdateUserForm({ open, setOpen }: UpdateUserFormProps) {
    // const dispatch = useAppDispatch(); // Remove this
    const { currentUser, updateUserProfile } = useUser(); // Get updateUserProfile from useUser
    const [name, setName] = useState(currentUser?.name || "");

    useEffect(() => {
        if (currentUser?.name) {
            setName(currentUser.name);
        }
    }, [currentUser]);

    const handleSaveChanges = async () => { // Make it async
        if (currentUser?.id && name) {
            await updateUserProfile({ id: currentUser.id, payload: { name } }); // Use the mutation
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-neutral-900 border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle>Edit User Name</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Update only the name field. All other fields remain unchanged.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 mt-3">
                    <label className="text-sm text-gray-300">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-neutral-800 text-white px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <DialogFooter className="mt-6">
                    <Button
                        variant="ghost"
                        className="text-gray-300 hover:bg-neutral-800"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
