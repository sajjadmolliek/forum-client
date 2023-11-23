const HeaderTittle = ({ heading, tittle }) => {
  return (
    <div className="md:w-4/12 text-center mx-auto my-10">
      <p className="text-lg italic text-[#ffa600a1]">--- {tittle} ---</p>
      <h3 className="text-4xl font-bold mt-2 mb-5 border-y-[3px] py-4">
        {heading}
      </h3>
    </div>
  );
};

export default HeaderTittle;
