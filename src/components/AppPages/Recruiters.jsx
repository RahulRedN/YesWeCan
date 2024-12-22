import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";
import classes from "./Recruiters.module.css";
import { FaLink } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

const Recruiters = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "videos", "KW7gJb9vYyiWsZmmrjg1");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data().links || []);
        } else {
          toast.error("No data found!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        toast.error("Failed to fetch data!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <Toaster position="top-center" />
      <h1 className={classes.header}>Recruiters</h1>
      {isLoading ? (
        <div className={classes.loader}>Loading...</div>
      ) : data.length > 0 ? (
        <div className={classes.linksContainer}>
          {data.map((item, index) => (
            <a
              key={index}
              className={classes.linkItem}
              href={
                item.link.startsWith("http://") ||
                item.link.startsWith("https://")
                  ? item.link
                  : `https://${item.link}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLink size={20} style={{ marginRight: "1rem" }} /> {item.name}
            </a>
          ))}
        </div>
      ) : (
        <p className={classes.noData}>No links available</p>
      )}
    </div>
  );
};

export default Recruiters;
