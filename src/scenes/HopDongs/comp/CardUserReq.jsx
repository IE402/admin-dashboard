import { useContext, useEffect, useState } from "react";
import "./Card.scss";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../services/user.service";
export function CardUserReq({ hopDong }) {
  const [benA, setbenA] = useState({});
  const [benB, setbenB] = useState({});
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userService.getUserById(hopDong.userIDs[0]);
        console.log("res", res);
        setbenA(res);
        const resB = await userService.getUserById(hopDong.userIDs[1]);
        console.log("res", resB);
        setbenA(resB);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleCreateContract = () => {
    console.log(`Tạo hợp đồng cho người dùng: ${userId}`);
    navigate("/rent", { state: { hopDong } });
    // Gọi API tạo hợp đồng tại đây, ví dụ:
    // await contractService.createContract(userId);
  };

  return (
    <li className="card-user-req">
      <div className="info">
        <h3>Người cho thuê: 
          {benA.fullName || (
            <span className="card-user-req__fallback">Không có tên</span>
          )}
        </h3>
        <h3> Người thuê
          {benB.fullName || (
            <span className="card-user-req__fallback">Không có tên</span>
          )}
        </h3>
        <p>
          Email:{" "}
          {benB.email || (
            <span className="card-user-req__fallback">Không có email</span>
          )}
        </p>
        <p>
          Số điện thoại:{" "}
          {benB.phone || (
            <span className="card-user-req__fallback">
              Không có số điện thoại
            </span>
          )}
        </p>
        <p>
          CMND:{" "}
          {benB.CMND || (
            <span className="card-user-req__fallback">Không có CMND</span>
          )}
        </p>
      </div>
      <button className="create-contract-btn" onClick={handleCreateContract}>
        Tạo hợp đồng
      </button>
    </li>
  );
}
