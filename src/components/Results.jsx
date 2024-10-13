import React from "react";
import MedicationCard from "../features/profile/medication/component/MedicationCard";
import ProductCard from "../features/store/components/ProductCard";

const Results = ({ results }) => {
  return results.map(
    ({ name, description, id, medications, remedy, symptoms, products }) => {
      return (
        //Results and Remedies are in the same grid because there content has no mapping
        <div key={id}>
          {/**Results and Remedies divs are in one grid item */}
          <div>
            <h1>Results</h1>

            <div>
              {/**ILLNESS BOX  */}
              <div>
                <h1>ILLNESS</h1>
                <h5>{name.toUpperCase()}</h5>
                <p>{description}</p>
              </div>
              {/**REMEDIES BOX  */}
              <div>
                <h1>REMEDIES</h1>
                <p>{remedy}</p>
              </div>
            </div>
          </div>

          {/* Medications div is in one grid item */}
          {/** if medications is empty do not render the medications elements/components */}
          {medications.length > 0 && (
            <div item>
              <div>
                <h1>Medications for Illness</h1>
                <div>
                  {medications.map((medication) => (
                    <div key={medication.id}>
                      <MedicationCard medication={medication} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products div is in one grid item */}
          {/** if products is empty do not render the products elements/components */}
          {products.length > 0 && (
            <div>
              <h1>Products</h1>
              <div>
                {products.map((product, i) => {
                  {
                    /** we just want to display 2 products so the index is being used to limit the products display to the first 2 products in the array */
                  }
                  return (
                    i < 2 && (
                      <div key={product.id}>
                        <ProductCard product={product} />
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    }
  );
};

export default Results;
