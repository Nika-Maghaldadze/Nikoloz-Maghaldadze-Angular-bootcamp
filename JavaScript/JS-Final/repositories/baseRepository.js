export const db = {
    students: [],
    subjects: [],
    terms: [],
    enrollments: [],
    assessments: [],
    scores: [],
    attendance: [],
    gradingSchemes: [],
    policies: [],
};

export class BaseRepository {
    constructor(collectionName) {
        if (typeof collectionName !== "string") {
            throw new Error(
                `Repository must use a valid collection name string.`
            );
        }

        if (!Object.prototype.hasOwnProperty.call(db, collectionName)) {
            throw new Error(
                `Collection "${collectionName}" does not exist in db object.`
            );
        }

        this.collection = db[collectionName];
    }

    getAll() {
        return [...this.collection];
    }

    getById(id) {
        if (id === undefined || id === null) return null;
        const record = this.collection.find((x) => x && x.id === id);
        return record ?? null;
    }

    create(entity) {
        if (typeof entity !== "object" || entity === null) {
            throw new Error(`Entity must be a non-null object.`);
        }

        if (!("id" in entity)) {
            throw new Error(
                `Entity must have an "id" property before creation.`
            );
        }

        this.collection.push(entity);
        return entity;
    }

    update(id, updates) {
        if (id === undefined || id === null) return null;

        const index = this.collection.findIndex((x) => x && x.id === id);
        if (index === -1) return null;

        if (typeof updates !== "object" || updates === null) {
            throw new Error(`Updates must be a non-null object.`);
        }

        this.collection[index] = {
            ...this.collection[index],
            ...updates,
        };

        return this.collection[index];
    }

    delete(id) {
        if (id === undefined || id === null) return false;

        const index = this.collection.findIndex((x) => x && x.id === id);
        if (index === -1) return false;

        this.collection.splice(index, 1);
        return true;
    }
}
