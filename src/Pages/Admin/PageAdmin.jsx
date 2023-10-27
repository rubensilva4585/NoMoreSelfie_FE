import { useEffect, useState } from "react";
import PageAdminSuppliersList from "./PageAdminSuppliersList";
import { getSuppliersList, validateSupplier } from "../../API/Admin";
import { set } from "date-fns";

export default function PageAdmin() {
  const [supliersData, setSupliersData] = useState(null);

  const handelValidateSupplier = (id) => {
    const userIndex = supliersData.findIndex((user) => user.id === id);
    const updatedUsers = [...supliersData];

    validateSupplier(
      {
        verified: !updatedUsers[userIndex].verified,
      },
      id
    )
      .then((response) => {
        if (userIndex !== -1) {
          const updatedUsers = [...supliersData];
          updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            verified: response,
          };
          setSupliersData(updatedUsers);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSuppliersList()
      .then((response) => {
        console.log(response);
        setSupliersData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <section class="bg-black h-14 flex justify-center items-center border-b border-orange-400">
        <h1 className="text-4xl text-leading text-orange-400 font-semibold">
          Administração
        </h1>
      </section>

      <PageAdminSuppliersList
        supliersData={supliersData}
        handelValidateSupplier={handelValidateSupplier}
      />
    </>
  );
}
