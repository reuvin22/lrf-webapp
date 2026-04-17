import Table from '../../components/Table';
import {
  SITES_COLUMNS,
  SITES_FIELDS,
  SITE_STATUS_OPTIONS,
} from '../../constants/SitesConstants';
import { useCreateSitesMutation, useDeleteSitesMutation, useGetSitesQuery, useUpdateSitesMutation } from '../../store/api/master/SiteApi';

function Sites() {
  const { data = [], isLoading } = useGetSitesQuery();

  const [createSite] = useCreateSitesMutation();
  const [updateSite] = useUpdateSitesMutation();
  const [deleteSite] = useDeleteSitesMutation();

  const handleAdd = async (payload) => {
    try {
      await createSite(payload).unwrap();
    } catch (err) {
      throw err;
    }
  };

  const handleEdit = async (payload) => {
    try {
      await updateSite(payload).unwrap();
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (row) => {
    try {
      await deleteSite(row.site_id).unwrap();
    } catch (err) {
      throw err;
    }
  };

  return (
    <Table
      title="Sites"
      columns={SITES_COLUMNS}
      data={data}
      loading={isLoading}
      fields={SITES_FIELDS}
      formColumns={2}
      searchKeys={['site_code', 'site_name', 'client_name']}
      searchPlaceholder="Search by Code, Name or Client..."
      statusOptions={SITE_STATUS_OPTIONS}
      addTitle="Add New Site"
      editTitle="Edit Site"
      viewTitle="Site Details"
      deleteMessage={(row) =>
        `You're about to remove "${row.site_name}". This action can't be undone.`
      }
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}

export default Sites;