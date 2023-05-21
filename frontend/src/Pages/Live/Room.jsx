import React from "react";
import { useParams } from "react-router-dom";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ChatState } from "../../Context/ChatProvider";

const Room = () => {
  const { roomID } = useParams();
  const { user } = ChatState();
  const name = user.name;
  const meeting = async (element) => {
    
    
    const appID = 682975401;
    const serverSecret = "be043b4e1e81b3b505f99727e3c51806";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      name
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };

  return <div ref={meeting} style={{ width: "100vw", height: "100vh" }}></div>;
};

export default Room