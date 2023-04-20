import { useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

export default function SkuGenerator() {
  const [productName, setProductName] = useState();
  const [tempSkuNumber, setTempSkuNumber] = useState();
  const [finalSKU, setFinalSKU] = useState();
  const [tempVariants, setTempVariants] = useState();
  const [finalProductName, setFinalProductName] = useState();
  const [checked, setChecked] = useState([]);
  const [reset, setReset] = useState(false);

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

  function generateDetails() {
    let listSKU = [];
    let finalProducts = [];

    if (tempSkuNumber && productName && tempVariants) {
      for (let x = 1; x <= tempSkuNumber; x++) {
        //set final SKU code
        listSKU.push([
          String(x),
          generateSkuInitials() + paddedSkuNumber(x) + x,
        ]);
      }
    }
    setFinalSKU(listSKU);
  }

  //RESET BUTTON
  function resetFields() {
    setReset(true);
    setProductName("");
    setTempSkuNumber("");
    setFinalSKU([]);
    setTempVariants("");
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
      <form
        className="pb-3"
        onSubmit={(e) => {
          e.preventDefault();
          generateDetails();
        }}
      >
        <div className="my-2 md:grid grid-cols-2 w-6/12 px-5">
          <div className="cols-span-1">
            <label for="product-name" className="font-medium">
              Product Name
            </label>
          </div>
          <div className="cols-span-1">
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
        </div>

        <div className="my-2 md:grid grid-cols-2 w-6/12 px-5">
          <div className="cols-span-1">
            <label for="product-count" className="font-medium">
              Total # of Products{" "}
              <span className="text-sm italic text-orange-500">
                (products X variants)
              </span>
            </label>
          </div>
          <div className="cols-span-1">
            <input
              type="number"
              name="product-count"
              size="4"
              maxlength="3"
              required
              value={tempSkuNumber}
              className="px-3 border border-orange-300 rounded-md"
              onChange={(e) => setTempSkuNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="my-2 md:grid grid-cols-2 w-6/12 px-5">
          <label for="product-variants" className="font-medium">
            Variants{" "}
            <span className="text-sm italic text-orange-500">
              (separated by comma)
            </span>
          </label>
          <input
            type="text"
            name="product-variants"
            className="px-3 border border-orange-300 rounded-md"
            placeholder="e.g. small, medium, large"
            value={tempVariants}
            required
            onChange={(e) => {
              setTempVariants(e.target.value);
            }}
          />
        </div>

        <input
          type="submit"
          value="Generate"
          className="mx-5 my-3 px-2 py-1  rounded-sm text-white bg-orange-500 hover:bg-orange-600"
        />
      </form>

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
              </div>
            );
          })}
      </div>
    </>
  );
}
