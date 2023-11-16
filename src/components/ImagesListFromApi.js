import React from "react";
import classes from "./ImagesListFromApi.module.css";

const ImagesListFromApi = () => {
  const getImgHandler = async () => {

    const response = await fetch(
      "https://api.le-systeme-solaire.net/rest/bodies/?filter[]=bodyType,eq,moon"
    );
    console.log("response: ", response);

    const data = await response.json();
    console.log("data: ", data);
  };

  return (
    <>
      <button className={classes.button} role="button" onClick={getImgHandler}>
        Get Images
      </button>
      {/* <div style={{ marginTop: "20px" }}>
        <img src={img} />
      </div> */}
    </>
  );
};

export default ImagesListFromApi;
