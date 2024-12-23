import React from "react";
import LiveClassCard from "../AppComponents/LiveClassCard";
import classes from "./Live.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/config";

import { FaRegCircleDot } from "react-icons/fa6";

const Live = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const compareDates = (a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();

      return dateB - dateA;
    };

    const fetch = async () => {
      try {
        const liveCLassesRef = collection(db, "live_classes");
        const res = await getDocs(liveCLassesRef);
        const liveCLasses = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        liveCLasses.sort(compareDates);

        setData(liveCLasses);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <FaRegCircleDot color="red" /> Live Classes
        </div>
        <div className={classes.liveClasses}>
          {data?.map((liveCls, idx) => (
            <LiveClassCard
              key={idx}
              title={liveCls.title}
              address={liveCls.address}
            />
          ))}
          {data?.length == 0 && <>No Live Classes</>}
        </div>
        <div className={classes.emptyHeight}></div>
      </div>
    </>
  );
};

export default Live;
