/* eslint-disable react/prop-types */
import { Parallax } from "react-parallax";
import CustomizedInputBase from "../../../Pages/Home/BannerSearch/BannerSearch";

const PagesBackgroundOverlay = ({ img, bgTittle }) => {
  // const [searchData] = CustomizedInputBase();
  // console.log(searchData)
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={img}
      bgImageAlt="Bg Img"
      strength={-100}
      className="mb-20"
    >
      <div className="hero h-[40rem]">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="flex-col hero-content text-center text-neutral-content h-[20rem] bg-[#bcb6b6] bg-opacity-20 py-20 w-full">
          <div className="max-w-xl ">
            <h1 className="mb-5 text-xl md:text-3xl font-bold uppercase w-full">
              {bgTittle}
            </h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <CustomizedInputBase></CustomizedInputBase>
        </div>
      </div>
      {/* <div style={{ height: '50px' }} /> */}
    </Parallax>
  );
};

export default PagesBackgroundOverlay;
