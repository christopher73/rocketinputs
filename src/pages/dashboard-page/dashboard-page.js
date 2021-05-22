import React from "react";
import { ResponsiveDrawer } from "../../components";
import MenuContainer from '../../components/menu-container/MenuContainer';

export const DashboardPage = () => {

  return (
    <ResponsiveDrawer>
      <MenuContainer item="0" />
    </ResponsiveDrawer>
  );
};
