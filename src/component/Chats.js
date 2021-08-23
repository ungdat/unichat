import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

// const Chats = () => {
export default function Chats() {
  const didMountRef = useRef(false);
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  console.log(user);
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      if (!user) {
        history.push("/");
        return;
      }
      // axios
      //   .get("https://api.chatengine.io/users/", {
      //     headers: {
      //       "PRIVATE-KEY": "77846914-6529-45b4-ae9d-ae08707a33a6",
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   });
      axios
        .get("https://api.chatengine.io/users/me/", {
          headers: {
            "Project-ID": "e37f8d64-672c-4f47-baa4-6de2308b3fe7",
            "User-Name": user.email,
            "User-Secret": user.uid,
          },
        })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          let formdata = new FormData();
          formdata.append("email", user.email);
          formdata.append("username", user.displayName);
          formdata.append("secret", user.uid);

          getFile(user.photoURL).then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);

            axios
              .post("https://api.chatengine.io/users/", formdata, {
                headers: {
                  "PRIVATE-KEY": "77846914-6529-45b4-ae9d-ae08707a33a6",
                },
              })
              .then(() => setLoading(false))
              .catch((error) => console.log(error));
          });
        });
    }
  }, [user, history]);

  if (!user || loading) return "loading...";

  return (
    <div>
      <div className="menuChat">
        <div className="uniChat">Unichat</div>
        <div className="auth">Ừng Quốc Đạt</div>
        <div className="btnLogout" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="e37f8d64-672c-4f47-baa4-6de2308b3fe7"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}
// export default Chats;

// export default function Chats() {
//   const didMountRef = useRef(false);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();
//   const history = useHistory();

//   async function handleLogout() {
//     await auth.signOut();
//     history.push("/");
//   }

//   async function getFile(url) {
//     let response = await fetch(url);
//     let data = await response.blob();
//     return new File([data], "test.jpg", { type: "image/jpeg" });
//   }

//   useEffect(() => {
//     if (!didMountRef.current) {
//       didMountRef.current = true;

//       if (!user || user === null) {
//         history.push("/");
//         return;
//       }

//       // Get-or-Create should be in a Firebase Function
//       axios
//         .get("https://api.chatengine.io/users/me/", {
//           headers: {
//             "project-id": "e37f8d64-672c-4f47-baa4-6de2308b3fe7",
//             "user-name": user.email,
//             "user-secret": user.uid,
//           },
//         })

//         .then(() => setLoading(false))

//         .catch((e) => {
//           let formdata = new FormData();
//           formdata.append("email", user.email);
//           formdata.append("username", user.email);
//           formdata.append("secret", user.uid);

//           getFile(user.photoURL).then((avatar) => {
//             formdata.append("avatar", avatar, avatar.name);

//             axios
//               .post("https://api.chatengine.io/users/", formdata, {
//                 headers: {
//                   "private-key": "77846914-6529-45b4-ae9d-ae08707a33a6",
//                 },
//               })
//               .then(() => setLoading(false))
//               .catch((e) => console.log("e", e.response));
//           });
//         });
//       // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     }
//   }, [user, history]);

//   if (!user || loading) return <div />;

//   return (
//     <div className="chats-page">
//       <div className="nav-bar">
//         <div className="logo-tab">Unichat</div>

//         <div onClick={handleLogout} className="logout-tab">
//           Logout
//         </div>
//       </div>

//       <ChatEngine
//         height="calc(100vh - 66px)"
//         projectID="e37f8d64-672c-4f47-baa4-6de2308b3fe7"
//         userName={user.email}
//         userSecret={user.uid}
//       />
//     </div>
//   );
// }
