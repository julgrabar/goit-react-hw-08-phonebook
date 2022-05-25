import { useDispatch, useSelector } from 'react-redux';
import { getFilterValue } from 'redux/contacts/contactsSlice';
import { filterContacts } from 'redux/contacts/contactsSlice';

export const Filter = () => {
  const filterValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const onFilterInput = e => {
    dispatch(filterContacts(e.currentTarget.value));
  };

  return (
    <>
      <p>Find contacts by name:</p>
      <input
        type="text"
        name="filter"
        value={filterValue}
        onChange={onFilterInput}
        className="filter"
      />
    </>
  );
};
