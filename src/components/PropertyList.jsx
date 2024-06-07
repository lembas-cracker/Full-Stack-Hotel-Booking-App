import { API_BASE_URL } from "../api";
import useFetch from "../useFetchHook";
import "./property-list.css";
import LoadingIndicator from "./LoadingIndicator";
import ImageComponent from "./ImageComponent";

const PropertyList = () => {
  const { data, loading, error } = useFetch(API_BASE_URL + "/hotels/countByType");

  const images = [
    {
      fullImage:
        "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&amp;o=",
      previewImage: "fDMZzIT2ABI^tS?b009Zu6Rja$t6_2%gDkxWROWAE3WB4TkW%MjY8_t7xwt6tRRP",
    },
    {
      fullImage:
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
      previewImage: "fQNTt9o~-;RPD%%M~q%2xtf6s-ofM_a#xuoeRjxuxsITM{WBofa_kWxuadogayM{",
    },
    {
      fullImage:
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
      previewImage: "f7HB@[:h00s.Iq0M^F~V9v0L%L?v0}xa%g-onND%01ohw[Io%N9FI;WFD%_3M{-o",
    },
    {
      fullImage:
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
      previewImage: "fGC6fc%QIw?FM^Rk9oIyW?W-NFkD5GbajCM_%0a%$y$v$]NFxat8NHacacR.R.oe",
    },
    {
      fullImage:
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
      previewImage: "ffGc1WkXNzkCNJsRX:kCs:f7ofWCY8acnNWBn$kDv_e.R*j[WBkCNJkDkCofj[WB",
    },
  ];

  return (
    <div className="p-list">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {data?.length &&
            images.map((img, i) => (
              <div key={i} className="p-list-item">
                <ImageComponent src={img.fullImage} hash={img.previewImage} className="p-list-img" />
                <div className="p-list-title">
                  <h1>{data[i].type}</h1>
                  <h2>
                    {data[i].count} {data[i].type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
