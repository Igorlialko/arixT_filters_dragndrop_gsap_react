import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {useGetUsersQuery} from "../../store/api/usersAdminApi";
import {COUNT_ALL_USERS} from "../../helpers/const";
import {useTypedDispatch} from "../../hooks/useTypedRedux";
import {setUsers} from "../../store/reducers/userReducer";
import Preloader from "../../components/Preloader";


const Default = () => {

  const {data, isLoading, error} = useGetUsersQuery(COUNT_ALL_USERS);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (data) dispatch(setUsers(data));
  }, [data, dispatch]);


  return isLoading ? <Preloader/> :
    error ? <div>error</div> :
      (
        <>
          <Header/>
          <Outlet/>
          <Footer/>
        </>
      );
};

export default Default;