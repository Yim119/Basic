// React
import React from "react";
import { useEffect } from "react";

// React Router DOM
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";

// Action
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  /*
  - SpecificComponent : Auth의 관리를 받는 component(page)
  
  - option (=SpecificComponent의 속성)

  1. null : 아무나 출입이 가능한 페이지
  2. true : 로그인한 유저만 출입이 가능한 페이지
  3. false : 로그인한 유저는 출입 불가능한 페이지

  - adminRoute : 관리자 여부 판단 

   -> 기본값으로 null을 전달(es6 문법)
  */
  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      // auth action dispatch
      dispatch(auth()).then((response) => {
        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            navigate("/log-in");
          }
        } else {
          // 로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            if (!option && response.payload.isAdmin) {
              navigate("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
