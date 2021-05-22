import React from 'react'
import { ResponsiveDrawer } from "../../components";
import MenuContainer from '../../components/menu-container/MenuContainer';
import { Contacts }  from '../../components/contact-component/Contacts';

export const  ContactAccountPage = (props) => {
  return (
    <ResponsiveDrawer>
      <MenuContainer item="1" />
      <Contacts filter="ACCOUNT"  />
    </ResponsiveDrawer>
  )
}
