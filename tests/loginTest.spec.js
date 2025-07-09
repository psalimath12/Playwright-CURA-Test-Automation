
const { test } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const AppointmentPage = require('../pages/AppointmentPage');
const AppointmentSummaryPage = require('../pages/AppointmentSummaryPage'); // New import

test.describe('Login Functionality', () => {
  let loginPage;
  let appointmentPage;
  let appointmentSummaryPage; // New declaration

  // Before each test, initialize the Page Objects
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    appointmentPage = new AppointmentPage(page);
    appointmentSummaryPage = new AppointmentSummaryPage(page); // Initialize new Page Object
    console.log('appointmentSummaryPage initialized:', appointmentSummaryPage); // Added for debugging
    await loginPage.goto(); // Navigate to the login page before each test
  });

  test('should successfully login with valid credentials', async () => {
    // Perform login using the LoginPage Page Object
    await loginPage.login('John Doe', 'ThisIsNotAPassword');

    // Assert that we are on the Appointment Page using the AppointmentPage Page Object
    await appointmentPage.expectOnAppointmentPage();
  });

  test('should display an error message with invalid credentials', async () => {
    // Attempt login with invalid credentials
    await loginPage.login('invalid_user', 'invalid_password');

    // Assert that the error message is displayed
    await loginPage.expectLoginErrorMessage('Login failed! Please ensure the username and password are valid.');

    // Assert that the username input is still visible, indicating still on login page
    await loginPage.expectUsernameInputVisible();
  });

  // Example of booking an appointment after login
  test('should successfully book an appointment after login', async () => {
    // First, log in successfully
    await loginPage.login('John Doe', 'ThisIsNotAPassword');
    await appointmentPage.expectOnAppointmentPage();

    const appointmentDetails = {
      facility: 'Seoul CURA Healthcare Center',
      hospitalReadmission: true,
      healthcareProgram: 'Medicare',
      visitDate: '21/07/2025', 
      comment: 'Routine check-up for annual health assessment.'
    };

    // Now, book an appointment using the AppointmentPage Page Object
    await appointmentPage.bookAppointment(appointmentDetails);

    // Assert that we are on the Appointment Summary Page
    await appointmentSummaryPage.expectOnAppointmentSummaryPage();

    // Assert the details on the Appointment Summary Page
    await appointmentSummaryPage.expectAppointmentDetails(appointmentDetails);

    // Optionally, navigate back to homepage
    await appointmentSummaryPage.goToHomepage();
    await appointmentPage.expectOnAppointmentPage(); // Assuming homepage redirects to Appointment page after login
  });
});