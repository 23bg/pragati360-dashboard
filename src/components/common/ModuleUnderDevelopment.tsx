import { Construction } from "lucide-react";

export default function ModuleUnderDevelopment() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
            <div className="max-w-md">
                <div className="flex items-center justify-center mb-6 animate-bounce">
                    <Construction className="w-16 h-16 text-muted-foreground" />
                </div>

                <h1 className="text-3xl font-bold mb-3 text-black">Module Under Development</h1>
                <p className="text-muted-foreground mb-6">
                    We&apos;re working hard to bring this feature to life. Stay tuned — amazing things are on the way!
                </p>

                {/* <div className="flex justify-center">
                    <button className="px-6 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm">
                        Go Back
                    </button>
                </div> */}
            </div>
        </div>
    );
}
