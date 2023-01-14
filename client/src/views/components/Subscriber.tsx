import axios from "axios";
import React, { useEffect, useState } from "react";
import { cls } from "../../libs/utils";

interface SubscriberProps {
  userTo?: string;
  userFrom?: string;
}

const Subscriber = ({ userTo, userFrom }: SubscriberProps) => {
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  const subscribeNumberVariables = {
    userTo,
    userFrom,
  };

  const onSubscribe = async () => {
    const subscribeVariable = {
      userTo,
      userFrom,
    };

    if (subscribed) {
      const res = await axios.post(
        "http://localhost:5000/api/subscribe/unsubscribe",
        subscribeVariable,
        { withCredentials: true }
      );

      if (res.data.success) {
        setSubscribeNumber((curr) => curr - 1);
        setSubscribed((curr) => !curr);
      } else {
        alert("Faield to unsubscribe");
      }
    } else {
      const res = await axios.post(
        "http://localhost:5000/api/subscribe/subscribe",
        subscribeVariable,
        { withCredentials: true }
      );
      if (res.data.success) {
        setSubscribeNumber((curr) => curr + 1);
        setSubscribed((curr) => !curr);
      } else {
        alert("Faield to subscribe");
      }
    }
  };

  useEffect(() => {
    const getSubscribeNumver = async () => {
      const res = await axios.post(
        "http://localhost:5000/api/subscribe/subscribeNumber",
        subscribeNumberVariables,
        { withCredentials: true }
      );
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
      } else {
        alert("Failed to get subscriber number");
      }
    };

    const getSubscribedInfo = async () => {
      const res = await axios.post(
        "http://localhost:5000/api/subscribe/subscribed",
        subscribeNumberVariables,
        { withCredentials: true }
      );
      if (res.data.success) {
        setSubscribed(res.data.subscribed);
      } else {
        alert("Failed to get Subscribed Info");
      }
    };

    getSubscribeNumver();
    getSubscribedInfo();
  }, [userTo]);

  return (
    <div
      className={cls(
        "px-8 py-2 rounded-3xl cursor-pointer hover:bg-red-700",
        subscribed ? "bg-[#AAAAAA] hover:bg-[#aaaaaac0]" : "bg-[#CC0000]"
      )}
      onClick={onSubscribe}
    >
      <span>
        {subscribeNumber} {subscribed ? "구독됨" : "구독"}
      </span>
    </div>
  );
};

export default Subscriber;
