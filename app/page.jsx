"use client";

import React from 'react';
import { useWindowSize } from './useWindowSize';
import {DesktopView} from './desktop.jsx';
import {SmallView} from './smalldesktop.jsx';
import {MobileView} from './mobile.jsx';


export default function MyPage() {
  const { width } = useWindowSize();
  const isMobile = width < 768; // Define your breakpoint
  const isSmall = width < 1268;



  return isMobile ? (
    <MobileView />
  ) : (isSmall ? (<SmallView/>) :
    (<DesktopView/>
  ));
}