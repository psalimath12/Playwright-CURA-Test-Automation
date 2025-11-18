
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
    console.log(`\n======================================================`);
    console.log(`Finished the run: ${result.status.toUpperCase()}`);
    
    const totalTests = result.current.total;
    const passed = result.current.passed;
    const failed = result.current.failed;
    const skipped = result.current.skipped;
    
    console.log(`Total: ${totalTests}, Passed: ${passed}, Failed: ${failed}, Skipped: ${skipped}`);
    console.log(`======================================================`);
  }
}

module.exports = MyReporter;