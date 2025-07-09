Playwright Test Automation Framework - Katalon CURA Demo
This project demonstrates a Playwright end-to-end test automation framework built using the Page Object Model (POM) design pattern. It automates key functionalities of the Katalon CURA Healthcare Service demo application. By making use of POM, this framework will be robust, maintainable and a readable suite.

Features
User Login:

Successful login with valid credentials.

Error message validation for invalid credentials.

Appointment Booking:

Booking an appointment with various facility, readmission, healthcare program, date, and comment details.

Verification of appointment details on the summary page.

User Logout:

Successful logout from the application.

Cross-Browser Testing: Configured to run tests on Chromium, Firefox, and WebKit (Safari).

HTML Reporting: Generates comprehensive HTML reports for test results.

Trace Viewing: Captures execution traces for detailed debugging of failed tests.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js: Playwright is a Node.js library. Download and install it from nodejs.org. It comes with npm (Node Package Manager).

Setup Instructions
Clone or Download the Project: git clone <url of this repo>

Install Dependencies:
Navigate to your project's root directory in the terminal and run:

npm install


How to Run Tests
Navigate to your project's root directory in the terminal.

Run All Tests (Headless - default):

npx playwright test

To view the results in a HTML Report:
npx playwright show-report

Run Tests in Headed Mode (browser UI visible):

npx playwright test --headed

Run only the failed test in headed mode
npx playwright test --headed --last-failed

Run Tests on a Specific Browser:

npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit


Debugging Tests
Playwright provides powerful debugging tools:

Playwright Inspector:

Run tests with PWDEBUG=1 to open the Inspector, allowing you to step through tests, inspect elements, and see browser console logs.

PWDEBUG=1 npx playwright test --headed

(On Windows: set PWDEBUG=1 && npx playwright test --headed)

Trace Viewer:

Playwright can record a detailed trace of test execution. If trace: 'on-first-retry' is set in playwright.config.js, a trace is saved for failed tests. You can set trace: 'on' to always record traces.

To open the trace viewer:

npx playwright show-trace

The trace viewer shows a timeline of actions, DOM snapshots, network requests, and console logs, which is invaluable for diagnosing issues.
