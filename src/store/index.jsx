import { configureStore } from '@reduxjs/toolkit';
import { employeeApiSlice } from './api/master/EmployeeApi';
import { siteApiSlice } from './api/master/SiteApi';
import { categoryApiSlice } from './api/master/CategoryApi';
import { subcontractorApiSlice } from './api/master/SubcontractorApi';
import { workerApiSlice } from './api/master/WorkerApi';

export const store = configureStore({
  reducer: {
    [employeeApiSlice.reducerPath]: employeeApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [siteApiSlice.reducerPath]: siteApiSlice.reducer,
    [subcontractorApiSlice.reducerPath]: subcontractorApiSlice.reducer,
    [workerApiSlice.reducerPath]: workerApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApiSlice.middleware, categoryApiSlice.middleware, siteApiSlice.middleware, subcontractorApiSlice.middleware, workerApiSlice.middleware),
});
