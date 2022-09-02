import React, { useEffect, useState } from "react";
import * as Api from "../../api";

const Like = ({ portfolioOwnerId, user }) => {
  const [like, setLike] = useState(false);
  //   const [action, setAction] = useState(null);

  //   const toggleLike = () => {
  //     const body = {
  //       commnetId: portfolioOwnerId.id,
  //       userId: user.id,
  //     };

  //     if (action === null) {
  //       Api.post("like/uplike", body).then((res) => {
  //         if (res.data.upLike) {
  //           setAction("liked");
  //           setLike((prev) => !prev);
  //         }
  //       });
  //     } else if (action === "liked") {
  //       Api.post("like/unlike", body).then((res) => {
  //         if (res.data.unlike) {
  //           setAction(null);
  //           setLike((prev) => !prev);
  //         }
  //       });
  //     }
  //   };

  //   useEffect(() => {
  //     const body = {
  //       commnetId: portfolioOwnerId.id,
  //     };
  //     Api.post("like/getlike", body).then((res) => {
  //       if (res.data.getlike) {
  //         setLike(res.data.like.length);

  //         res.data.like.map((like) => {
  //           if (like.userId === user.data.id) {
  //             setAction("liked");
  //           }
  //         });
  //       }
  //     });
  //   }, []);

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
          }}
        >
          💙
        </span>
      ) : (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            clickLike();
          }}
        >
          🤍
        </span>
      )}
    </>
  );
};

export default Like;
