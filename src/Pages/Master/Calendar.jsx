import React, { useMemo } from 'react';
import { formatDate } from '../../utils/dateUtils';
import Table from '../../components/Table';
import { CALENDAR_COLUMNS, CALENDAR_FIELDS } from '../../constants/CalendarConstants';
import {
  useGetCalendarsQuery,
  useCreateCalendarMutation,
  useUpdateCalendarMutation,
  useDeleteCalendarMutation,
  useGetDayTypesQuery,
} from '../../store/api/master/CalendarApi';

function Calendar() {
  const { data = [], isLoading } = useGetCalendarsQuery();
  const { data: dayTypes = [] }  = useGetDayTypesQuery();
  console.log('dayTypes', dayTypes);

  const [createCalendar] = useCreateCalendarMutation();
  const [updateCalendar] = useUpdateCalendarMutation();
  const [deleteCalendar] = useDeleteCalendarMutation();

  const dayTypeMap = useMemo(() => {
    const map = {};
    dayTypes.forEach((dt) => {
      map[dt.id] = dt.value;
    });
    return map;
  }, [dayTypes]);

  const enrichedData = useMemo(() =>
    data.map((cal) => ({
      ...cal,
      day_type_name: dayTypeMap[cal.day_type] ?? cal.day_type,
    })),
    [data, dayTypeMap],
  );

  const fields = useMemo(() =>
    CALENDAR_FIELDS.map((f) =>
      f.name === 'day_type'
        ? {
            ...f,
            options: dayTypes.map((dt) => ({
              label: dt.value,
              value: dt.id,
            })),
          }
        : f
    ),
    [dayTypes],
  );

  const handleAdd = async (payload) => {
    const { id: _id, ...data } = payload;
    await createCalendar(data).unwrap();
  };

  const handleEdit = async (payload) => {
    await updateCalendar({
      ...payload,
      calendar_id: payload.calendar_id ?? payload.id,
    }).unwrap();
  };

  const handleDelete = async (row) => {
    await deleteCalendar(row.calendar_id ?? row.id).unwrap();
  };

  return (
    <Table
      title="Calendar"
      columns={CALENDAR_COLUMNS}
      data={enrichedData}
      fields={fields}
      formColumns={2}
      loading={isLoading}
      searchKeys={['date', 'day_type_name', 'note']}
      searchPlaceholder="Search by Date or Day Type..."
      addTitle="Add Calendar Entry"
      editTitle="Edit Calendar Entry"
      viewTitle="Calendar Entry Details"
      deleteMessage={(row) =>
        `You're about to remove the entry for ${formatDate(row.date)}. This action can't be undone.`
      }
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}

export default Calendar;
