import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { selectlogInData } from "../../../Feactures/apiSlice";
import {
  selectMasterGameCat,
  selectMasterSubGameCat,
  fetchGetMasterGameCat,
  fetchGetMasterSubGameCat,
} from "../../../Feactures/apiSlice";

import { useSelector, useDispatch } from "react-redux";
import UserDetailGameCat from "./UserDetailGameCat";
import { selectEditCommision } from "../../../Feactures/apiSlice";

import styles from "../CustomBox.module.css";
import UserSubGameBox from "./UserSubGameBox";
import UserDetailCom from "./UserDetailCom";
import UserProfile from "./UserProfile";

function UserDetailBox() {
  const { id } = useParams();
  const editCommision = useSelector(selectEditCommision);

  useEffect(() => {
    dispatch(
      fetchGetMasterGameCat({
        api: "mastercatstatus",
        idData: id,
        accessToken,
      })
    );
  }, []);

  const masterSubGameCat = useSelector(selectMasterSubGameCat);
  const dispatch = useDispatch();

  const masterGameCat = useSelector(selectMasterGameCat);

  const logInData = useSelector(selectlogInData);
  const accessToken = logInData.token;

  useEffect(() => {
    dispatch(
      fetchGetMasterSubGameCat({
        api: "mastersubcatstatus",
        idData: id,
        accessToken,
      })
    );
  }, [editCommision]);

  const masterGameArr = masterGameCat?.data.allGameCatStatus.categoryStatus;
  const masterSubGameArr =
    masterSubGameCat?.data.allGameSubCatStatus.subCatStatus;
  console.log(masterSubGameArr && masterSubGameArr);
  console.log(masterGameArr && masterGameArr);

  return (
    <div className="page_style">
      <section>
        <UserProfile id={id} />
        <UserDetailGameCat
          data={masterGameArr}
          masterId={id}
          subGameArr={masterSubGameArr}
        />

        <UserDetailCom
          gameSubGame={masterSubGameArr}
          masterId={id}
          accessToken={accessToken}
        />
      </section>
      <UserSubGameBox masterId={id} />
    </div>
  );
}

export default UserDetailBox;
