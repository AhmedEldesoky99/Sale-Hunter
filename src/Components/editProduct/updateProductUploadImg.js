import { useState } from "react";
import Steps from "../createProductSteps";
import Meta from "./updateProductMeta";
import BasicInfo from "./updateProductBasic";
//importing Assets
import CloseIcon from "../../Assets/Images/close.png";

//local storage
const dark = localStorage["darkMode"];
const ar = localStorage["ar"];

const ProductImage = (props) => {
  const [Next, setNext] = useState(false);
  const [Perv, setPerv] = useState(false);
  const [imageRight, setImageRight] = useState((state) =>
    props.images[0].length > 0 ? props.images[0][0].img_url : ""
  );
  const [imageMiddle, setImageMiddle] = useState((state) =>
    props.images[0].length > 0 ? props.images[0][1].img_url : ""
  );
  const [imageLeft, setImageLeft] = useState((state) =>
    props.images[0].length > 0 ? props.images[0][2].img_url : ""
  );
  const [error, setError] = useState(false);
  const [errorList, setErrorList] = useState([]);

  //handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    if (reader && file) reader.readAsDataURL(file);

    if (e.target.name === "imageLeft") {
      reader.onloadend = () => {
        setImageLeft(reader.result);
      };
    }
    if (e.target.name === "imageMiddle") {
      reader.onloadend = () => {
        setImageMiddle(reader.result);
      };
    }
    if (e.target.name === "imageRight") {
      reader.onloadend = () => {
        setImageRight(reader.result);
      };
    }
  };
  //prevent submit form
  const hanldeForm = (e) => {
    e.preventDefault();
  };
  //submit form
  const submitForm = (e) => {
    setNext(true);
  };
  //handle perv btn
  const pervHandler = () => {
    setPerv(true);
  };
  const closeAddProduct = () => {
    props.setVisibility(false);
  };
  return (
    <div className="container">
      {!Next && (
        <div className="content">
          <img
            className="close-icon"
            src={CloseIcon}
            alt="close"
            onClick={() => closeAddProduct()}
          />

          <div className={`product-data ${dark ? "dark-window" : ""}`}>
            <Steps active="image" />
            <div className={`step-info ${ar ? "ar" : ""} `}>
              <h2 className={ar ? "ar" : ""}>
                {!ar ? " Product Images" : " صور المنتج"}
              </h2>
              <p className={ar ? "ar" : ""}>
                {!ar ? " Upload product image" : "قم برفع صور المنتج "}
              </p>
            </div>
            <form onSubmit={hanldeForm}>
              <div className={`product-inputs ${ar ? "ar" : ""} `}>
                <div
                  className="upload-images"
                  style={{ backgroudColor: "#F00" }}
                >
                  <label
                    for="file1"
                    className={`upload-header ${ar ? "ar" : ""}
                  ${dark ? "dark-text" : ""}`}
                  >
                    {!ar
                      ? "  Click or drag files to upload"
                      : " انقر أو اسحب الملفات للتحميل"}
                  </label>
                  {imageLeft && (
                    <img className="img" src={imageLeft} alt="image1" />
                  )}
                </div>
                <div className="upload-images">
                  <label
                    for="file2"
                    className={`upload-header ${ar ? "ar" : ""}
                  ${dark ? "dark-text" : ""}`}
                  >
                    {!ar
                      ? "  Click or drag files to upload"
                      : " انقر أو اسحب الملفات للتحميل"}
                  </label>
                  {imageMiddle && (
                    <img className="img" src={imageMiddle} alt="image1" />
                  )}
                </div>
                <div className="upload-images">
                  <label
                    for="file3"
                    className={`upload-header ${ar ? "ar" : ""}
                  ${dark ? "dark-text" : ""}`}
                  >
                    {!ar
                      ? "  Click or drag files to upload"
                      : " انقر أو اسحب الملفات للتحميل"}
                  </label>
                  {imageRight && (
                    <img className="img" src={imageRight} alt="image1" />
                  )}
                </div>
              </div>

              <div className="btns">
                {/* <div className="button ">
                  <button className="btn-fill" onClick={() => pervHandler()}>
                    {!ar ? "Previous step" : "الخطوة السابقة"}
                  </button>
                </div> */}
                <div className="button">
                  <button className="btn-fill" onClick={() => submitForm()}>
                    {!ar ? "Next Step" : " الخطوة التالية"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className={ar ? "ar" : ""}>
        {Next && (
          <Meta
            images={[imageLeft, imageMiddle, imageRight]}
            nameAr={props.nameAr}
            nameEn={props.nameEn}
            sale={props.sale}
            price={props.price}
            categoryAr={props.categoryAr}
            categoryEn={props.categoryEn}
            storeID={props.storeID}
            meta={props.meta}
            setVisibility={(newState) => props.setVisibility(newState)}
            productID={props.productID}
          />
        )}
        {/* {Perv && <BasicInfo />} */}
      </div>
    </div>
  );
};
export default ProductImage;
