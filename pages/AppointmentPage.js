const { expect } = require('@playwright/test');

class AppointmentPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Locator for the "Make Appointment" button, which is visible after successful login
    this.makeAppointmentButton = page.locator('#btn-make-appointment');
    this.facilityDropdown = page.locator('#combo_facility');
    this.hospitalReadmissionCheckbox = page.locator('#chk_hospotal_readmission');
    this.healthcareProgramRadioMedicare = page.locator('#radio_program_medicare');
    this.healthcareProgramRadioMedicaid = page.locator('#radio_program_medicaid');
    this.healthcareProgramRadioNone = page.locator('#radio_program_none');
    this.visitDateInput = page.locator('#txt_visit_date');
    this.commentTextarea = page.locator('#txt_comment');
    this.bookAppointmentButton = page.locator('#btn-book-appointment');
  }

  /**
   * Asserts that the "Make Appointment" button is visible, indicating a successful login.
   */
  async expectOnAppointmentPage() {
    await expect(this.makeAppointmentButton).toBeVisible();
    await expect(this.makeAppointmentButton).toHaveText('Make Appointment');
  }

  /**
   * Books an appointment with the given details.
   * @param {object} options
   * @param {string} options.facility
   * @param {boolean} options.hospitalReadmission
   * @param {'Medicare' | 'Medicaid' | 'None'} options.healthcareProgram
   * @param {string} options.visitDate
   * @param {string} options.comment
   */
  async bookAppointment({ facility, hospitalReadmission, healthcareProgram, visitDate, comment }) {
    await this.facilityDropdown.selectOption(facility);
    if (hospitalReadmission) {
      await this.hospitalReadmissionCheckbox.check();
    }
    switch (healthcareProgram) {
      case 'Medicare':
        await this.healthcareProgramRadioMedicare.check();
        break;
      case 'Medicaid':
        await this.healthcareProgramRadioMedicaid.check();
        break;
      case 'None':
        await this.healthcareProgramRadioNone.check();
        break;
    }
    // Click the date input to ensure the date picker is activated
    await this.visitDateInput.click();
    //to simulate typing by a user
    await this.visitDateInput.pressSequentially(visitDate);
    await this.page.keyboard.press('Escape');
    await this.commentTextarea.click();
    await this.commentTextarea.fill(comment);

    console.log('Attempting to book appointment and waiting for URL change...'); // Debug log

    // Click the book appointment button and wait for the URL to change to the summary page
    await Promise.all([
      this.page.waitForURL(/.*appointment\.php#summary/, { timeout: 60000 }), // Increased timeout to 60s
      this.bookAppointmentButton.click()
    ]);
    console.log('Successfully booked appointment and navigated to summary page.'); // Debug log
  }



}

module.exports = AppointmentPage;