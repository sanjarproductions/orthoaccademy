function validateToken(token) {
    if (!token) {
        console.warn('Token validation failed: No token provided');
        return false;
    }

    try {
        // Check if token has correct JWT format (header.payload.signature)
        if (!token.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/)) {
            console.warn('Token validation failed: Invalid JWT format');
            return false;
        }

        const [header, payload, signature] = token.split('.');
        
        // Verify we can decode the header
        try {
            JSON.parse(atob(header));
        } catch {
            console.warn('Token validation failed: Invalid header');
            return false;
        }

        // Decode and validate payload
        const decodedPayload = JSON.parse(atob(payload));
        const currentTime = new Date().getTime() / 1000;

        // Validate required payload fields
        if (!decodedPayload.exp) {
            console.warn('Token validation failed: Missing expiration');
            return false;
        }

        // Check if token is expired (with 5 second buffer)
        if (currentTime >= decodedPayload.exp - 5) {
            console.warn('Token validation failed: Token expired or about to expire', {
                currentTime,
                expiryTime: decodedPayload.exp,
                timeLeft: decodedPayload.exp - currentTime
            });
            return false;
        }

        // Validate signature exists (if token should be signed)
        if (!signature) {
            console.warn('Token validation failed: Missing signature');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Token validation failed:', error.message, {
            token: token.substring(0, 10) + '...' // Log only beginning of token for security
        });
        return false;
    }
}

export default validateToken;