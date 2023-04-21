import { useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

export default function SkuGenerator() {
  const [productName, setProductName] = useState();
  const [finalSKU, setFinalSKU] = useState();
  const [tempVariants, setTempVariants] = useState();
  const [tempVariantsList, setTempVariantsList] = useState([]);
  const [checked, setChecked] = useState([]);

  //Variants max 3
  const [variants1, setVariants1] = useState([]);
  const [variants2, setVariants2] = useState([]);
  const [variants3, setVariants3] = useState([]);

  //copy text to clipboard
  const [copyText, setCopyText] = useState([]);
  const [copyTextCode, setCopyTextCode] = useState([]);

  //All Product Variants
  const [allProductVariants, setAllProductVariants] = useState([]);

  //zero pad the current number
  function paddedSkuNumber(currentNum) {
    const skuLength = 4 - String(currentNum).length;
    let padString = "";

    //console.log("size: ", skuLength);

    for (let x = 0; x <= skuLength; x++) {
      padString = padString + "0";
    }

    return padString;
  }

  //set Color to line if checkbox is checked
  function setCheckbox(e, item) {
    const existed = checked.includes("check-" + item);

    if (e.target.checked === true) {
      if (!existed) {
        setChecked([...checked, "check-" + item]);
      }
    } else {
      setChecked(
        checked.filter((items) => {
          return items !== "check-" + item;
        })
      );
    }
    //console.log(e.target.checked);
    //console.log(existed);
  }

  //get product name initials
  function generateSkuInitials() {
    if (productName) {
      const tempProductName = productName.split(" ");
      //console.log(tempProductName);
      let tempSku = [];
      let tempJoinSku = "";

      tempProductName.map((name) => {
        tempSku.push(name.charAt(0));
      });

      //Set Product Initial for SKU code
      if (tempSku) {
        for (let x = 0; x <= tempSku.length; x++) {
          if (tempSku[x]) tempJoinSku = tempJoinSku += tempSku[x].toUpperCase();
        }
      }

      return tempJoinSku;
    }
  }

  //Generate SKU Details
  function generateDetails() {
    let listSKU = [];
    let variants = tempVariantsList;
    let tempAllProductVariants = [];
    //console.log(variants);

    for (let x = 0; x <= variants.length; x++) {
      if (variants[x]) {
        //console.log("main variants: ", mainVariants);
        if (variants[0] !== undefined) setVariants1(variants[0]);
        if (variants[1] !== undefined) setVariants2(variants[1]);
        if (variants[2] !== undefined) setVariants3(variants[2]);
      }
    }

    //if (variants1) console.log("variants 1: ", variants1);
    //if (variants2) console.log("variants 2: ", variants2);
    //if (variants3) console.log("variants 3: ", variants3);

    //IF ONLY 1 VARIANT TYPE
    if (variants.length === 1 && variants1) {
      for (let x = 0; x <= variants1.length; x++) {
        if (variants1[x] !== undefined) {
          tempAllProductVariants.push(productName + " " + variants1[x]);
        }
      }
    }

    //IF 2 VARIANT TYPES
    if (variants.length === 2 && variants1 && variants2) {
      for (let x = 0; x <= variants1.length; x++) {
        for (let y = 0; y <= variants2.length; y++) {
          if (variants1[x] !== undefined && variants2[y] !== undefined) {
            tempAllProductVariants.push(
              productName + " " + variants1[x] + " " + variants2[y]
            );
          }
        }
      }
    }

    //IF 3 VARIANT TYPES
    if (variants.length === 3 && variants1 && variants2 && variants3) {
      for (let x = 0; x <= variants1.length; x++) {
        for (let y = 0; y <= variants2.length; y++) {
          for (let z = 0; z <= variants3.length; z++) {
            if (
              variants1[x] !== undefined &&
              variants2[y] !== undefined &&
              variants3[z] !== undefined
            ) {
              tempAllProductVariants.push(
                productName +
                  " " +
                  variants1[x] +
                  " " +
                  variants2[y] +
                  " " +
                  variants3[z]
              );
            }
          }
        }
      }
    }

    //console.log(tempAllProductVariants);
    setAllProductVariants(tempAllProductVariants);

    if (tempAllProductVariants) {
      for (let x = 0; x <= tempAllProductVariants.length; x++) {
        if (tempAllProductVariants[x]) {
          listSKU.push([
            String(x),
            generateSkuInitials() + paddedSkuNumber(x + 1) + (x + 1),
            tempAllProductVariants[x],
          ]);
        }
      }
    }

    setFinalSKU(listSKU);
  }

  //RESET BUTTON
  function resetFields() {
    setProductName("");
    setFinalSKU([]);
    setTempVariants("");
    setTempVariantsList([]);
    setVariants1([]);
    setVariants2([]);
    setVariants3([]);
    setAllProductVariants([]);
    setChecked([]);
  }

  function copyToClipboard(code, text) {
    navigator.clipboard.writeText(text);
    setCopyTextCode([...copyTextCode, code + "-" + text]);
    setCopyText([...copyText, text]);
  }

  /*useEffect(() => {
    generateDetails();
  }, [allProductVariants]);*/
  if (copyText) console.log("copied text:", copyText);

  return (
    <>
      <button
        className="md:float-right"
        onClick={() => {
          resetFields();
        }}
      >
        <ArrowPathIcon className="h-8 w-8 text-red-500 hover:bg-red-500 hover:text-white rounded-3xl p-1 border-red-500 border-2" />
      </button>
      <form className="pb-3">
        <div className="lg:grid grid-cols-3 w-7/12 px-5 py-2">
          <div className="cols-span-1 px-1 py-1">
            <label for="product-name" className="font-medium">
              Product Name
            </label>
          </div>
          <div className="cols-span-1 px-1 py-1">
            <input
              type="text"
              name="product-name"
              className="px-3 border border-orange-300 rounded-md sm:w-72"
              placeholder="e.g. 50 in 1 Instant Coffee"
              required
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </div>
          <div className="cols-span-1 px-1 py-1" />
        </div>

        <div className="lg:grid grid-cols-3 w-7/12 px-5 py-2">
          <div className="cols-span-1 px-1 py-1">
            <label for="product-variants" className="font-medium">
              Variants{" "}
              <span className="text-sm italic text-orange-500">
                (separated by comma)
              </span>
            </label>
          </div>
          <div className="cols-span-1 px-1 py-1">
            <input
              type="text"
              name="product-variants"
              className="px-3 border border-orange-300 rounded-md w-full"
              placeholder="e.g. small, medium, large"
              value={tempVariants}
              required
              onChange={(e) => {
                setTempVariants(e.target.value);
              }}
            />
          </div>
          <div className="cols-span-1 px-1 py-1">
            <button
              className="border bg-orange-100 border-orange-500 hover:bg-orange-500 hover:text-white w-28 text-orange-500 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                if (tempVariants) {
                  if (tempVariantsList.length > 2) {
                    alert("Maximum variants count reached!");
                  } else {
                    const temps = [...tempVariantsList];
                    setTempVariantsList([...temps, tempVariants.split(",")]);
                    setTempVariants("");
                  }
                }
              }}
            >
              Add Variants
            </button>
          </div>
        </div>

        {tempVariantsList && (
          <div className="my-3 mx-10 p-4 text-sm border border-gray-300 shadow-md rounded-md">
            <span className="text-orange-500 italic font-medium">
              Variants added :
            </span>
            {tempVariantsList.length > 0 ? (
              tempVariantsList.map((varlist) => {
                return (
                  <span className="bg-orange-200 px-2 py-1 mx-1 my-3 font-medium">
                    {varlist.join(", ")}
                  </span>
                );
              })
            ) : (
              <span className="px-2 py-1 mx-1 my-3 font-medium italic text-red-600">
                ( List is empty. )
              </span>
            )}
          </div>
        )}
      </form>

      <button
        className="mx-5 my-3 px-2 py-1  rounded-sm text-white bg-orange-500 hover:bg-orange-600"
        onClick={(e) => {
          generateDetails();
          e.preventDefault();
        }}
      >
        Generate
      </button>

      <div className="p-2">
        <div className="py-3 italic font-medium text-orange-500 border-t border-orange-500">
          Tip : Tick the box once done for easy tracking. Also clicking the text
          generated will auto copy its content to clipboard.
        </div>
        {allProductVariants.length > 0 ? (
          <div className="text-green-600 font-medium py-2">
            <span className="font-bold text-lg">
              {allProductVariants.length}
            </span>{" "}
            records generated !
          </div>
        ) : (
          <div className="text-red-600 font-medium py-2">No records yet.</div>
        )}
        {finalSKU &&
          finalSKU.map((sku) => {
            return (
              <div
                key={sku[0]}
                className={
                  (checked.includes("check-" + sku[0])
                    ? "bg-green-200 text-green-600"
                    : "") + " px-4 border-t border-orange-300 font-medium py-2"
                }
              >
                <input
                  type="checkbox"
                  className={
                    "check-" +
                    sku[0] +
                    " float-left w-5 h-5 mr-5 appearance-none checked:bg-orange-500 border border-orange-500 rounded-md"
                  }
                  onChange={(e) => {
                    setCheckbox(e, sku[0]);
                  }}
                />{" "}
                <button
                  className={
                    (copyTextCode.includes(sku[0] + "-" + sku[1])
                      ? "bg-green-200 text-green-600 "
                      : "") +
                    "border border-gray-400 px-2 rounded-md hover:bg-orange-200"
                  }
                  onClick={() => copyToClipboard(sku[0], sku[1])}
                >
                  {sku[1]}{" "}
                  <span
                    className={
                      (copyTextCode.includes(sku[0] + "-" + sku[1])
                        ? ""
                        : "hidden ") + "text-green-500 font-bold"
                    }
                  >
                    &#10003;
                  </span>
                </button>
                <span className="px-2" />
                <button
                  className={
                    (copyTextCode.includes(sku[0] + "-" + sku[2])
                      ? "bg-green-200 text-green-600 "
                      : "") +
                    "border border-gray-400 px-2 rounded-md hover:bg-orange-200"
                  }
                  onClick={() => copyToClipboard(sku[0], sku[2])}
                >
                  {sku[2]}{" "}
                  <span
                    className={
                      (copyTextCode.includes(sku[0] + "-" + sku[2])
                        ? ""
                        : "hidden ") + "text-green-500 font-bold"
                    }
                  >
                    &#10003;
                  </span>
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
