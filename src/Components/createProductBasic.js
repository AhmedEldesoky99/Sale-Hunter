import { useState, useRef } from "react";
import axios from "axios";
//from and validation
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

//import components
import ProductImage from "./createProductUploadImg";
import Steps from "./createProductSteps";

//importing utils
import { validationBasic } from "../Helper/ProductValidations";
//mui
import { Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "../Assets/Images/close.png";

//local storage
const dark = localStorage["darkMode"];
const ar = localStorage["ar"];
const JWT = localStorage["JWT"];

const BasicInfo = (props) => {
  const [Next, setNext] = useState(false);
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [price, setPrice] = useState("");
  const [sale, setSale] = useState(0);
  const [categoryAr, setCategoryAr] = useState("");
  const [categoryEn, setCategoryEn] = useState("");
  const [error, setError] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const popupModal = useRef(null);

  // Function To set state to input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nameEn") setNameEn(value);
    if (name === "nameAr") setNameAr(value);
    if (name === "price") setPrice(value);
    if (name === "sale") setSale(value);
    if (name === "categoryEn") setCategoryEn(value);
    if (name === "categoryAr") setCategoryAr(value);
  };

  //prevent submit form
  const hanldeForm = (e) => {
    e.preventDefault();
    const error = validationBasic(
      nameEn,
      nameAr,
      sale,
      price,
      categoryAr,
      categoryEn
    );
    if (error) {
      setError(true);
      setErrorList(error);
    }
    if (error.length === 0) setNext(true);
  };

  const closeAddProduct = (e) => {
    // popupModal.current.style.display = "none";
    props.setVisibility(false);
    // console.log(props);
    setNameAr("");
    setNameEn("");
    setCategoryAr("");
    setCategoryEn("");
    setPrice("");
    setSale(0);
  };

  return (
    <div className="container" ref={popupModal}>
      <div className="update-store-overlay"></div>

      {!Next && (
        <div className="content ">
          <img
            className="close-icon"
            src={CloseIcon}
            alt="close"
            onClick={() => closeAddProduct()}
          />

          <div
            className={`product-data ${dark ? "dark-window" : ""}`}
            id="basic"
          >
            {/* <Steps active="basic" /> */}
            <div className="steps-code-pen">
              <Steps active="basic" />
            </div>

            <div className={`step-info ${ar ? "ar" : ""} `}>
              <h2>{!ar ? "Basic Information" : "?????????????? ????????????"}</h2>
              <p>
                {!ar ? "Fill all Information below" : "???????? ???????? ??????????????????"}
              </p>
            </div>
            <Form onSubmit={hanldeForm}>
              <div className={`product-inputs ${ar ? "ar" : ""} `}>
                <div className="product-input">
                  <label htmlFor="product-name">
                    {!ar ? "Product Name EN" : " ?????? ???????????? ???????????? ????????????????"}
                  </label>
                  <Input
                    type="text"
                    id="product-name"
                    name="nameEn"
                    value={nameEn}
                    onChange={handleChange}
                  />
                </div>
                <div className={`product-input ${ar ? "ar" : ""} `}>
                  <label htmlFor="product-name-ar">
                    {!ar ? "Product Name Ar" : " ?????? ???????????? ???????????? ??????????????"}
                  </label>
                  <Input
                    type="text"
                    id="product-name-ar"
                    name="nameAr"
                    value={nameAr}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={`product-inputs ${ar ? "ar" : ""} `}>
                <div className="product-input">
                  <label htmlFor="price">
                    {" "}
                    {!ar ? "Price" : " ?????? ????????????"}
                  </label>
                  <Input
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={handleChange}
                  />
                </div>
                <div className={`product-input ${ar ? "ar" : ""} `}>
                  <label htmlFor="sale"> {!ar ? "Sale" : " ???????? ??????????"}</label>
                  <Input
                    type="number"
                    id="sale"
                    name="sale"
                    value={sale}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={`product-inputs ${ar ? "ar" : ""} `}>
                <div className={`product-input ${ar ? "ar" : ""} `}>
                  <label htmlFor="store-categoryEn">
                    {!ar ? "Category EN" : " ?????????????? ???????????? ????????????????"}
                  </label>

                  <div id="store-categoryEn" name="categoryEn">
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={categorysEn}
                      onChange={(event, value) => {
                        if (value) setCategoryEn(value.label);
                        // if (props.productID) {
                        //   value.label = categoryAr;
                        // }
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>
                </div>
                <div className="product-input">
                  <label htmlFor="store-category">
                    {" "}
                    {!ar ? "Category " : " ?????????????? ???????????? ??????????????"}
                  </label>

                  <div id="store-categoryAr" name="categoryAr">
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={categorysAr}
                      onChange={(event, value) => {
                        if (value) setCategoryAr(value.label);
                        // if (props.productID) {
                        //   value.label = categoryAr;
                        // }
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>
                </div>
              </div>
              {error &&
                errorList.map((error, key) => (
                  <Alert className={ar ? "ar" : ""} severity="error" key={key}>
                    {error}
                  </Alert>
                ))}

              <div className="button">
                <button className="btn-fill">
                  {!ar ? "Next Step" : " ???????????? ??????????????"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}

      <div className={ar ? "ar" : ""}>
        {Next && (
          <ProductImage
            nameAr={nameAr}
            nameEn={nameEn}
            sale={sale}
            price={price}
            categoryAr={categoryAr}
            categoryEn={categoryEn}
            storeID={props.storeID}
            productID={props.productID}
          />
        )}
      </div>
    </div>
  );
};
export default BasicInfo;

const categorysEn = [
  {
    label: "Phones and Tablets",
  },
  {
    label: "Industrial and Scientific",
  },
  {
    label: "Electronics",
  },
  {
    label: "Health and Beauty",
  },
  {
    label: "Fashion",
  },
  {
    label: "Computing",
  },
  {
    label: "Generic",
  },
  {
    label: "Home and Office",
  },
  {
    label: "Home and Kitchen",
  },
  {
    label: "Office Products",
  },
  {
    label: "Tools and Home Improvement",
  },
  {
    label: "Gaming",
  },
  {
    label: "Toys and Games",
  },
  {
    label: "Refinements",
  },
  {
    label: "Automobile",
  },
  {
    label: "Automotive",
  },
  {
    label: "Sports and Outdoors",
  },
  {
    label: "Health and Household Products",
  },
  {
    label: "Garden",
  },
  {
    label: "Grocery",
  },
  {
    label: "Sporting Goods",
  },
  {
    label: "Beauty",
  },
  {
    label: "Garden and Outdoors",
  },
  {
    label: "Pet Supplies",
  },
];
const categorysAr = [
  {
    label: "?????????????? ???????????????? ??????????????",
  },
  {
    label: "???????????????? ????????????????",
  },
  {
    label: "????????????????????",
  },
  {
    label: "?????????? ??????????????",
  },
  {
    label: "????????????",
  },
  {
    label: "??????????????",
  },
  {
    label: "????????",
  },
  {
    label: "???????????? ??????????????",
  },
  {
    label: "???????????? ??????????????",
  },
  {
    label: "???????????? ????????????",
  },
  {
    label: "?????????????? ???????????? ????????????",
  },
  {
    label: "??????????????",
  },
  {
    label: "?????????? ????????????????",
  },
  {
    label: "????????????????",
  },

  {
    label: "????????????????",
  },
  {
    label: "?????????????? ???? ???????????? ??????????",
  },
  {
    label: "???????????????? ???????????? ??????????????????",
  },
  {
    label: "??????????",
  },
  {
    label: "??????????",
  },
  {
    label: "?????????? ????????????????",
  },
  {
    label: "????????????",
  },
  {
    label: "?????????????? ???????????????? ????????????????",
  },
  {
    label: "???????????????? ?????????????????? ??????????????",
  },
];
