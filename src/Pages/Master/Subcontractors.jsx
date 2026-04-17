import Table from '../../components/Table';
import {
  SUBCONTRACTORS_COLUMNS,
  SUBCONTRACTORS_FIELDS,
} from '../../constants/SubcontractorsConstants';
import { useCreateSubcontractorMutation, useDeleteSubcontractorMutation, useGetSubcontractorsQuery, useUpdateSubcontractorMutation } from '../../store/api/master/SubcontractorApi';

function Subcontractors() {
  const { data = [], isLoading } = useGetSubcontractorsQuery();

  const [createSubcontractor] = useCreateSubcontractorMutation();
  const [updateSubcontractor] = useUpdateSubcontractorMutation();
  const [deleteSubcontractor] = useDeleteSubcontractorMutation();

  const handleAdd = async (payload) => {
    try {
      await createSubcontractor(payload).unwrap();
    } catch (err) {
      throw err;
    }
  };

  const handleEdit = async (payload) => {
    try {
      await updateSubcontractor(payload).unwrap();
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (row) => {
    try {
      await deleteSubcontractor(row.site_subcontractor_id).unwrap();
    } catch (err) {
      throw err;
    }
  };

  return (
    <Table
      title="Subcontractors"
      columns={SUBCONTRACTORS_COLUMNS}
      data={data}
      loading={isLoading}
      fields={SUBCONTRACTORS_FIELDS}
      formColumns={2}
      searchKeys={['company_name', 'contact_person', 'contact_phone']}
      searchPlaceholder="Search by Name or Contact..."
      addTitle="Add New Subcontractor"
      editTitle="Edit Subcontractor"
      viewTitle="Subcontractor Details"
      deleteMessage={(row) =>
        `You're about to remove "${row.company_name}". This action can't be undone.`
      }
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}

export default Subcontractors;
