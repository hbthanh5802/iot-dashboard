import Dashboard from '@/pages/Dashboard';
import SensorsHistory from '@/pages/SensorsHistory';
import ActionHistory from '@/pages/ActionHistory';
import Profile from '@/pages/Profile';

export const publicRoutes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/history/sensors',
    component: SensorsHistory,
  },
  {
    path: '/history/actions',
    component: ActionHistory,
  },
  {
    path: '/profile',
    component: Profile,
  },
];

export const privateRoutes = [];

// export default { publicRoutes, privateRoutes };
