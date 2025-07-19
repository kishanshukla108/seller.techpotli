import HeadBarcodedPacking from '@/components/dashboard/barcodedPacking/headBarcodedPacking'
import React from 'react'
import { config } from '@/config'
  export const metadata = { title: `Bulk Upload | Dashboard | ${config.site.name}` };
   


function page(): React.JSX.Element {
  return (
    <div>
      <HeadBarcodedPacking />
      {/* Additional content for the Barcoded Packaging page can go here */}
    </div>
  )
}

export default page