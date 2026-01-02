import React, { ChangeEvent, FormEvent, useState } from "react";

// ---------- types ----------
type FormState = {
  name: string;
  email: string;
  employeeId: string;
  joiningDate: string;
};

type ErrorState = {
  [K in keyof FormState]: string;
};

type Validator = (value: string) => string;

type Validators = {
  [K in keyof FormState]: Validator;
};

function EmployeeValidationForm(): JSX.Element {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    employeeId: '',
    joiningDate: ''
  });

  const [errors, setErrors] = useState<ErrorState>({
    name: 'Required',
    email: 'Required',
    employeeId: 'Required',
    joiningDate: 'Required'
  });

  // ---------- validators ----------
  const validators: Validators = {
    name: (value: string): string => {
      if (!value.trim()) return 'Name is required';
      if (value.length < 4) return 'Name must be at least 4 characters';
      if (!/^[a-zA-Z ]+$/.test(value)) {
        return 'Name can only contain letters and spaces';
      }
      return '';
    },

    email: (value: string): string => {
      if (!value.trim()) return 'Email is required';
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        return 'Email must be a valid email address';
      }
      return '';
    },

    employeeId: (value: string): string => {
      if (!/^\d{6}$/.test(value)) {
        return 'Employee ID must be exactly 6 digits';
      }
      return '';
    },

    joiningDate: (value: string): string => {
      if (!value) return 'Joining Date is required';
      if (new Date(value) > new Date()) {
        return 'Joining Date cannot be in the future';
      }
      return '';
    }
  };

  // ---------- helpers ----------
  const validateAll = (nextForm: FormState): ErrorState => {
    const nextErrors = {} as ErrorState;

    (Object.keys(validators) as Array<keyof FormState>).forEach((key) => {
      nextErrors[key] = validators[key](nextForm[key]);
    });

    return nextErrors;
  };

  // ---------- handlers ----------
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const field = name as keyof FormState;

    const nextForm: FormState = {
      ...form,
      [field]: value
    };

    setForm(nextForm);
    setErrors(validateAll(nextForm));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const nextErrors = validateAll(form);
    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some(Boolean);
    if (!hasError) {
      console.log('Submit success:', form);
    }
  };

  // ---------- derived state ----------
  const isFormValid: boolean = Object.values(errors).every(
    (err) => err === ''
  );

  return (
    <form
      className="layout-column align-items-center mt-20"
      onSubmit={handleSubmit}
    >
      {/* Name */}
      <div className="layout-column align-items-start mb-10 w-50">
        <input
          className="w-100"
          type="text"
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
        />
        {errors.name && <p className="error mt-2">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="layout-column align-items-start mb-10 w-50">
        <input
          className="w-100"
          type="text"
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
        />
        {errors.email && <p className="error mt-2">{errors.email}</p>}
      </div>

      {/* Employee ID */}
      <div className="layout-column align-items-start mb-10 w-50">
        <input
          className="w-100"
          type="text"
          name="employeeId"
          value={form.employeeId}
          placeholder="Employee ID"
          onChange={handleChange}
        />
        {errors.employeeId && (
          <p className="error mt-2">{errors.employeeId}</p>
        )}
      </div>

      {/* Joining Date */}
      <div className="layout-column align-items-start mb-10 w-50">
        <input
          className="w-100"
          type="date"
          name="joiningDate"
          value={form.joiningDate}
          onChange={handleChange}
        />
        {errors.joiningDate && (
          <p className="error mt-2">{errors.joiningDate}</p>
        )}
      </div>

      <button
        data-testid="submit-btn"
        type="submit"
        disabled={!isFormValid}
      >
        Submit
      </button>
    </form>
  );
}

export default EmployeeValidationForm;
