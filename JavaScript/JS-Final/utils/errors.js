export function errorResponse(code = "UNKNOWN", message = "Unknown error", hints = []) {
    return {
        error: true,
        code: String(code),
        message: String(message),
        hints: Array.isArray(hints) ? hints : [String(hints)]
    };
}