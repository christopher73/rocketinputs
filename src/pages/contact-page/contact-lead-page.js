import React from 'react'
import { ResponsiveDrawer } from "../../components";
import MenuContainer from '../../components/menu-container/MenuContainer';
import { Contacts }  from '../../components/contact-component/Contacts';

export const  ContactLeadPage = (props) => {
  return (
    <ResponsiveDrawer>
      <MenuContainer item="2"/>
      <Contacts filter="POTENTIAL"  />
    </ResponsiveDrawer>
  )
}
