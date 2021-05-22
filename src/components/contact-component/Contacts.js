import React, { useState, useEffect, useContext } from "react";
import ContactForm from "./ContactForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from "@material-ui/core";
import useTable from "../../hooks/useTable";

import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import Controls from "../../components/controls/Controls";
import Popup from "../../components/Popup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

import axios from "../../config/axios";
import { RocketContext } from "../../context/rocket";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
}));

const headCells = [
  { id: "nickName", label: "Nick\u00a0Name" },
  { id: "firstName", label: "First\u00a0Name" },
  { id: "middleName", label: "Middle\u00a0Name" },
  { id: "lastName", label: "Last\u00a0Name" },
  { id: "address", label: "Address" },
  { id: "cellPhone", label: "Cell\u00a0Phone" },
  { id: "phone", label: "Phone" },
  { id: "fax", label: "Fax" },
  { id: "email", label: "Email" },
  { id: 'actions', label: 'Actions', disableSorting: true }
];

export const Contacts = ({filter}) => {
  const PATH = "/api/contact";
  const classes = useStyles();

  const [auth] = useContext(RocketContext);
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({ fn: (items) => { return items; } });

  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "", });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "",});
  const [recordForEdit, setRecordForEdit] = useState(null);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, headCells, filterFn);

  const getContacts = async () => {
    try {
      const response = await axios.get(PATH + "/" + filter + "/" + 65536 + "/" + 0, { headers: { Authorization: `Bearer ${auth.token}` } });
      if (response.data && response.data.success) {
        setRecords(response.data.data.docs);
      }
    } catch (err) {
      setNotify({ isOpen: true, message: "Something went wrong!", type: "error" });
    }
  };

  const postContact = async (row) => {
    var validate = validateForm()
    if (validate){
      try{
        const response = await axios.post(PATH, row, { headers: { Authorization: `Bearer ${auth.token}` } })
        setRecords(records.concat(response.data.data))        
        setNotify({ isOpen: true, message: "Contact has been saved!", type: "success" });
      }catch(err){
        setNotify({ isOpen: true, message: "Something went wrong!", type: "error" });
      }
    }    
  }

  const putContact = async (row) => {
    var validate = validateForm()
    if (validate){
      try{
        await axios.put(PATH, row, { headers: { Authorization: `Bearer ${auth.token}` } });
        getContacts();
        setNotify({ isOpen: true, message: "Contact has been updated!", type: "success" });
      }catch(err){
        setNotify({ isOpen: true, message: "Something went wrong!", type: "error" });
      }
    }
  }

  const deleteContact = async (id) => {
    try{
      await axios.delete(PATH +"/"+ id, { headers: { Authorization: `Bearer ${auth.token}` } })
      getContacts();
    }catch(err){
      setNotify({ isOpen: true, message: "Something went wrong!", type: "error" });
    }
  }

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") 
          return items;
        else
          return items.filter((x) => (x.nickName + x.firstName + x.middleName + x.lastName).toLowerCase().includes(target.value));
      },
    });
  };

  const addOrEdit = (row, resetForm) => {
    if (row.id === '')
      postContact(row);
    else 
      putContact(row);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    getContacts();
    setNotify({ isOpen: true, message: "Submitted Successfully", type: "success" });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    debugger
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    deleteContact(id);
    getContacts();
    setNotify({ isOpen: true, message: "Deleted Successfully", type: "success" });
  };

  useEffect(() => {
    getContacts();
    return () => {};
  }, []);

  const validateForm = () => {
    return true;
  }

  return (
    <>
      <PageHeader title="Contacts" subTitle={"Contacts with " + filter} icon={<PeopleOutlineTwoToneIcon fontSize="large" />}/>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input label="Search Contact" className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {" "}
                  <Search />{" "}
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button text="Add New" variant="outlined" startIcon={<AddIcon />} className={classes.newButton} onClick={() => { setOpenPopup(true); setRecordForEdit(null) }} />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nickName}</TableCell>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.middleName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.cellPhone}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.fax}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <Controls.ActionButton color="primary" onClick={() => { openInPopup(item) }} >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton color="secondary" 
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this record?",
                        subTitle: "You can't undo this operation",
                        onConfirm: () => { onDelete(item.id); },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup title="Contact Form" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <ContactForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} filter={filter} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  );
}
