// // this is the Layout of the Dashboard

import {
    FaBook,
  // FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaShoppingCart,
  // FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";

import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";

const DashBoard = () => {
  const [cart] = useCart();

  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-orange-500 fixed top-0 left-0">
        <ul className="p-4 mt-6">
          { isAdmin ? (
            <>
              <li className="flex items-center gap-3 mb-10">
                <FaHome />
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "black",
                  })}
                  to="/dashboard/adminHome"
                >
                  Admin Home
                </NavLink>
              </li>


              <li className="flex items-center gap-3 mb-10">
                <FaUtensils />
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "black",
                  })}
                  to="/dashboard/addItems"
                >
                  Add Items
                </NavLink>
              </li>


              <li className="flex items-center gap-3 mb-10">
                <FaList />
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "black",
                  })}
                  to="/dashboard/manageItems"
                >
                  Manage Items
                </NavLink>
              </li>


              <li className="flex items-center gap-3 mb-10">
                <FaBook />
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "black",
                  })}
                  to="/dashboard/bookings"
                >
                  Manage Bookings
                </NavLink>
              </li>


              <li className="flex items-center gap-3 mb-10">
                <FaUsers />
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "black",
                  })}
                  to="/dashboard/users"
                >
                  All Users
                </NavLink>
              </li>

            </>
          ) : (

            <>
            

            <li className="flex items-center gap-3 mb-10">
                <FaHome />
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "black",
                  })}
                  to="/dashboard/userHome"
                >
                  User Home
                </NavLink>
              </li>

              

              <li className="flex items-center gap-3 mb-10">
                <FaUtensils />
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "black",
                  })}
                  to="/dashboard/reservations"
                >
                  Reservations
                </NavLink>
              </li>


              
              <li className="flex items-center gap-3 mb-10">
                <FaShoppingCart />
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "black",
                  })}
                  to="/dashboard/cart"
                >
                  My cart ({cart.length})
                </NavLink>
              </li>



              <li className="flex items-center gap-3 mb-10">
                <FaList />
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "black",
                  })}
                  to="/dashboard/addItems"
                >
                  My bookings
                </NavLink>
              </li>
            </>
          )}


          <div className="divider divider-primary"></div>



          <li className="flex items-center gap-3 mb-10">
            <FaHome />
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "blue" : "black",
              })}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="flex items-center gap-3 mb-10">
            <FaList />
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "blue" : "black",
              })}
              to="/order/salad"
            >
              Menu
            </NavLink>
          </li>
          <li className="flex items-center gap-3 mb-10">
            <FaEnvelope />
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "blue" : "black",
              })}
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Right-side content */}
      <div className="flex-1 ml-64 md:ml-24 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
