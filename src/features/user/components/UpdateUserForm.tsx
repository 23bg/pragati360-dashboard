import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import React from "react";

export default function UpdateUserForm({ open, setOpen }: any) {


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
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
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
                        onClick={() => {
                            console.log("Updating name:", name);
                            // TODO: call update API
                            // updateUser({ id: currentUser.id, name });
                            setOpen(false);
                        }}
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}
