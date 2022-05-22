import { StyledForm } from 'components/Contact form/ContactForm.styled';
import { Formik, Field } from 'formik';
import { useSignupMutation } from 'redux/authSlice';

export const SignupForm = () => {
  const [signupUser] = useSignupMutation();
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    signupUser(values);
    resetForm();
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <StyledForm>
        <label>
          <p>User Name</p>
          <Field type="text" name="name" required />
        </label>

        <label>
          <p>e-mail</p>
          <Field type="email" name="email" required />
        </label>

        <label>
          <p>Password</p>
          <Field type="password" name="password" required />
        </label>
        <button type="submit">Sign up</button>
      </StyledForm>
    </Formik>
  );
};
