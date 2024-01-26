import Dashboard from '@/pages/Dashboard';
import SensorsHistory from '@/pages/SensorsHistory';
import Profile from '@/pages/Profile';

const routes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/history',
    component: SensorsHistory,
  },
  {
    path: '/profile',
    component: Profile,
  },
];

export default routes;
