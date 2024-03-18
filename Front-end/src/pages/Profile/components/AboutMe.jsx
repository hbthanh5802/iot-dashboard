import images from '@/assets/images';

function AboutMe() {
  return (
    <section id="aboutMe">
      <div className="aboutMe__heading flex">
        <p className="aboutMe__title">
          About <span>Me</span>
        </p>
        <div className="separate aboutMe__separate"></div>
      </div>
      <section className="aboutMe__info flex flex-wrap content-center">
        <div
          className="aboutMe__avatar"
          style={{
            flex: 1,
            backgroundImage: `url(${images.avatar3})`,
          }}
        ></div>
        <div
          className="aboutMe_content"
          style={{
            flex: 2,
          }}
        >
          <ul className="firstInfo__list">
            <li>
              <p>Fullname:</p>
              <p>Hoang Ba Thanh</p>
            </li>
            <li>
              <p>Nickname:</p>
              <p>ThanK</p>
            </li>
            <li>
              <p>Date of birth:</p>
              <p>08/2002</p>
            </li>
            <li>
              <p>Address:</p>
              <p>Hanoi City</p>
            </li>
            <li>
              <p>Hobby:</p>
              <p>
                Reading books, Traveling and exploring, Music, Art and Creativity, Cooking and gastronomy, Continuous
                learning, Love for animals,...
              </p>
            </li>
          </ul>
          <p className="edu__title">Education:</p>
          <section className="aboutMe__edu">
            <ul className="edu-list">
              <li className="edu-list__item">
                <p>Posts and Telecommunications Institute of Technology</p>
                <p>From 2002 to Now</p>
              </li>
              <li className="edu-list__item">
                <p>Chuc Dong High School</p>
                <p>From 2017 to 2019</p>
              </li>
              <li className="edu-list__item">
                <p>Lam Dien Secondary School</p>
                <p>From 2012 to 2016</p>
              </li>
              <li className="edu-list__item">
                <p>Lam Dien Primary School</p>
                <p>From 2006 to 2011</p>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </section>
  );
}

export default AboutMe;
