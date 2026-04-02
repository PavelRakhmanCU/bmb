import React, { useState } from "react";
// Form endpoint: https://formspree.io/f/mreolnjb
const BookingForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    notes: "",
    subject: `BMB Booking Request ${new Date().toISOString()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const validate = (values) => {
    const nextErrors = {};

    if (!values.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!values.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!values.contactNumber.trim()) {
      nextErrors.contactNumber = "Contact number is required.";
    } else if (!/^[+]?[\d\s\-()]{7,20}$/.test(values.contactNumber.trim())) {
      nextErrors.contactNumber = "Please enter a valid contact number.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!values.notes.trim()) {
      nextErrors.notes = "Notes are required.";
    } else if (values.notes.trim().length < 10) {
      nextErrors.notes = "Please provide at least 10 characters in notes.";
    }

    if (!values.subject.trim()) {
      nextErrors.subject = "Subject is missing. Please refresh and try again.";
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("Please fix the highlighted errors and submit again.");
      return;
    }

    const submissionPayload = {
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
      contactNumber: formValues.contactNumber.trim(),
      email: formValues.email.trim().toLowerCase(),
      notes: formValues.notes.trim(),
      subject: formValues.subject.trim(),
      submittedAt: new Date().toISOString(),
    };

    // This object is ready to send to Formspree/backend.
    console.log("Booking form payload:", submissionPayload);
    setStatus("Form validated. Submission payload is ready to send.");
  };

  return (
    <div className="booking-form-container">
      <form className="booking-form" onSubmit={handleSubmit} noValidate>
        <div className="booking-form-grid">
          <div className="booking-field">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={formValues.firstName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              required
            />
            {errors.firstName ? (
              <p id="firstName-error" className="field-error">
                {errors.firstName}
              </p>
            ) : null}
          </div>

          <div className="booking-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={formValues.lastName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              required
            />
            {errors.lastName ? (
              <p id="lastName-error" className="field-error">
                {errors.lastName}
              </p>
            ) : null}
          </div>

          <div className="booking-field">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              autoComplete="tel"
              value={formValues.contactNumber}
              onChange={handleChange}
              aria-invalid={Boolean(errors.contactNumber)}
              aria-describedby={errors.contactNumber ? "contactNumber-error" : undefined}
              required
            />
            {errors.contactNumber ? (
              <p id="contactNumber-error" className="field-error">
                {errors.contactNumber}
              </p>
            ) : null}
          </div>

          <div className="booking-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formValues.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email ? (
              <p id="email-error" className="field-error">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="booking-field booking-field-full">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows={5}
            value={formValues.notes}
            onChange={handleChange}
            aria-invalid={Boolean(errors.notes)}
            aria-describedby={errors.notes ? "notes-error" : undefined}
            required
          />
          {errors.notes ? (
            <p id="notes-error" className="field-error">
              {errors.notes}
            </p>
          ) : null}
        </div>

        <div className="booking-field booking-field-full visually-hidden">
          <label htmlFor="subject">Unique Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formValues.subject}
            onChange={handleChange}
            readOnly
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          />
          {errors.subject ? (
            <p id="subject-error" className="field-error">
              {errors.subject}
            </p>
          ) : null}
        </div>

        <div className="booking-form-actions">
          <button type="submit" className="booking-submit-btn">
            Submit Request
          </button>

          {status ? <p className="booking-status">{status}</p> : null}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;