import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatchUserActive,
  selectBanUser,
  selectlogInData,
} from "../../Feactures/apiSlice";
import {
  selectModalActive,
  setModalActive,
  selectUserObj,
} from "../../Feactures/modalSlice";
import { Modal } from "antd";

function UserActiveBox() {
  const modalActive = useSelector(selectModalActive);
  const userObj = useSelector(selectUserObj);
  const dispatch = useDispatch();
  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;
  const banUser = useSelector(selectBanUser);

  const patchData = { status: !userObj?.status };
  console.log(patchData);
  const handleActive = () => {
    dispatch(
      fetchPatchUserActive({
        api: `user/${userObj?._id}`,
        patchData,
        accessToken,
      })
    );
    dispatch(setModalActive(false));
  };

  console.log(banUser);

  return (
    <>
      <Modal
        centered
        open={modalActive}
        onOk={handleActive}
        onCancel={() => dispatch(setModalActive(false))}
        width={700}
        okText={"Save"}
        className="modalStyle"
      >
        {userObj?.status ? (
          <div style={{ fontSize: "2rem" }}>
            Are you sure to ban this user
            <span style={{ color: "#4ade80", marginLeft: "10px" }}>
              {userObj?.name}
            </span>
          </div>
        ) : (
          <div style={{ fontSize: "2rem" }}>
            Are you sure to unban this user
            <span style={{ color: "#4ade80", marginLeft: "10px" }}>
              {userObj?.name}
            </span>
          </div>
        )}
      </Modal>
    </>
  );
}

export default UserActiveBox;
