import { Page } from "@playwright/test";



type StepMetric = {
    name: string;
    durations: number[];
};

class MetricsCollector {
    private steps: Record<string, StepMetric> = {};

    async measure(page: Page, stepName: string, fn: () => Promise<void>) {
        const start = performance.now();

        await fn();
        await page.waitForLoadState('load');

        const duration = performance.now() - start;

        if (!this.steps[stepName]) {
            this.steps[stepName] = { name: stepName, durations: [] };
        }

        this.steps[stepName].durations.push(duration);
    }
    percentile(arr: number[], p: number) {

        const index = Math.ceil((p / 100) * arr.length) - 1;
        return arr[index];
    }
    getStats() {
        const result: any = {};

        for (const stepName in this.steps) {
            const sortedDurations = [...this.steps[stepName].durations].sort((a, b) => a - b);


            const avg =
                sortedDurations.reduce((a, b) => a + b, 0) / sortedDurations.length;
            const min = sortedDurations[0];
            const max = sortedDurations[sortedDurations.length - 1];
            const p50 = this.percentile(sortedDurations, 50);
            const p90 = this.percentile(sortedDurations, 90);
            const p95 = this.percentile(sortedDurations, 95);


            result[stepName] = {
                count: sortedDurations.length,
                avg: `${avg.toFixed(0)}ms`.padEnd(8),
                min: `${min.toFixed(0)}ms`.padEnd(8),
                max: `${max.toFixed(0)}ms`.padEnd(8),
                p50: `${p50.toFixed(0)}ms`.padEnd(8),
                p90: `${p90.toFixed(0)}ms`.padEnd(8),
                p95: `${p95.toFixed(0)}ms`.padEnd(8),
            };
        }

        return result;
    }

    print() {
        console.log("\n📊 Step Metrics:");
        console.log(JSON.stringify(this.getStats(), null, 2));
    }
}
export const metrics = new MetricsCollector();