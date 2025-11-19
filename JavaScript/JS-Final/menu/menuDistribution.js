import { distributionService } from "../services/distributionService.js";
export async function menuDistribution() {
    const subjectId = await ask("subjectId: ");
    const termId = await ask("termId: ");
    const bucketInput = await ask(
        "Buckets (letters or ranges 0-59,60-69,...): "
    );
    const buckets = bucketInput.split(",").map((x) => x.trim());
    console.log(distributionService.distribution(subjectId, termId, buckets));
}
