import Header from './Header';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="content">
          <h3>Content</h3>
        </div>
      </div>
    </div>
  );
}

export default Layout;
