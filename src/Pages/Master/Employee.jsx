import { useState } from 'react';
import { toast } from 'react-toastify';
import { Bell } from 'lucide-react';
import Table from '../../components/Table';
import FormModal from '../../components/modals/FormModal';
import LineUsersModal from '../../components/modals/LineUsersModal';
import {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from '../../store/api/master/EmployeeApi';
import {
  EMPLOYEE_COLUMNS,
  EMPLOYEE_FIELDS,
  EMPLOYEE_STATUS_OPTIONS,
} from '../../constants/EmployeeConstants';

function Employee() {
  const { data = [], isLoading } = useGetEmployeesQuery();

  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  // LINE notification modals
  const [lineListOpen, setLineListOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Employees with no line_user_id
  const unlinkedEmployees = data.filter((emp) => !emp.line_user_id);

  // ── Table CRUD ─────────────────────────────────────────────────────────────
  const handleAdd = async (payload) => {
    try {
      await createEmployee(payload).unwrap();
    } catch (err) {
      throw err;
    }
  };

  const handleEdit = async (payload) => {
    try {
      await updateEmployee(payload).unwrap();
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (row) => {
    try {
      await deleteEmployee(row.employee_id).unwrap();
    } catch (err) {
      throw err;
    }
  };

  // ── LINE link flow ─────────────────────────────────────────────────────────
  const handleSelectEmployee = (emp) => {
    setLineListOpen(false);
    setSelectedEmployee(emp);
  };

  const handleLinkSubmit = async (values) => {
    setUpdating(true);
    try {
      await updateEmployee(values).unwrap();
      toast.success('Done! Employee LINE connection updated.');
      setSelectedEmployee(null);
    } catch {
      toast.error("Oops! Update failed. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col min-w-0 flex-1">

      {/* ── LINE notification banner ──────────────────────────────────────── */}
      {unlinkedEmployees.length > 0 && (
        <div className="mx-4 md:mx-6 mt-4 md:mt-6 flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-800/40 flex items-center justify-center">
              <Bell size={15} className="text-amber-500 dark:text-amber-400" />
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
              <span className="font-bold">{unlinkedEmployees.length}</span>
              {unlinkedEmployees.length === 1 ? ' employee has' : ' employees have'} no LINE connection yet.
            </p>
          </div>
          <button
            onClick={() => setLineListOpen(true)}
            className="cursor-pointer shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors"
          >
            View
          </button>
        </div>
      )}

      {/* ── Main table ────────────────────────────────────────────────────── */}
      <Table
        title="Employee Master"
        columns={EMPLOYEE_COLUMNS}
        data={data}
        loading={isLoading}
        fields={EMPLOYEE_FIELDS}
        formColumns={2}
        searchKeys={['name', 'name_kana']}
        searchPlaceholder="Search by Name or Kana..."
        statusOptions={EMPLOYEE_STATUS_OPTIONS}
        addTitle="Add New Employee"
        editTitle="Edit Employee"
        viewTitle="Employee Details"
        deleteMessage={(row) =>
          `You're about to remove ${row.name}. This action can't be undone.`
        }
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* ── Unlinked employees list modal ──────────────────────────────────── */}
      <LineUsersModal
        isOpen={lineListOpen}
        employees={unlinkedEmployees}
        onSelect={handleSelectEmployee}
        onClose={() => setLineListOpen(false)}
      />

      {/* ── Edit modal (to link LINE) ──────────────────────────────────────── */}
      <FormModal
        isOpen={!!selectedEmployee}
        mode="edit"
        title="Link Employee to LINE"
        fields={EMPLOYEE_FIELDS}
        columns={2}
        initialValues={selectedEmployee ?? {}}
        submitting={updating}
        onSubmit={handleLinkSubmit}
        onClose={() => setSelectedEmployee(null)}
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default Employee;
