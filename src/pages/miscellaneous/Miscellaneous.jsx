import React, { useState } from "react";

import "./Miscellaneous.css";

import "../../components/common/Table.css";
import "../../components/common/Search.css";
import "../../components/common/CommonForm.css";

import IdentityTable from "./IdentityTable";
import RelationTable from "./RelationTable";
import PurposeTable from "./PurposeTable";
import ReasonTable from "./ReasonTable";

import IdentityForm from "./IdentityForm";
import RelationForm from "./RelationForm";
import PurposeForm from "./PurposeForm";
import ReasonForm from "./ReasonForm";

const Miscellaneous = () => {

  const [showIdentityForm, setShowIdentityForm] =
    useState(false);

  const [showRelationForm, setShowRelationForm] =
    useState(false);

  const [showPurposeForm, setShowPurposeForm] =
    useState(false);

  const [showReasonForm, setShowReasonForm] =
    useState(false);

  const [editingIdentity, setEditingIdentity] =
    useState(null);

  const [editingRelation, setEditingRelation] =
    useState(null);

  const [editingPurpose, setEditingPurpose] =
    useState(null);

  const [editingReason, setEditingReason] =
    useState(null);

  /* ================= Identity ================= */

  const [identityList, setIdentityList] =
    useState([

      {
        id:1,
        identity:"VOTER'S ID",
        status:"ACTIVE",
      },

      {
        id:2,
        identity:"PAN CARD",
        status:"ACTIVE",
      },

      {
        id:3,
        identity:"AADHAAR",
        status:"ACTIVE",
      },

      {
        id:4,
        identity:"LAND PAPER",
        status:"ACTIVE",
      },

      {
        id:5,
        identity:"OTHERS",
        status:"ACTIVE",
      },

    ]);

  /* ================= Relation ================= */

  const [relationList, setRelationList] =
    useState([

      {
        id:1,
        relation:"GRAND SON",
        remark:"",
        status:"ACTIVE",
      },

      {
        id:2,
        relation:"COUSIN SISTER",
        remark:"",
        status:"ACTIVE",
      },

      {
        id:3,
        relation:"COUSIN BROTHER",
        remark:"",
        status:"ACTIVE",
      },

      {
        id:4,
        relation:"BROTHER IN LAW",
        remark:"",
        status:"ACTIVE",
      },

      {
        id:5,
        relation:"SISTER IN LAW",
        remark:"",
        status:"ACTIVE",
      },

    ]);

  /* ================= Purpose ================= */

  const [purposeList, setPurposeList] =
    useState([

      {
        id:1,
        purpose:"MOBILE PHONE",
        status:"ACTIVE",
      },

      {
        id:2,
        purpose:"OTHER",
        status:"ACTIVE",
      },

      {
        id:3,
        purpose:"E RIKSHA",
        status:"ACTIVE",
      },

      {
        id:4,
        purpose:"FARMING",
        status:"ACTIVE",
      },

      {
        id:5,
        purpose:"AGRICULTURE",
        status:"ACTIVE",
      },

    ]);

  /* ================= Reason ================= */

  const [reasonList, setReasonList] =
    useState([

      {
        id:1,
        reason:"PHOTO",
        status:"ACTIVE",
      },

      {
        id:2,
        reason:"PAN CARD",
        status:"ACTIVE",
      },

      {
        id:3,
        reason:"AADHAR CARD",
        status:"ACTIVE",
      },

      {
        id:4,
        reason:"MOBILE NUMBER",
        status:"ACTIVE",
      },

      {
        id:5,
        reason:"EMAIL ID",
        status:"ACTIVE",
      },

    ]);

  /* ================= Identity Save ================= */

  const saveIdentity = (formData)=>{

    if(editingIdentity){

      setIdentityList(prev=>

        prev.map(item=>

          item.id===editingIdentity.id

          ? {...item,...formData}

          : item

        )

      );

    }else{

      setIdentityList(prev=>[

        ...prev,

        {

          id:Date.now(),

          ...formData,

        }

      ]);

    }

    setEditingIdentity(null);

    setShowIdentityForm(false);

  };

  /* ================= Relation Save ================= */

  const saveRelation=(formData)=>{

    if(editingRelation){

      setRelationList(prev=>

        prev.map(item=>

          item.id===editingRelation.id

          ? {...item,...formData}

          : item

        )

      );

    }else{

      setRelationList(prev=>[

        ...prev,

        {

          id:Date.now(),

          ...formData,

        }

      ]);

    }

    setEditingRelation(null);

    setShowRelationForm(false);

  };

  /* ================= Purpose Save ================= */

  const savePurpose=(formData)=>{

    if(editingPurpose){

      setPurposeList(prev=>

        prev.map(item=>

          item.id===editingPurpose.id

          ? {...item,...formData}

          : item

        )

      );

    }else{

      setPurposeList(prev=>[

        ...prev,

        {

          id:Date.now(),

          ...formData,

        }

      ]);

    }

    setEditingPurpose(null);

    setShowPurposeForm(false);

  };

  /* ================= Reason Save ================= */

  const saveReason=(formData)=>{

    if(editingReason){

      setReasonList(prev=>

        prev.map(item=>

          item.id===editingReason.id

          ? {...item,...formData}

          : item

        )

      );

    }else{

      setReasonList(prev=>[

        ...prev,

        {

          id:Date.now(),

          ...formData,

        }

      ]);

    }

    setEditingReason(null);

    setShowReasonForm(false);

  };

  return(

    <div className="misc-page">

      <div className="misc-header">

         <div>
        <h2>Miscellaneous Master</h2>
        <p>Manage Miscellaneous Master</p>
          

        </div>

      </div>

      <div className="misc-grid">

        <IdentityTable
          data={identityList}
          onAdd={()=>{

            setEditingIdentity(null);

            setShowIdentityForm(true);

          }}
          onEdit={(row)=>{

            setEditingIdentity(row);

            setShowIdentityForm(true);

          }}
        />

        <RelationTable
          data={relationList}
          onAdd={()=>{

            setEditingRelation(null);

            setShowRelationForm(true);

          }}
          onEdit={(row)=>{

            setEditingRelation(row);

            setShowRelationForm(true);

          }}
        />

        <PurposeTable
          data={purposeList}
          onAdd={()=>{

            setEditingPurpose(null);

            setShowPurposeForm(true);

          }}
          onEdit={(row)=>{

            setEditingPurpose(row);

            setShowPurposeForm(true);

          }}
        />

        <ReasonTable
          data={reasonList}
          onAdd={()=>{

            setEditingReason(null);

            setShowReasonForm(true);

          }}
          onEdit={(row)=>{

            setEditingReason(row);

            setShowReasonForm(true);

          }}
        />

      </div>

      {showIdentityForm &&

        <IdentityForm

          data={editingIdentity}

          onSave={saveIdentity}

          onClose={()=>{

            setEditingIdentity(null);

            setShowIdentityForm(false);

          }}

        />

      }

      {showRelationForm &&

        <RelationForm

          data={editingRelation}

          onSave={saveRelation}

          onClose={()=>{

            setEditingRelation(null);

            setShowRelationForm(false);

          }}

        />

      }

      {showPurposeForm &&

        <PurposeForm

          data={editingPurpose}

          onSave={savePurpose}

          onClose={()=>{

            setEditingPurpose(null);

            setShowPurposeForm(false);

          }}

        />

      }

      {showReasonForm &&

        <ReasonForm

          data={editingReason}

          onSave={saveReason}

          onClose={()=>{

            setEditingReason(null);

            setShowReasonForm(false);

          }}

        />

      }

    </div>

  );

};

export default Miscellaneous;