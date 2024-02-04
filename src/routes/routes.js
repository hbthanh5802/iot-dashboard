import Dashboard from '@/pages/Dashboard';
import SensorsHistory from '@/pages/SensorsHistory';
import ActionHistory from '@/pages/ActionHistory';
import Profile from '@/pages/Profile';

const routes = [
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

export default routes;
