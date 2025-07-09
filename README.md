Playwright Test Automation Framework - Katalon CURA Demo
This project demonstrates a Playwright end-to-end test automation framework built using the Page Object Model (POM) design pattern. It automates key functionalities of the Katalon CURA Healthcare Service demo application.

Table of Contents
Project Overview

Features

Prerequisites

Setup Instructions

How to Run Tests

Viewing Test Reports

Project Structure

Debugging Tests

Project Overview
This framework aims to provide a robust, maintainable, and readable suite of automated tests for web applications. By adopting the Page Object Model, it separates test logic from page interaction logic, making tests easier to understand and maintain.

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
Clone or Download the Project:
If you haven't already, ensure your project files are structured as follows:

your-project-folder/
├── playwright.config.js
├── package.json
├── pages/
│   ├── LoginPage.js
│   ├── AppointmentPage.js
│   └── AppointmentSummaryPage.js
└── tests/
    └── login.spec.js

Install Dependencies:
Navigate to your project's root directory in the terminal and run:

npm install

This command reads the package.json file and installs Playwright along with its browser binaries (Chromium, Firefox, WebKit).

How to Run Tests
Navigate to your project's root directory in the terminal.

Run All Tests (Headless - default):

npx playwright test

Run Tests in Headed Mode (browser UI visible):

npx playwright test --headed

Run Specific Test File:

npx playwright test tests/login.spec.js

Run Tests on a Specific Browser:

npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

Viewing Test Reports
After running your tests, Playwright automatically generates an HTML report. To view it, run:

npx playwright show-report

This will open the report in your default web browser, providing a detailed overview of test results, including failures, durations, and steps.

Project Structure
playwright.config.js:

The main configuration file for Playwright.

Defines test directories, browsers, timeouts, and reporting options.

Sets baseURL for the application under test.

pages/:

Contains Page Object Model (POM) classes.

Each .js file in this directory represents a distinct page or a significant component of the web application.

LoginPage.js: Encapsulates locators and actions for the login page, including login and logout functionalities.

AppointmentPage.js: Handles interactions and assertions on the appointment booking page.

AppointmentSummaryPage.js: Manages locators and assertions for the appointment confirmation/summary page.

tests/:

Contains the actual test files.

Each .spec.js file holds one or more test cases (test()) or test suites (test.describe()).

Tests import and utilize methods from the Page Object classes, making them high-level and readable.

login.spec.js: Contains test scenarios for login, appointment booking, and logout.

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
