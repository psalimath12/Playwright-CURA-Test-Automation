// @ts-check
// This is a custom Playwright Reporter implemented in pure JavaScript.
// This version uses manual tracking to prevent the 'result.current' error in CI.
// 🌟 Trivial change added here to force a GitHub update.

class MyReporter {
  constructor() {
    // FIX: Initialize a state object to track totals manually.
    this.totals = {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
    };
  }
  
  /**
   * Called once before all tests run.
   * @param {import('@playwright/test/reporter').FullConfig} config
   * @param {import('@playwright/test/reporter').Suite} suite
   */
  onBegin(config, suite) {
    // Set the total number of tests from the suite object
    this.totals.total = suite.allTests().length;
    console.log(`\n======================================================`);
    console.log(`Starting the test run.`);
    console.log(`Total tests detected: ${this.totals.total}`);
    console.log(`======================================================`);
  }

  /**
   * Called after a test starts execution.
   * @param {import('@playwright/test/reporter').TestCase} test
   * @param {import('@playwright/test/reporter').TestResult} result
   */
  onTestBegin(test, result) {
    console.log(`[START] ${test.titlePath().slice(1).join(' > ')}`);
  }

  /**
   * Called after a test finishes execution.
   * @param {import('@playwright/test/reporter').TestCase} test
   * @param {import('@playwright/test/reporter').TestResult} result
   */
  onTestEnd(test, result) {
    console.log(`[ ${result.status.toUpperCase()} ] ${test.titlePath().slice(1).join(' > ')} - Duration: ${result.duration}ms`);
    
    // FIX: Increment counters based on the final status of the test
    if (result.status === 'passed') {
      this.totals.passed++;
    } else if (result.status === 'failed' || result.status === 'timedOut' || result.status === 'interrupted') {
      this.totals.failed++;
    } else if (result.status === 'skipped') {
      this.totals.skipped++;
    }
  }

  /**
   * Called once after all tests finish running.
   * @param {import('@playwright/test/reporter').FullResult} result
   */
  onEnd(result) {
    console.log(`\n======================================================`);
    console.log(`Finished the run: ${result.status.toUpperCase()}`);
    
    // FIX: Use the manually tracked totals, avoiding the 'result.current' error
    const { total, passed, failed, skipped } = this.totals;
    
    console.log(`Summary: Total: ${total}, Passed: ${passed}, Failed: ${failed}, Skipped: ${skipped}`);
    console.log(`======================================================`);
  }
}

module.exports = MyReporter;