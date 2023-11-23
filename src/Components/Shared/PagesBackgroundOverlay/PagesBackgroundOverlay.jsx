import { Parallax } from "react-parallax";

const PagesBackgroundOverlay = ({ img, bgTittle }) => {
  return (
    
    <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt="Bg Img"
        strength={-100}
        className="mb-20"
    >
        <div
        className="hero h-[36rem]"
        // style={{ backgroundImage: `url(${img})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content h-56 bg-[#bcb6b6] bg-opacity-20 py-40 w-full">
          <div className="max-w-md ">
            <h1 className="mb-5 text-5xl font-bold uppercase">{bgTittle}</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>
        {/* <div style={{ height: '50px' }} /> */}
    </Parallax>
  );
};

export default PagesBackgroundOverlay;
