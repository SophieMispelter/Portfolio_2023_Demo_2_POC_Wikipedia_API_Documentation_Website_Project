import React, { useState } from "react";
import classes from "./ImagesListFromApi.module.css";

const ImagesListFromApi = () => {
  const [img, setImg] = useState([]);

  const getImgHandler = async () => {
    const response = await fetch(
      "https://api.le-systeme-solaire.net/rest/bodies/?filter[]=bodyType,eq,moon"
    );
    // console.log("response: ", response);

    const data = await response.json();
    console.log("data: ", data);

    const englishNameArray = [];
    data.bodies.forEach((el) => {
      //   console.log(el.englishName)
      return englishNameArray.push(el.englishName);
    });
    // console.log("englishNameArray: ", englishNameArray);

    const dynamicWikiUrlsArray = englishNameArray.map((el) => {
      return `http://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        el
      )}%20(moon)&prop=pageimages&format=json&pithumbsize=256&origin=*`;
    });
    // console.log("dynamicWikiUrlsArray: ", dynamicWikiUrlsArray);

    let requests = dynamicWikiUrlsArray.map((url) => fetch(url));
    // console.log("requests: ", requests);

    Promise.all(requests)
      .then((responses) => {
        // console.log("response: ", responses);
        const responseArr = responses.map((r) => r.json());
        return Promise.all(responseArr);
      })
      .then((results) => {
        // console.log("results: ", results);

        let requestObjValues = [];
        let thumbnailUrlsArray = [];
        results.forEach((obj) => {
          //   console.log("obj: ", obj.query.pages);

          requestObjValues = Object.values(obj.query.pages);
          //   console.log("thumbnailUrlsArray: ", thumbnailUrlsArray[0]);

          if (requestObjValues[0].thumbnail === undefined) {
            console.log("No image associated!");
          } else {
            // console.log(
            //   "requestObjValues: ",
            //   requestObjValues[0].thumbnail.source
            // );
            thumbnailUrlsArray.push(requestObjValues[0].thumbnail.source);
          }
        });
        // console.log("thumbnailUrlsArray: ", thumbnailUrlsArray);
        setImg(thumbnailUrlsArray);
      });
  };

  return (
    <>
      <button className={classes.button} role="button" onClick={getImgHandler}>
        Get Images
      </button>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {img &&
          img.map((el, i) => (
            <div key={i} style={{ marginTop: "20px" }}>
              <img src={el} />
            </div>
          ))}
      </div>
    </>
  );
};

export default ImagesListFromApi;
