import React from 'react'
import { ResponsiveDrawer } from "../../components";
import MenuContainer from '../../components/menu-container/MenuContainer';
import { Contacts }  from '../../components/contact-component/Contacts';

export const  ContactNonePage = (props) => {
  return (
    <ResponsiveDrawer>
      <MenuContainer item="3"/>
      <Contacts filter="NONE"  />
    </ResponsiveDrawer>
  )
}
