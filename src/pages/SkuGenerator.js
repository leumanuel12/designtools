import { useEffect, useState } from "react";

export default function SkuGenerator() {
  const [productName, setProductName] = useState();
  const [tempSkuNumber, setTempSkuNumber] = useState();
  const [finalSKU, setFinalSKU] = useState();
  const [tempVariants, setTempVariants] = useState();
  const [finalProductName, setFinalProductName] = useState();

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

  useEffect(() => {
    let listSKU = [];
    let finalProducts = [];
    const variantList = tempVariants && tempVariants.split(",");

    /*
    if (productName && tempVariants) {
      for (let y = 1; y <= variantList.length; y++) {
        if (variantList[y] != undefined) {
          finalProducts.push(productName + " " + variantList[y]);
        }
      }
    }
    setFinalProductName(finalProducts);
    if (finalProductName) console.log(finalProductName);
    */

    if (tempSkuNumber && productName && tempVariants) {
      for (let x = 0; x < tempSkuNumber; x++) {
        //set final SKU code
        listSKU[x] = generateSkuInitials() + paddedSkuNumber(x) + x;
      }

      setFinalSKU(listSKU);

      //if (tempVariants) console.log(tempVariants.split(","));
    }
  }, [productName, tempSkuNumber, tempVariants]);

  return (
    <>
      <form className="pb-3">
        <div className="my-2">
          <label for="product-name" className="w-80">
            Product Name
          </label>
          <input
            type="text"
            name="product-name"
            className="mx-2 px-3 border border-orange-300 rounded-md"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
        </div>
        <div className="my-2">
          <label for="product-count" className="w-80">
            # of Products
          </label>
          <input
            type="text"
            name="product-count"
            maxlength="4"
            className="mx-2 px-3 border border-orange-300 rounded-md"
            onChange={(e) => setTempSkuNumber(e.target.value)}
          />
        </div>
        <div className="my-2">
          <label for="product-variants" className="w-80">
            Variants{" "}
            <span className="text-sm italic">(separated by comma)</span>
          </label>
          <input
            type="text"
            name="product-variants"
            className="mx-2 px-3 border border-orange-300 rounded-md"
            placeholder="e.g. sm, md, lg"
            onChange={(e) => {
              setTempVariants(e.target.value);
            }}
          />
        </div>
      </form>

      <div className="p-3 max-w-2xl">
        {finalSKU &&
          finalSKU.map((sku) => {
            return (
              <div className="border-t border-orange-300 font-medium py-1">
                {sku} <br />
              </div>
            );
          })}
      </div>
    </>
  );
}
