import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // always override in prod

interface JwtPayload {
    id: string;
    email: string;
}

/**
 * Generate a signed JWT token
 */
export function generateToken(payload: JwtPayload, expiresIn = "7d") {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (err) {
        console.error("JWT verification failed:", err);
        return null;
    }
}

/**
 * Decode a JWT token without verifying signature (useful for non-sensitive inspection)
 */
export function decodeToken(token: string): JwtPayload | null {
    try {
        return jwt.decode(token) as JwtPayload;
    } catch (err) {
        console.error("JWT decode failed:", err);
        return null;
    }
}
