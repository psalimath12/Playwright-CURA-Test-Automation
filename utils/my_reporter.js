
// This is a custom Playwright Reporter implemented in pure JavaScript.

class MyReporter {
    /**
     * Called once before all tests run.
     * @param {import('@playwright/test/reporter').FullConfig} config
     * @param {import('@playwright/test/reporter').Suite} suite
     */
    onBegin(config, suite) {
        console.log(`\n======================================================`);
        console.log(`Starting the test run.`);
        console.log(`Total tests detected: ${suite.allTests().length}`);
        console.log(`======================================================`);
    }

    /**
     * Called after a test starts execution.
     * @param {import('@playwright/test/reporter').TestCase} test
     * @param {import('@playwright/test/reporter').TestResult} result
     */
    onTestBegin(test, result) {
        // result is not fully populated here, but we can log the start time
        console.log(`[START] ${test.titlePath().slice(1).join(' > ')}`);
    }

    /**
     * Called after a test finishes execution.
     * @param {import('@playwright/test/reporter').TestCase} test
     * @param {import('@playwright/test/reporter').TestResult} result
     */
    onTestEnd(test, result) {
        console.log(`[ ${result.status.toUpperCase()} ] ${test.titlePath().slice(1).join(' > ')} - Duration: ${result.duration}ms`);
    }

    /**
     * Called once after all tests finish running.
     * @param {import('@playwright/test/reporter').FullResult} result
     */
    onEnd(result) {
        const totalTests = result.tests.length;
        const passed = result.tests.filter(t => t.status === 'passed').length;
        const failed = result.tests.filter(t => t.status === 'failed').length;
        const skipped = result.tests.filter(t => t.status === 'skipped').length;

        console.log(`Total: ${totalTests}, Passed: ${passed}, Failed: ${failed}, Skipped: ${skipped}`);
    }
}

module.exports = MyReporter;