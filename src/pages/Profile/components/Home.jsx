import images from '@/assets/images';

function Home() {
  return (
    <section id="home" className="overflow-hidden">
      <div className="home__greeting">
        <p className="first-greeting">Hello,</p>
        <p className="second-greeting">I am ThanK.</p>
        <p className="third-greeting">
          A versatile web developer skilled in both frontend and backend, with a touch of devops expertise.
        </p>
        <button className="btn_greeting">
          <a href="#">GET MORE</a>
        </button>
      </div>
      <div className="blob relative">
        <div className="blob__avatar">
          <svg
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            id="blobSvg"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{
                    stopColor: 'rgb(8, 174, 234)',
                  }}
                ></stop>
                <stop
                  offset="100%"
                  style={{
                    stopColor: 'rgb(42, 245, 152)',
                  }}
                ></stop>
              </linearGradient>
            </defs>
            <clipPath id="clip-path">
              <path>
                <animate
                  attributeName="d"
                  dur="30000ms"
                  repeatCount="indefinite"
                  values="M442,320Q443,390,376,411.5Q309,433,249.5,433Q190,433,126,410Q62,387,58.5,318.5Q55,250,53.5,178Q52,106,118.5,78.5Q185,51,253,40.5Q321,30,363,84Q405,138,423,194Q441,250,442,320Z;

                                            M453,306.5Q406,363,357.5,396.5Q309,430,241.5,456Q174,482,128.5,426.5Q83,371,72.5,310.5Q62,250,83.5,197.5Q105,145,143.5,93.5Q182,42,252.5,33Q323,24,383,67Q443,110,471.5,180Q500,250,453,306.5Z;

                                            M430.5,314.5Q427,379,370.5,413.5Q314,448,252,441.5Q190,435,128,409.5Q66,384,35,317Q4,250,31.5,181Q59,112,126,94Q193,76,252.5,68Q312,60,352.5,103Q393,146,413.5,198Q434,250,430.5,314.5Z;

                                            M419.5,307Q407,364,366,422Q325,480,256,462.5Q187,445,133.5,409Q80,373,57,311.5Q34,250,69,197Q104,144,140.5,84.5Q177,25,251,21.5Q325,18,373,72Q421,126,426.5,188Q432,250,419.5,307Z;

                                            M443.5,311Q418,372,366,410Q314,448,254.5,433Q195,418,127.5,403Q60,388,50.5,319Q41,250,48.5,179.5Q56,109,117.5,69.5Q179,30,246,42.5Q313,55,361.5,94.5Q410,134,439.5,192Q469,250,443.5,311Z;

                                            M442,320Q443,390,376,411.5Q309,433,249.5,433Q190,433,126,410Q62,387,58.5,318.5Q55,250,53.5,178Q52,106,118.5,78.5Q185,51,253,40.5Q321,30,363,84Q405,138,423,194Q441,250,442,320Z"
                ></animate>
              </path>
            </clipPath>
            <image
              clipPath="url(#clip-path)"
              xlinkHref={images.avatar}
              src={images.avatar}
              alt="Image"
              height="500"
              width="500"
              className="svg__image"
            ></image>
          </svg>
        </div>
        <div className="blob__back">
          <svg
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            id="blobSvg"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{
                    stopColor: 'rgb(8, 174, 234)',
                  }}
                ></stop>
                <stop
                  offset="100%"
                  style={{
                    stopColor: 'rgb(42, 245, 152)',
                  }}
                ></stop>
              </linearGradient>
            </defs>
            <path fill="url(#gradient)">
              <animate
                attributeName="d"
                dur="20000ms"
                repeatCount="indefinite"
                values="M442,320Q443,390,376,411.5Q309,433,249.5,433Q190,433,126,410Q62,387,58.5,318.5Q55,250,53.5,178Q52,106,118.5,78.5Q185,51,253,40.5Q321,30,363,84Q405,138,423,194Q441,250,442,320Z;

                                        M453,306.5Q406,363,357.5,396.5Q309,430,241.5,456Q174,482,128.5,426.5Q83,371,72.5,310.5Q62,250,83.5,197.5Q105,145,143.5,93.5Q182,42,252.5,33Q323,24,383,67Q443,110,471.5,180Q500,250,453,306.5Z;

                                        M430.5,314.5Q427,379,370.5,413.5Q314,448,252,441.5Q190,435,128,409.5Q66,384,35,317Q4,250,31.5,181Q59,112,126,94Q193,76,252.5,68Q312,60,352.5,103Q393,146,413.5,198Q434,250,430.5,314.5Z;

                                        M446,313.5Q425,377,374.5,427.5Q324,478,257,455.5Q190,433,135.5,403Q81,373,59,311.5Q37,250,71,197Q105,144,147.5,104.5Q190,65,254.5,51.5Q319,38,362.5,87.5Q406,137,436.5,193.5Q467,250,446,313.5Z;

                                        M443.5,311Q418,372,366,410Q314,448,254.5,433Q195,418,127.5,403Q60,388,50.5,319Q41,250,48.5,179.5Q56,109,117.5,69.5Q179,30,246,42.5Q313,55,361.5,94.5Q410,134,439.5,192Q469,250,443.5,311Z;

                                        M442,320Q443,390,376,411.5Q309,433,249.5,433Q190,433,126,410Q62,387,58.5,318.5Q55,250,53.5,178Q52,106,118.5,78.5Q185,51,253,40.5Q321,30,363,84Q405,138,423,194Q441,250,442,320Z"
              ></animate>
            </path>
          </svg>
        </div>
        <div className="blob__three">
          <svg
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            id="blobSvg"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{
                    stopColor: 'rgba(8, 174, 234)',
                  }}
                ></stop>
                <stop
                  offset="100%"
                  style={{
                    stopColor: 'rgb(42, 245, 152)',
                  }}
                ></stop>
              </linearGradient>
            </defs>
            <path fill="url(#gradient)">
              <animate
                attributeName="d"
                dur="30000ms"
                repeatCount="indefinite"
                values="M442,320Q443,390,376,411.5Q309,433,249.5,433Q190,433,126,410Q62,387,58.5,318.5Q55,250,53.5,178Q52,106,118.5,78.5Q185,51,253,40.5Q321,30,363,84Q405,138,423,194Q441,250,442,320Z;

                                        M453,306.5Q406,363,357.5,396.5Q309,430,241.5,456Q174,482,128.5,426.5Q83,371,72.5,310.5Q62,250,83.5,197.5Q105,145,143.5,93.5Q182,42,252.5,33Q323,24,383,67Q443,110,471.5,180Q500,250,453,306.5Z;

                                        M430.5,314.5Q427,379,370.5,413.5Q314,448,252,441.5Q190,435,128,409.5Q66,384,35,317Q4,250,31.5,181Q59,112,126,94Q193,76,252.5,68Q312,60,352.5,103Q393,146,413.5,198Q434,250,430.5,314.5Z;

                                        M446,313.5Q425,377,374.5,427.5Q324,478,257,455.5Q190,433,135.5,403Q81,373,59,311.5Q37,250,71,197Q105,144,147.5,104.5Q190,65,254.5,51.5Q319,38,362.5,87.5Q406,137,436.5,193.5Q467,250,446,313.5Z;

                                        M443.5,311Q418,372,366,410Q314,448,254.5,433Q195,418,127.5,403Q60,388,50.5,319Q41,250,48.5,179.5Q56,109,117.5,69.5Q179,30,246,42.5Q313,55,361.5,94.5Q410,134,439.5,192Q469,250,443.5,311Z;

                                        M442,320Q443,390,376,411.5Q309,433,249.5,433Q190,433,126,410Q62,387,58.5,318.5Q55,250,53.5,178Q52,106,118.5,78.5Q185,51,253,40.5Q321,30,363,84Q405,138,423,194Q441,250,442,320Z"
              ></animate>
            </path>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Home;
