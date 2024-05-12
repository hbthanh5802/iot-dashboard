import images from '@/assets/images';

function ContactMe() {
  return (
    <>
      <p id="contact__title">
        Contact <span>Me</span>
      </p>
      <div
        className="separate"
        style={{
          height: '2px',
        }}
      ></div>

      <footer>
        <section id="contact" className="flex">
          <div className="contact__img">
            <img src={images.avatar2} alt="" />
          </div>
          <section className="contact__content">
            <ul className="contact__list">
              <li className="contact__item flex items-center relative">
                <span className="contact__icon">
                  <i className="fa-brands fa-square-facebook"></i>
                </span>
                <a className="contact__link" href="!#">
                  Hoàng Bá Thanh
                </a>
                <div className="contack__underline"></div>
              </li>
              <li className="contact__item flex items-center relative">
                <span className="contact__icon">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <a className="contact__link" href="!#">
                  038.232.1204
                </a>
                <div className="contack__underline"></div>
              </li>
              <li className="contact__item flex items-center relative">
                <span className="contact__icon">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <a className="contact__link" href="!#">
                  hbthanh.582002@gmail.com
                </a>
                <div className="contack__underline"></div>
              </li>
            </ul>
          </section>
        </section>
        <section className="copyright">
          <p className="copyright__content">This website was created by @ThanK PT192.</p>
        </section>
      </footer>
    </>
  );
}

export default ContactMe;
