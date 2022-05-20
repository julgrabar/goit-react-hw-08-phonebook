import { ContactForm } from './Contact form/ContactForm';
import { Toaster } from 'react-hot-toast';
import { ContactList } from './Contact list/ContactList';
import { Filter } from './Filter/Filter';
import { Global } from './Global';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { Loader } from './Loader/Loader.stayled';
import { useSelector } from 'react-redux';
import { getFilterValue } from 'redux/contactsSlice';

export const App = () => {
  const { data: contacts, error, isLoading } = useGetContactsQuery();
  const filterValue = useSelector(getFilterValue);

  const findPhones = () => {
    const normalizedValue = filterValue.toLowerCase();
    const filteredArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedValue)
    );
    return filteredArray;
  };

  return (
    <div>
      <Global />

      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>

      {contacts && contacts.length > 0 && (
        <>
          <Filter />
          <ContactList contacts={findPhones()} />
        </>
      )}
      {error && <p>Ooops.. Something went wrong... Try to reload the page</p>}
      {isLoading && <Loader />}
      <Toaster position="top-right" />
    </div>
  );
};
