function toRomanian(romanian) {
    if (typeof romanian !== "string" || romanian.trim() === "") {
        throw new Error("Input must be a non-empty string!");
    }

    const romanValues = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    let total = 0;

    for (let i = 0; i < romanian.length; i++) {
        const current = romanValues[romanian[i]];
        const next = romanValues[romanian[i + 1]];

        if (!current) {
            throw new Error("Invalid input! Enter correct roman number!");
        }

        if (next && current < next) {
            total -= current;
        } else {
            total += current;
        }
    }

    return total;
}
