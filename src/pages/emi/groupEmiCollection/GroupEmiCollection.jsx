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

    {
      id: 3,
      memberCode: "ANANDNAGAR20113",
      memberName: "DEEPIKA",
      alias: "AYUSH",
      mobile: "9548862006",
      loanApplication: "99051ANAND",
      emiDate: "27-02-2026",
      emiNumber: 25,
      advance: 0,
      currentDue: 31250,
      emi: 1250,
      branch: "JAGATPURA",
      group: "SITA HOUSE",
    },

    {
      id: 4,
      memberCode: "BRIBCD16",
      memberName: "AMIT KUMAR",
      alias: "KUMAR",
      mobile: "9632587412",
      loanApplication: "500000005BR1",
      emiDate: "21-08-2026",
      emiNumber: 395,
      advance: 0,
      currentDue: 700,
      emi: 100,
      branch: "SHREEJA GROUP",
      group: "SITA HOUSE",
    },

    {
      id: 5,
      memberCode: "MEM010105",
      memberName: "RAJESH TIK",
      alias: "RAJESH TIK",
      mobile: "9878643469",
      loanApplication: "106",
      emiDate: "11-08-2026",
      emiNumber: 2,
      advance: 0,
      currentDue: 6000,
      emi: 3000,
      branch: "SHREEJA GROUP",
      group: "MAA GROUP",
    },

    {
      id: 6,
      memberCode: "BRIM5",
      memberName: "AKSHAY GARG",
      alias: "AKSHAY",
      mobile: "8630140277",
      loanApplication: "4561457BR1",
      emiDate: "15-08-2026",
      emiNumber: 29,
      advance: 0,
      currentDue: 433,
      emi: 433,
      branch: "KOLKATA",
      group: "MAA GROUP",
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