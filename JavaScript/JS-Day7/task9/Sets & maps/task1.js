function uniqueWords(text) {
    if (!text.trim()) {
        return 0;
    }
    const words = text.toLowerCase().split(" ");
    const unique = new Set(words.filter((word) => word !== ""));
    return unique.size;
}
console.log(uniqueWords("apple Apple orange ORANGE banana"));
