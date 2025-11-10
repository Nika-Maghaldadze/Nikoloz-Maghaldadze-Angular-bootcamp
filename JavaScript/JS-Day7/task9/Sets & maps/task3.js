function createCache(ttl) {
    const store = new Map();
    return {
        set(key, value) {
            const expiry = Date.now() + ttl;
            store.set(key, { value, expiry });
        },
        get(key) {
            const entry = store.get(key);
            if (!entry) {
                return "EXPIRED";
            }
            if (Date.now() > entry.expiry) {
                store.delete(key);
                return "EXPIRED";
            }
            return entry.value;
        },
    };
}
const cache = createCache(1000);
cache.set("x", 42);
setTimeout(() => console.log(cache.get("x")), 500);
setTimeout(() => console.log(cache.get("x")), 1500);
