import { StyledForm } from 'components/Contact form/ContactForm.styled';
import { Formik, Field } from 'formik';
import { useLoginMutation } from 'redux/authSlice';

export const LoginForm = () => {
  const [loginUser] = useLoginMutation();
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    loginUser(values);
    resetForm();
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <StyledForm>
        <label>
          <p>e-mail</p>
          <Field type="email" name="email" required />
        </label>

        <label>
          <p>Password</p>
          <Field type="password" name="password" required />
        </label>
        <button type="submit">Log in</button>
      </StyledForm>
    </Formik>
  );
};
