import React from 'react'
import { config } from '@/config';
import HeadCatalogUploads from '@/components/dashboard/catalogUploads/headCatalogUploads';
export const metadata = { title: `catalog-uploads | Dashboard | ${config.site.name}` };
function page(): React.JSX.Element {
  return (
    <div>
    <HeadCatalogUploads/> 
    </div>
  )
}

export default page