const MenuItems = ({ menu }) => {
  const { name, image, price, recipe } = menu;
  return (
    <div className="flex gap-x-4 justify-center items-center w-11/12 mx-auto">
      <img
        style={{ borderRadius: "0 200px 200px 200px" }}
        className="w-16 h-16"
        src={image}
        alt="image"
      />
      <div className="my-2">
        <h1 className="uppercase ">{name}----------------</h1>
        <p className="">{recipe}</p>
      </div>
      <p className="text-yellow-500 w-20 mx-auto text-end ">$ {price}</p>
    </div>
  );
};

export default MenuItems;
