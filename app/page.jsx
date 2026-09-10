"use client";

import React from 'react';
import { useWindowSize } from './useWindowSize';
import {DesktopView} from './desktop.jsx';
import {MobileView} from './mobile.jsx';


export default function MyPage() {
  const { width } = useWindowSize();
  const isMobile = width < 768; // Define your breakpoint



  return isMobile ? (
    <MobileView />
  ) : (
    <DesktopView/>
  );
}