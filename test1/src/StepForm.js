import React,{ useState }  from 'react';
import { useForm } from 'react-hook-form';
import './StepForm.css';

const PersonalDetails = ({ formMethods, onNext }) => {
  const { register, handleSubmit, formState: { errors } } = formMethods;

  const onSubmit = (data) => {
    console.log(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Personal Details</h2>
      <label>
        First Name:
        <input
          {...register('firstName', { required: 'This field is required' })}
          className={errors.firstName ? 'error' : ''}
        />
        {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
      </label>
      <label>
        Last Name:
        <input
          {...register('lastName', { required: 'This field is required' })}
          className={errors.lastName ? 'error' : ''}
        />
        {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
      </label>
      <label>
        Email:
        <input
          {...register('email', {
            required: 'This field is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Please write the email in the correct format (@email.com)' },
          })}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </label>
      <label>
        Mobile number:
        <input
          {...register('number', {
            required: 'Mobile number should be minimum 10 digits',
            minLength: 10,
            maxLength: 12,
            pattern: { value: /^[0-9]+$/, message: 'Mobile number should be a number' },
          })}
          className={errors.number ? 'error' : ''}
        />
        {errors.number && <p className="error-message">{errors.number.message}</p>}
      </label>
      <button type="submit">Next</button>
    </form>
  );
};



const AddressDetails = ({ formMethods, onNext }) => {
  const { register, handleSubmit, formState: { errors } } = formMethods;

  const onSubmit = (data) => {
    console.log(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Address Details</h2>
      <label>
        Street:
        <input {...register('street', { required: 'This field is required' })} />
        {errors.street && <p className="error-message">{errors.street.message}</p>}
      </label>
      <label>
        City:
        <input {...register('city', { required: 'This field is required' })} />
        {errors.city && <p className="error-message">{errors.city.message}</p>}
      </label>
      <label>
        State
        <input {...register('state', { required: 'This field is required' })} />
        {errors.state && <p className="error-message">{errors.state.message}</p>}
      </label>
      <button type="submit">Next</button>
    </form>
  );
};

const PaymentDetails = ({ formMethods, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = formMethods;

  const handleFinalSubmit = (data) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFinalSubmit)}>
      <h2>Payment Details</h2>
      <label>
        Card Number:
        <input {...register('cardNumber', { required: true,pattern: { value: /^[0-9]+$/, message: 'Card number should be a number' }, })} />
        {errors.cardNumber && <p className="error-message">{errors.cardNumber.message}</p>}
      </label>
      <label>
        Expiry Date:
        <input {...register('expiryDate', { required: 'This field is required' })} type="date"/>
        {errors.expiryDate && <p className="error-message">{errors.expiryDate.message}</p>}
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

const StepForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const [step, setStep] = useState(1);
  const [submittedData, setSubmittedData] = useState(null);

  const onNextStep = () => setStep((prevStep) => prevStep + 1);

  const onSubmit = (data) => {
    console.log('Form submitted successfully!', data);
    setSubmittedData(data);
  };

  const handleHomeButtonClick = () => {
    setStep(1);
    setSubmittedData(null);
  };

  return (
    <div className="step-form-container">
    {submittedData ? (
      <div className="submitted-data">
        <h2>Submitted Data</h2>
        <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        <button onClick={handleHomeButtonClick}>Home</button>
      </div>
    ) : (
      <>
        {step === 1 && <PersonalDetails formMethods={{ register, handleSubmit, formState }} onNext={onNextStep} />}
        {step === 2 && <AddressDetails formMethods={{ register, handleSubmit, formState }} onNext={onNextStep} />}
        {step === 3 && <PaymentDetails formMethods={{ register, handleSubmit, formState }} onSubmit={onSubmit} />}
        <div className="step-buttons">
          {step > 1 && <button onClick={() => setStep((prevStep) => prevStep - 1)}>Previous</button>}
        </div>
      </>
    )}
  </div>
);
};


export default StepForm;
