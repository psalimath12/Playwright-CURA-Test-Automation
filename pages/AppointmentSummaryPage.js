const { expect } = require('@playwright/test');

class AppointmentSummaryPage {


  constructor(page) {
    this.page = page;
    // Locators for elements on the appointment summary page
    this.appointmentConfirmationHeader = page.locator('h2', { hasText: 'Appointment Confirmation' });
    this.facilityValue = page.locator('#facility');
    this.hospitalReadmissionValue = page.locator('#hospital_readmission');
    this.programValue = page.locator('#program');
    this.visitDateValue = page.locator('#visit_date');
    this.commentValue = page.locator('#comment');
    this.goToHomepageButton = page.locator('.btn-default');

  }

  async expectOnAppointmentSummaryPage() {
    await expect(this.page).toHaveURL(/.*appointment\.php#summary/); // Verify URL
    await expect(this.appointmentConfirmationHeader).toBeVisible();
  }

  async expectAppointmentDetails(expectedDetails) {
    await expect(this.facilityValue).toHaveText(expectedDetails.facility);
    await expect(this.hospitalReadmissionValue).toHaveText(expectedDetails.hospitalReadmission ? 'Yes' : 'No');
    await expect(this.programValue).toHaveText(expectedDetails.healthcareProgram);
    await expect(this.visitDateValue).toHaveText(expectedDetails.visitDate);
    await expect(this.commentValue).toHaveText(expectedDetails.comment);
  }
  async goToHomepage() {
    await this.goToHomepageButton.click();
  }
}

module.exports = AppointmentSummaryPage;

