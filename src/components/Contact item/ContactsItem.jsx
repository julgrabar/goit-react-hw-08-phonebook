import { Loader } from 'components/Loader/Loader.stayled';
import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/contactsSlice';

export const ContactsItem = ({ id, name, number }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  return (
    <li>
      <span>
        {name}: {number}
      </span>
      {isLoading ? (
        <Loader margin=" 0 0 0 auto" />
      ) : (
        <button
          type="button"
          className="delete-btn"
          onClick={() => deleteContact(id)}
        >
          <span className="material-icons">delete</span>
        </button>
      )}
    </li>
  );
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
