"use client";

import React, { useEffect } from "react";
import PageWrapper from "@/components/custom/page-wrapper";
import { useUser } from "../hooks/useUser";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Loader2,
    Mail,
    Shield,
    UserRound,
    Fingerprint,
    Bell,
    SunMoon,
    Pencil,
    Phone,
} from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { appToast } from "@/components/common/AppToaster";
import UpdateUserForm from "./UpdateUserForm";
import { useAuth } from "@/features/auth/hooks/useAuth";

// ---------------------------------------------------------
// Helper
// ---------------------------------------------------------
function getRemainingTime(token?: any) {
    if (!token?.expires_in || !token?.created_at) return null;

    const expiry = token.created_at + token.expires_in * 1000;
    const diff = expiry - Date.now();

    if (diff <= 0) return "Expired";

    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);

    return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
}

export default function AccountPage() {
    const [open, setOpen] = React.useState(false);
    const { logout } = useAuth();

    // Settings States
    const [enableNotifications, setEnableNotifications] = React.useState(true);
    const [enableBiometric, setEnableBiometric] = React.useState(false);
    const [enableWhatsappAlerts, setEnableWhatsappAlerts] = React.useState(true);
    const [enableEmailAlerts, setEnableEmailAlerts] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(true);

    const { currentUser, loading, error, getCurrentUser } = useUser();

    useEffect(() => {
        getCurrentUser();
    }, []);

    if (loading) return null;

    const handleLogout = () => {
        logout();
    };

    return (
        <PageWrapper
            title="Account & Settings"
            subtitle="View and manage your personal profile and preferences"
            showBackButton
            backLabel="Back"
            isLoading={loading}
            showInitialLoadingOnly
            error={error}
            onRetry={() => getCurrentUser()}
        >
            {/* ============================
                USER INFORMATION CARD
            ============================ */}
            {currentUser && (
                <Card className=" mt-6 border shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <UserRound className="text-blue-500" /> Account Details
                            </span>
                            <Button variant="ghost" onClick={() => setOpen(true)}>
                                <Pencil className="w-4 h-4" />
                            </Button>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm opacity-60">Name</p>
                            <p className="font-medium">{currentUser.name}</p>
                        </div>

                        <div>
                            <p className="text-sm opacity-60">Email</p>
                            <p className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-500" />
                                {currentUser.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm opacity-60">Phone Number</p>
                            <p className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-green-500" />
                                {currentUser.phoneNumber || "User"}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* ============================
                CONNECTED INTEGRATIONS (ONLY IF AVAILABLE)
            ============================ */}
            {(currentUser?.isGoogleOAuthConnected ||
                currentUser?.isInstagramOAuthConnected) && (
                    <Card className="mx-auto mt-6 border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserRound className="text-blue-500" /> Connected Integrations
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">

                            {/* Google */}
                            {currentUser?.isGoogleOAuthConnected && (
                                <div className="flex items-center justify-between p-4 rounded-lg border">
                                    <div>
                                        <p className="font-medium">Google</p>
                                        <p className="text-sm opacity-60">
                                            Connected — Valid for: {getRemainingTime(currentUser.googleOAuthTokens)}
                                        </p>
                                    </div>
                                    <Button variant="outline">Reconnect</Button>
                                </div>
                            )}

                            {/* Instagram */}
                            {currentUser?.isInstagramOAuthConnected && (
                                <div className="flex items-center justify-between p-4 rounded-lg border">
                                    <div>
                                        <p className="font-medium">Instagram</p>
                                        <p className="text-sm opacity-60">
                                            Connected — Valid for: {getRemainingTime(currentUser.instagramOAuthTokens)}
                                        </p>
                                    </div>
                                    <Button variant="outline">Reconnect</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

            {/* ============================
                SETTINGS SECTION
            ============================ */}


            <div className="space-y-6 mt-6">

                {/* Notifications */}
                <SettingSwitch
                    label="Enable Notifications"
                    description="Receive push alerts in the app."
                    icon={<Bell className="h-4 w-4 text-yellow-400" />}
                    checked={currentUser?.isNotificationEnable}
                    onChange={setEnableNotifications}
                    toastOn
                />

                {/* Biometrics */}
                <SettingSwitch
                    label="Enable Biometric Login"
                    description="Fingerprint / FaceID login."
                    icon={<Fingerprint className="h-4 w-4 text-green-400" />}
                    checked={currentUser?.isBiometricEnable}
                    onChange={setEnableBiometric}
                    toastOn
                />

                {/* WhatsApp Alerts */}
                <SettingSwitch
                    label="Enable WhatsApp Alerts"
                    description="Receive updates on WhatsApp."
                    icon={<IconBrandWhatsapp className="h-4 w-4 text-green-400" />}
                    checked={currentUser?.isWhatsappAlertsEnable}
                    onChange={setEnableWhatsappAlerts}
                    toastOn
                />

                {/* Email Alerts */}
                <SettingSwitch
                    label="Enable Email Alerts"
                    description="Receive important updates via email."
                    icon={<Mail className="h-4 w-4 text-pink-400" />}
                    checked={currentUser?.isEmailAlertsEnable}
                    onChange={setEnableEmailAlerts}
                    toastOn
                />

                {/* Theme */}
                <SettingSwitch
                    label="Dark Mode"
                    description="Toggle dark/light theme."
                    icon={<SunMoon className="h-4 w-4 text-purple-400" />}
                    checked={darkMode}
                    onChange={(checked: boolean) => {
                        setDarkMode(checked);
                        document.documentElement.classList.toggle("dark", checked);
                    }}
                    toastOn
                />

                {/* Logout */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-red-400/40">
                    <div>
                        <p className="font-medium text-red-500">Logout</p>
                        <p className="text-sm opacity-60">Sign out from this device.</p>
                    </div>
                    <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                </div>

            </div>


            <UpdateUserForm open={open} setOpen={setOpen} />
        </PageWrapper>
    );
}

// ---------------------------------------------------------
// Reusable Setting Switch Component
// ---------------------------------------------------------
function SettingSwitch({ label, description, icon, checked, onChange, toastOn }: any) {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
                <p className="font-medium flex items-center gap-2">
                    {icon}
                    {label}
                </p>
                <p className="text-sm opacity-60">{description}</p>
            </div>

            <Switch
                checked={checked}
                onCheckedChange={(v) => {
                    onChange(v);
                    if (toastOn)
                        v ? appToast.warning(`${label} enabled`) : appToast.info(`${label} disabled`);
                }}
                className="data-[state=checked]:bg-blue-600"
            />
        </div>
    );
}
