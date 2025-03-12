import React, { useEffect, useState } from 'react';
import {
  useGetContactsQuery,

  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from '../features/contactsAPI';
import { v4 as uuidv4 } from 'uuid';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  response?: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

const Contacts: React.FC = () => {
  const { data: contacts = [], error: fetchError, isLoading, refetch } = useGetContactsQuery([]);
  const [createContact, { error: createError, isLoading: isCreating }] = useCreateContactMutation();
  const [updateContact, { error: updateError, isLoading: isUpdating }] = useUpdateContactMutation();
  const [deleteContact, { error: deleteError, isLoading: isDeleting }] = useDeleteContactMutation();

  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState<Contact>({
    id: uuidv4(),
    name: '',
    email: '',
    subject: '',
    message: '',
    response: '',
    is_read: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: uuidv4(),
  });

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching contacts...');
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (fetchError) {
      console.error('Fetch error:', fetchError);
    }
    if (createError) {
      console.error('Create error:', createError);
      setMessage('Failed to create contact.');
    }
    if (updateError) {
      console.error('Update error:', updateError);
      setMessage('Failed to update contact.');
    }
    if (deleteError) {
      console.error('Delete error:', deleteError);
      setMessage('Failed to delete contact.');
    }
  }, [fetchError, createError, updateError, deleteError]);

  const handleCreateContact = async () => {
    console.log('Creating contact:', newContact);
    try {
      await createContact(newContact);
      setNewContact({
        id: uuidv4(),
        name: '',
        email: '',
        subject: '',
        message: '',
        response: '',
        is_read: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: uuidv4(),
      });
      setMessage('Contact created successfully.');
      refetch();
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  const handleUpdateContact = async () => {
    if (editingContact) {
      console.log('Updating contact with ID:', editingContact.id);
      try {
        await updateContact({ contactId: editingContact.id, contactData: editingContact });
        setEditingContact(null);
        setMessage('Contact updated successfully.');
        refetch();
      } catch (error) {
        console.error('Error updating contact:', error);
      }
    } else {
      console.error('No contact is being edited.');
    }
  };

  const handleDeleteContact = async (id: string) => {
    console.log('Deleting contact with ID:', id);
    try {
      await deleteContact(id);
      setMessage('Contact deleted successfully.');
      refetch();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleEditContact = (contact: Contact) => {
    console.log('Editing contact:', contact.name);
    setEditingContact({ ...contact }); // Ensure a new object is created to avoid mutating the original contact
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-500">Contacts Dashboard</h1>

      {isLoading && <p>Loading contacts...</p>}
      {fetchError && <p>Error loading contacts.</p>}
      {message && <p className="mb-4 text-green-500">{message}</p>}

      {/* Create Contact Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create New Contact</h2>
        <input
          type="text"
          placeholder="Enter Contact Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <input
          type="email"
          placeholder="Enter Contact Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Enter Subject"
          value={newContact.subject}
          onChange={(e) => setNewContact({ ...newContact, subject: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <textarea
          placeholder="Enter Message"
          value={newContact.message}
          onChange={(e) => setNewContact({ ...newContact, message: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <textarea
          placeholder="Enter Response"
          value={newContact.response}
          onChange={(e) => setNewContact({ ...newContact, response: e.target.value })}
          className="p-2 mb-2 w-full bg-gray-800 border border-gray-700 rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={newContact.is_read}
            onChange={(e) => setNewContact({ ...newContact, is_read: e.target.checked })}
            className="form-checkbox"
          />
          <span>Mark as Read</span>
        </label>
        <button
          onClick={handleCreateContact}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          disabled={isCreating}
        >
          {isCreating ? 'Creating...' : 'Create Contact'}
        </button>
      </div>

      {/* Contacts List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Contacts List</h2>
        <ul>
          {contacts.map((contact: Contact) => (
            <li key={contact.id} className="mb-4 p-4 bg-gray-800 rounded border border-gray-700 relative">
              {editingContact?.id === contact.id ? (
                <div>
                  <input
                    type="text"
                    placeholder="Enter Contact Name"
                    value={editingContact?.name ?? ''}
                    onChange={(e) => setEditingContact({
                      ...editingContact!,
                      name: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    type="email"
                    placeholder="Enter Contact Email"
                    value={editingContact?.email ?? ''}
                    onChange={(e) => setEditingContact({
                      ...editingContact!,
                      email: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Enter Subject"
                    value={editingContact?.subject ?? ''}
                    onChange={(e) => setEditingContact({
                      ...editingContact!,
                      subject: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <textarea
                    placeholder="Enter Message"
                    value={editingContact?.message ?? ''}
                    onChange={(e) => setEditingContact({
                      ...editingContact!,
                      message: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <textarea
                    placeholder="Enter Response"
                    value={editingContact?.response ?? ''}
                    onChange={(e) => setEditingContact({
                      ...editingContact!,
                      response: e.target.value,
                    })}
                    className="p-2 mb-2 w-full bg-gray-700 border border-gray-600 rounded"
                  />
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingContact?.is_read ?? false}
                      onChange={(e) => setEditingContact({
                        ...editingContact!,
                        is_read: e.target.checked,
                      })}
                      className="form-checkbox"
                    />
                    <span>Mark as Read</span>
                  </label>
                  <button
                    onClick={handleUpdateContact}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Save'}
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold">{contact.name}</h3>
                  <p>{contact.email}</p>
                  <p><strong>Subject:</strong> {contact.subject}</p>
                  <p><strong>Message:</strong> {contact.message}</p>
                  <p><strong>Response:</strong> {contact.response}</p>
                  <p><strong>Read Status:</strong> {contact.is_read ? 'Read' : 'Unread'}</p>
                  <p><strong>Created At:</strong> {new Date(contact.created_at).toLocaleString()}</p>
                  <p><strong>Updated At:</strong> {new Date(contact.updated_at).toLocaleString()}</p>
                  <button
                    onClick={() => handleEditContact(contact)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              )}
              {(isUpdating || isDeleting) && <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"><div className="loader"></div></div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Contacts;
