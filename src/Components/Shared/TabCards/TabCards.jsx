import Swal from "sweetalert2";
import useAuthProvider from "../../../Hooks/useAuthProvider/useAuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import useCart from "../../../Hooks/useCart/useCart";

const TabCards = ({ OrderFoodTab }) => {
  const { _id, name, image, price, recipe } = OrderFoodTab;
  const { user } = useAuthProvider();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [,refetch] = useCart();

  const handleAddToCart = () => {
    if (user && user?.email) {
      const cartItems = {
        name,
        image,
        price,
        userMail: user.email,
        cartMenuId: _id,
      };

      axiosSecure
        .post("http://localhost:5007/carts", cartItems)
        .then((response) => {
          if (response.data.acknowledged) {
            Swal.fire("Congratulation!!", `${name} Successfully add to cart`, "success");
            refetch()
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Swal.fire({
        title: "Sorry!!",
        text: "You need to Login First",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: location.pathname });
        }
      });
    }
  };

  return (
    <div className="card lg:w-96 h-[32rem] bg-base-100 border-[1px] border-slate-400 hover:shadow-xl mx-auto rounded-none">
      <figure>
        <img className="w-full" src={image} alt="Food Image" />
        <p className="absolute right-0 top-0 bg-slate-800 text-white px-2 mt-2 py-1 mr-2">
          ${price}
        </p>
      </figure>
      <div className="card-body flex justify-center items-center">
        <h2 className="card-title">{name}</h2>
        <p className="text-center">{recipe}</p>
        <div className="card-actions justify-center items-center">
          <button
            onClick={() => handleAddToCart(OrderFoodTab)}
            className="btn btn-outline text-orange-400 border-0 border-b-4 mt-10 bg-slate-50 border-orange-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabCards;
