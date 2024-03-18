import { useState } from 'react';

import './Profile.css';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import ContactMe from './components/ContactMe';
import Project from './components/Project';

function Profile() {
  const [profileTab, setProfileTab] = useState('home');

  return (
    <div className={'profile-wrapper'}>
      <div className="side-bar">
        <nav id="header__nav">
          <ul className="nav-list">
            <li className={`nav-list__item ${profileTab === 'home' && 'active'}`}>
              <a href="#home" onClick={() => setProfileTab('home')}>
                Home
              </a>
            </li>
            <li className={`nav-list__item ${profileTab === 'aboutMe' && 'active'}`}>
              <a href="#aboutMe" onClick={() => setProfileTab('aboutMe')}>
                About Me
              </a>
            </li>
            <li className={`nav-list__item ${profileTab === 'project' && 'active'}`}>
              <a href="#project" onClick={() => setProfileTab('project')}>
                Project
              </a>
            </li>
            <li className={`nav-list__item ${profileTab === 'contact' && 'active'}`}>
              <a href="#contact" onClick={() => setProfileTab('contact')}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <main
        style={{
          padding: '20px 0 0 20px',
          overflowY: 'auto',
          height: '100%',
          flex: 1,
        }}
      >
        {profileTab === 'home' && <Home />}
        {profileTab === 'aboutMe' && <AboutMe />}
        {profileTab === 'project' && <Project />}
        {profileTab === 'contact' && <ContactMe />}
      </main>
    </div>
  );
}

export default Profile;
