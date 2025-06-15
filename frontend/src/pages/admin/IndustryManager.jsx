import React, { useEffect, useState } from 'react';
import {
  getAllIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
} from '../../services/Industry';
import { Button, Form, Table, Modal, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

const IndustryManager = () => {
  const [industries, setIndustries] = useState([]);
  const [newIndustry, setNewIndustry] = useState('');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // { id, name }
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const res = await getAllIndustries();
      setIndustries(res.industries || []);
    } catch (err) {
      toast.error('Failed to fetch industries');
    } finally {
      setLoading(false);
    }
  };

  const handleAddIndustry = async () => {
    if (!newIndustry.trim()) return;
    try {
      await createIndustry(newIndustry.trim());
      toast.success('Industry added');
      setNewIndustry('');
      fetchIndustries();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding industry');
    }
  };

  const handleUpdate = async () => {
    try {
      await updateIndustry(editing.id, editing.name.trim());
      toast.success('Industry updated');
      setEditing(null);
      fetchIndustries();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating industry');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteIndustry(selectedToDelete);
      toast.success('Industry deleted');
      setShowDeleteModal(false);
      fetchIndustries();
    } catch (err) {
      toast.error('Error deleting industry');
    }
  };

  if (loading) return <Spinner className="d-block mx-auto mt-5" animation="border" />;

  return (
    <div className="container py-5">
      <h3 className="mb-4">Manage Industries</h3>

      {/* Add New Industry */}
      <div className="d-flex mb-4 gap-2">
        <Form.Control
          type="text"
          placeholder="Enter new industry"
          value={newIndustry}
          onChange={(e) => setNewIndustry(e.target.value)}
        />
        <Button onClick={handleAddIndustry} disabled={!newIndustry.trim()}>Add</Button>
      </div>

      {/* Industry Table */}
      <Table bordered hover className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Industry Name</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {industries.map((industry, index) => (
            <tr key={industry.id}>
              <td>{index + 1}</td>
              <td>
                {editing?.id === industry.id ? (
                  <Form.Control
                    type="text"
                    value={editing.name}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                  />
                ) : (
                  industry.name
                )}
              </td>
              <td className="text-center">
                {editing?.id === industry.id ? (
                  <>
                    <Button
                      size="sm"
                      variant="success"
                      className="me-2"
                      onClick={handleUpdate}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setEditing(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="warning"
                      className="me-2"
                      onClick={() =>
                        setEditing({ id: industry.id, name: industry.name })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        setSelectedToDelete(industry.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Confirm Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this industry?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IndustryManager;
