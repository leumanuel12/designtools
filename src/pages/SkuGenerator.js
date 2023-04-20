import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

export default function SkuGenerator() {
  const [productName, setProductName] = useState();
  const [finalSKU, setFinalSKU] = useState();
  const [tempVariants, setTempVariants] = useState();
  const [tempVariantsList, setTempVariantsList] = useState([]);
  const [checked, setChecked] = useState([]);

  //zero pad the current number
  function paddedSkuNumber(currentNum) {
    const skuLength = 4 - String(currentNum).length;
    let padString = "";

    //console.log("size: ", skuLength);

    for (let x = 1; x <= skuLength; x++) {
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
          return items != "check-" + item;
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

  //Add Variants
  function addVariants() {
    return true;
  }

  //Generate SKU Details
  function generateDetails() {
    let listSKU = [];

    if (productName && tempVariants) {
      let variants = tempVariants.split(",");

      //set final SKU details

      for (let x = 0; x <= variants.length; x++) {
        if (variants[x]) {
          listSKU.push([
            String(x),
            generateSkuInitials() + paddedSkuNumber(x) + (x + 1),
            productName + " " + variants[x],
          ]);
        }
      }
    }
    setFinalSKU(listSKU);
  }

  if (finalSKU) console.log(finalSKU);

  //RESET BUTTON
  function resetFields() {
    setProductName("");
    setFinalSKU([]);
    setTempVariants("");
    setTempVariantsList([]);
  }

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
                  const temps = [...tempVariantsList];
                  setTempVariantsList([...temps, tempVariants.split(",")]);
                  setTempVariants("");
                }
              }}
            >
              Add Variants
            </button>
          </div>
        </div>

        {tempVariantsList ? (
          <div className="my-3 mx-10 p-4 text-sm border border-gray-300 shadow-md rounded-md">
            <span className="text-orange-500 italic font-medium">
              Variants added :
            </span>
            {tempVariantsList.map((varlist) => {
              return (
                <span className="bg-orange-200 px-2 py-1 mx-1 my-3 font-medium">
                  {varlist.join(", ")}
                </span>
              );
            })}
          </div>
        ) : (
          <span>List is empty</span>
        )}
      </form>

      <button
        className="mx-5 my-3 px-2 py-1  rounded-sm text-white bg-orange-500 hover:bg-orange-600"
        onClick={(e) => {
          e.preventDefault();
          generateDetails();
        }}
      >
        Generate
      </button>

      <div className="p-2">
        <div className="py-3 italic font-medium text-orange-500 border-t-2 border-red-500">
          Tip : Tick the box once done for easy tracking.
        </div>

        {finalSKU &&
          finalSKU.map((sku) => {
            return (
              <div
                key={sku[0]}
                className={
                  (checked.includes("check-" + sku[0])
                    ? "bg-green-200 text-green-600"
                    : "") +
                  " px-4 border-t border-orange-300 font-medium py-1 hover:bg-orange-100"
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
                {sku[1]}
                <span className="px-2" />
                {sku[2]}
              </div>
            );
          })}
      </div>
    </>
  );
}
