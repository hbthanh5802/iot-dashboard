import images from '@/assets/images';

function Project() {
  return (
    <section id="project">
      <div className="aboutMe__heading flex">
        <p className="aboutMe__title">
          Look at my <span>Project</span>
        </p>
        <div className="separate aboutMe__separate"></div>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div className="project_content flex">
          <div className="project__item relative overflow-hidden">
            <section className="project__container project__front">
              <img src={images.proj_joysee} alt="" className="project__image" />
              <div className="project__info">
                <p className="project__tille">JoySee</p>
                <p className="project__desc">A fullstack movie website.</p>
              </div>
            </section>
            <div className="scrollbar">
              <section className="project__container project__back">
                <p>Technologies</p>
                <ul className="flex flex-wrap">
                  <li>React</li>
                  <li>NodeJS</li>
                  <li>Bootstrap</li>
                  <li>Redux</li>
                </ul>
                <p>Features</p>
                <ul className="flex flex-wrap">
                  <li>Personalized Recommendations</li>
                  <li>Interactive User Profiles</li>
                  <li>Real-time Reviews and Ratings</li>
                  <li>Dynamic Search and Filters</li>
                  <li>Responsive Design</li>
                  <li>Multilingual Support</li>
                </ul>
                <button className="project__btn">
                  <a href="!#">Explore it</a>
                </button>
              </section>
            </div>
          </div>
          <div className="project__item relative overflow-hidden">
            <section className="project__container project__front">
              <img src={images.proj_allymbirds} alt="" className="project__image" />
              <div className="project__info">
                <p className="project__tille">Allymbirds</p>
                <p className="project__desc">Awsome fullstack e-commerce website.</p>
              </div>
            </section>
            <section className="project__container project__back">
              <p>Technologies</p>
              <ul className="flex flex-wrap">
                <li>React</li>
                <li>NodeJS</li>
                <li>Bootstrap</li>
                <li>Redux</li>
              </ul>
              <p>Features</p>
              <ul className="flex flex-wrap">
                <li>Personalized Recommendations</li>
                <li>Interactive User Profiles</li>
                <li>Real-time Reviews and Ratings</li>
                <li>Dynamic Search and Filters</li>
                <li>Responsive Design</li>
                <li>Multilingual Support</li>
              </ul>
              <button className="project__btn">
                <a href="!#">Explore it</a>
              </button>
            </section>
          </div>
          <div className="project__item relative overflow-hidden">
            <section className="project__container project__front">
              <img src={images.proj_welcom} alt="" className="project__image" />
              <div className="project__info">
                <p className="project__tille">Welcm</p>
                <p className="project__desc">Awsome fullstack e-commerce website.</p>
              </div>
            </section>
            <section className="project__container project__back">
              <p>Technologies</p>
              <ul className="flex flex-wrap">
                <li>React</li>
                <li>NodeJS</li>
                <li>Bootstrap</li>
                <li>Redux</li>
              </ul>
              <p>Features</p>
              <ul className="flex flex-wrap">
                <li>Personalized Recommendations</li>
                <li>Interactive User Profiles</li>
                <li>Real-time Reviews and Ratings</li>
                <li>Dynamic Search and Filters</li>
                <li>Responsive Design</li>
                <li>Multilingual Support</li>
              </ul>
              <button className="project__btn">
                <a href="!#">Explore it</a>
              </button>
            </section>
          </div>
          <div className="project__item relative overflow-hidden">
            <section className="project__container project__front">
              <img src={images.proj_joysee} alt="" className="project__image" />
              <div className="project__info">
                <p className="project__tille">JoySee</p>
                <p className="project__desc">A fullstack movie website.</p>
              </div>
            </section>
            <div className="scrollbar">
              <section className="project__container project__back">
                <p>Technologies</p>
                <ul className="flex flex-wrap">
                  <li>React</li>
                  <li>NodeJS</li>
                  <li>Bootstrap</li>
                  <li>Redux</li>
                </ul>
                <p>Features</p>
                <ul className="flex flex-wrap">
                  <li>Personalized Recommendations</li>
                  <li>Interactive User Profiles</li>
                  <li>Real-time Reviews and Ratings</li>
                  <li>Dynamic Search and Filters</li>
                  <li>Responsive Design</li>
                  <li>Multilingual Support</li>
                </ul>
                <button className="project__btn">
                  <a href="!#">Explore it</a>
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Project;
