import React, { useState } from "react";

import GroupEmiCollectionForm from "./GroupEmiCollectionForm";
import GroupEmiCollectionTable from "./GroupEmiCollectionTable";
import PaymentCollectionForm from "./PaymentCollectionForm";
import MemberCollectionTable from "./MemberCollectionTable";

import "./GroupEmiCollection.css";

const GroupEmiCollection = () => {
  const [filters, setFilters] = useState({
    date: "",
    paymentStatus: "Unpaid",
    branch: "",
    group: "",
  });

  const [selectedMember, setSelectedMember] = useState(null);

  const [memberCollections, setMemberCollections] = useState([]);

  const [members] = useState([
    {
      id: 1,
      memberCode: "AM4MEM0115541",
      memberName: "RITTIK SASMAL",
      alias: "NA",
      mobile: "9802458930",
      loanApplication: "89569853AM4",
      emiDate: "16-08-2026",
      emiNumber: 13,
      advance: 0,
      currentDue: 2250,
      emi: 2250,
      branch: "JAGATPURA",
      group: "SITA HOUSE",
    },

    {
      id: 2,
      memberCode: "ANANDNAGAR3017",
      memberName: "SANDHIR KUMAR",
      alias: "RAM KUMAR",
      mobile: "8757116191",
      loanApplication: "10201233",
      emiDate: "17-08-2026",
      emiNumber: 37,
      advance: 0,
      currentDue: 736,
      emi: 736,
      branch: "JAGATPURA",
      group: "SITA HOUSE",
    },


  ]);

  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleGetRecord = () => {
    console.log("Group EMI filters:", filters);
  };

  const handleCollectPayment = (member) => {
    setSelectedMember(member);
  };

  const handleClosePayment = () => {
    setSelectedMember(null);
  };

  const handleSavePayment = (paymentData) => {
    const newPayment = {
      id: Date.now(),

      paymentDate: paymentData.paymentDate,

      amount: paymentData.amount,

      receivedBy: "ADMIN",

      paymentMode: paymentData.ledgerAccount,

      status: "PAID",

      memberName: selectedMember.memberName,

      memberCode: selectedMember.memberCode,

      loanApplication: selectedMember.loanApplication,

      group: selectedMember.group,
    };

    setMemberCollections((previous) => [
      ...previous,
      newPayment,
    ]);

    setSelectedMember(null);
  };

  return (
    <div className="group-emi-collection-page">

      {/* PAGE HEADER */}

      <div className="group-emi-collection-header">

        <h2>GROUPEMICOLLECTION</h2>

        <div className="group-emi-collection-breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>GROUPEMICOLLECTION</strong>
        </div>

      </div>

      {/* FILTER */}

      <GroupEmiCollectionForm
        filters={filters}
        onChange={handleFilterChange}
        onGetRecord={handleGetRecord}
      />

      {/* MEMBER LIST */}

      <GroupEmiCollectionTable
        data={members}
        onCollectPayment={handleCollectPayment}
      />

      {/* MEMBER COLLECTION */}

      <MemberCollectionTable
        data={memberCollections}
      />

      {/* PAYMENT POPUP */}

      {selectedMember && (
        <PaymentCollectionForm
          member={selectedMember}
          onClose={handleClosePayment}
          onSave={handleSavePayment}
        />
      )}

    </div>
  );
};

export default GroupEmiCollection;