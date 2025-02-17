import React, { useState } from "react";
import { SellerForm } from "./SellerForm";
import { SellerTable } from "./SellerTable";
import "../styles/sellertable.css";

export function Admin() {
  let [sellerList, setSellerList] = useState([]);

  return (
    <main className="admin  container-fluid">
      <div className="row w-100 p-3">
        <div className="col-md-4 mb-4">
          <SellerForm setSellerList={setSellerList} sellerList={sellerList} />
        </div>
        <div className="col-md-8">
          <SellerTable sellerList={sellerList} setSellerList={setSellerList} />
        </div>
          </div>
          
    </main>
  );
}
