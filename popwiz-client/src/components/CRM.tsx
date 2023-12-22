import { FunctionComponent, useEffect, useState } from "react";
import User from "../interfaces/User";
import { deleteUser, getUsers } from "../services/usersServices";
import { Link, useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import { errorMsg, successMsg } from "../services/feedbacksServices";

interface CRMProps {
  userInfo: any;
  setUserInfo: Function;
}

const CRM: FunctionComponent<CRMProps> = ({ userInfo, setUserInfo }) => {
  let navigate = useNavigate();

  let [users, setUsers] = useState<User[]>([]);
  let [usersChanged, setUsersChanged] = useState<boolean>(false);

  let render = () => {
    setUsersChanged(!usersChanged);
  };
  useEffect(() => {
    if (!userInfo.isAdmin) {
      errorMsg("You are Not authorized");
      navigate("/");
      return;
    }
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [usersChanged]);

  let handleDelete = (user: User) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(user._id as string)
        .then((res) => {
          successMsg("User removed successfully");

          render();
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="container">
        {users.length ? (
          <table className="table table-bordered table-crm">
            <thead>
              <tr className="table-success">
                <th className="name">Name</th>
                <th className="mail">E-mail</th>
                <th className="role">role</th>
                <th className="edit">Edit User</th>
                <th className="delete">Delete User</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
                <tr key={user._id}>
                  <td>
                    {user.firstName}&nbsp;
                    {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Admin" : "User"}</td>
                  <td>
                    <Link to={`/users/user-profile/${user._id}`}>
                      <i className="bi bi-pencil-square" />
                    </Link>
                  </td>
                  <td>
                    <Link to="" onClick={() => handleDelete(user)}>
                      <i className="bi bi-trash3" style={{ color: "#d23737" }}></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3>There are no users</h3>
        )}
      </div>
      <div className="container">
        <AddProduct setUserInfo={setUserInfo} userInfo={userInfo} />
      </div>
    </>
  );
};

export default CRM;
