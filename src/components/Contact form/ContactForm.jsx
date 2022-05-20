import { Formik, Field } from 'formik';
import { StyledForm } from './ContactForm.styled';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';
import toast from 'react-hot-toast';

export const ContactForm = () => {
  const [addContact] = useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();

  const initialValues = {
    name: '',
    number: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    addNewContact(values);
    resetForm();
  };

  const addNewContact = async ({ name, number }) => {
    if (
      contacts.map(item => item.name.toLowerCase()).includes(name.toLowerCase())
    ) {
      toast.error(`${name} is already in contacts`);
      return;
    }

    const contact = {
      name,
      number,
    };

    try {
      await addContact(contact);
      toast.success('Контакт добавлен');
    } catch (error) {
      toast.error('Ошибка при добавлении контакта');
      console.log(error);
    }
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <StyledForm>
        <label>
          <p>Name</p>
          <Field
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label>
          <p>Number</p>
          <Field
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </StyledForm>
    </Formik>
  );
};
