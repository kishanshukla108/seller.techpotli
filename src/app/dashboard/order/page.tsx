import * as React from 'react';
import Head from '@/components/dashboard/order/head';
import TabsFilter from '@/components/dashboard/order/tabsFilter';
import { config } from '@/config';

export const metadata = { title: `Orders | Dashboard | ${config.site.name}` };



export default function Page(): React.JSX.Element {

  return (
    <div>
      <Head/>
      <TabsFilter/>
     
    </div>
  );
}
