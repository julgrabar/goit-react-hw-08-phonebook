// import { ContactForm } from './Contact form/ContactForm';
// import { ContactList } from './Contact list/ContactList';
// import { Filter } from './Filter/Filter';
// import { Container } from './Global';
// import { useGetContactsQuery } from 'redux/contactsSlice';
// import { Loader } from './Loader/Loader.stayled';
// import { useSelector } from 'react-redux';

import { ContactForm } from 'components/Contact form/ContactForm';
import { ContactList } from 'components/Contact list/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Container } from 'components/Global';
import { Loader } from 'components/Loader/Loader.stayled';
import { useSelector } from 'react-redux';
import { getFilterValue, useGetContactsQuery } from 'redux/contactsSlice';

export const ContactsPage = () => {
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
    <Container>
      <ContactForm />

      {contacts && contacts.length > 0 && (
        <>
          <Filter />
          <ContactList contacts={findPhones()} />
        </>
      )}
      {error && <p>Ooops.. Something went wrong... Try to reload the page</p>}
      {isLoading && <Loader />}
    </Container>
  );
};
