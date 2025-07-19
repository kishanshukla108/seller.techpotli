import HeadClaims from '@/components/dashboard/claims/headClaims'
import React from 'react'
import { config } from '@/config';
export const metadata = { title: `Claims | Dashboard | ${config.site.name}` };
function page(): React.JSX.Element {
  return (
    <>
    <HeadClaims />
    
    </>
  )
}

export default page