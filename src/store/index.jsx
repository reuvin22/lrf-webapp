import { configureStore } from '@reduxjs/toolkit';
import { employeeApiSlice } from './api/master/EmployeeApi';
import { siteApiSlice } from './api/master/SiteApi';
import { categoryApiSlice } from './api/master/CategoryApi';
import { subcontractorApiSlice } from './api/master/SubcontractorApi';
import { workerApiSlice } from './api/master/WorkerApi';
import { siteAssignmentApiSlice } from './api/master/SiteAssignmentApi';
import { ratesApiSlice } from './api/master/RatesApi';
import { calendarApiSlice } from './api/master/CalendarApi';
import { settingsApiSlice } from './api/master/SettingsApi';
import { ocrApiSlice } from './api/OcrApi';

export const store = configureStore({
  reducer: {
    [employeeApiSlice.reducerPath]: employeeApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [siteApiSlice.reducerPath]: siteApiSlice.reducer,
    [subcontractorApiSlice.reducerPath]: subcontractorApiSlice.reducer,
    [workerApiSlice.reducerPath]: workerApiSlice.reducer,
    [siteAssignmentApiSlice.reducerPath]: siteAssignmentApiSlice.reducer,
    [ratesApiSlice.reducerPath]: ratesApiSlice.reducer,
    [calendarApiSlice.reducerPath]: calendarApiSlice.reducer,
    [settingsApiSlice.reducerPath]: settingsApiSlice.reducer,
    [ocrApiSlice.reducerPath]: ocrApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      employeeApiSlice.middleware,
      categoryApiSlice.middleware,
      siteApiSlice.middleware,
      subcontractorApiSlice.middleware,
      workerApiSlice.middleware,
      siteAssignmentApiSlice.middleware,
      ratesApiSlice.middleware,
      calendarApiSlice.middleware,
      settingsApiSlice.middleware,
      ocrApiSlice.middleware,
    ),
});
