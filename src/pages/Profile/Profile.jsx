import classNames from 'classnames/bind';

import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
  return (
    <div className={cx('wrapper')}>
      <h3>Profile</h3>
    </div>
  );
}

export default Profile;
