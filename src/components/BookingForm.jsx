import React, { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

// Formspree dashboard: https://formspree.io/forms → your form → Integration
// Public endpoint: https://formspree.io/f/mreolnjb
// Override via REACT_APP_FORMSPREE_FORM_ID in `.env` if you create a new form later.
const FORMSPREE_FORM_ID = process.env.REACT_APP_FORMSPREE_FORM_ID ?? "mreolnjb";

const newSubject = () =>
  `BMB Booking Request ${new Date().toISOString()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

const BookingForm = () => {
  const [formState, submitToFormspree, resetFormspree] = useForm(FORMSPREE_FORM_ID, {
    data: {
      submittedAt: () => new Date().toISOString(),
    },
  });
  const { submitting, succeeded, errors: submissionErrors } = formState;

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    notes: "",
    subject: newSubject(),
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
    if (status) {
      setStatus("");
    }
  };

  useEffect(() => {
    if (!succeeded) {
      return;
    }
    setStatus(
      "Thank you! Your booking request has been sent. We will get back to you soon."
    );
    setFormValues({
      firstName: "",
      lastName: "",
      contactNumber: "",
      email: "",
      notes: "",
      subject: newSubject(),
    });
    setErrors({});
    resetFormspree();
  }, [succeeded, resetFormspree]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("Please fix the highlighted errors and submit again.");
      return;
    }

    setStatus("");
    await submitToFormspree(event);
  };

  return (
    <div className="booking-form-container">
      <form
        className="booking-form"
        onSubmit={handleSubmit}
        noValidate
        aria-busy={submitting}
      >
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
              disabled={submitting}
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
              disabled={submitting}
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
              disabled={submitting}
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
              disabled={submitting}
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
            disabled={submitting}
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
            tabIndex={-1}
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
          <button type="submit" className="booking-submit-btn" disabled={submitting}>
            {submitting ? "Sending…" : "Submit Request"}
          </button>

          {submissionErrors ? (
            <ValidationError
              errors={submissionErrors}
              prefix="Could not send your request."
              className="field-error booking-status"
            />
          ) : null}

          {status ? <p className="booking-status">{status}</p> : null}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
