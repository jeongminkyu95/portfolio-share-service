import React, { useEffect, useState } from "react";
import * as Api from "../../api";

const Like = ({ portfolioOwnerId, user }) => {
  const [like, setLike] = useState(false);

  const onClickLike = () => {
    const body = {
      commentId: portfolioOwnerId,
      userId: user,
    };

    if (like) {
      Api.post("like/unlike", body).then((res) => {
        if (res.data.unLike) {
          setLike(false);
        } else {
          console.log(res.data.err);
        }
      });
    } else {
      Api.post("like/uplike", body).then((res) => {
        if (res.data.upLike) {
          setLike(true);
        } else {
          console.log(res.data.err);
        }
      });
    }
  };

  useEffect(() => {
    Api.get("like/getLike", portfolioOwnerId).then((res) => {
      if (res.data) {
        setLike(!!res.data.length);
      }
    });
  }, []);

  const clickLike = () => {
    if (like) {
      setLike(false);
    } else {
      setLike(true);
    }
  };

  return (
    <>
      {like ? (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            clickLike();
            onClickLike();
          }}
        >
          💙
        </span>
      ) : (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            clickLike();
            onClickLike();
          }}
        >
          🤍
        </span>
      )}
    </>
  );
};

export default Like;
