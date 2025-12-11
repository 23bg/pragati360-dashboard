
export interface LoginPayload {
    email: string;
}

export interface SignupPayload {
    name: string;
    email: string;
    phoneNumber: string;
}

export interface verificationPayload {
    email: string;
    otp: string
}
