"use client"
import * as React from 'react';
import {useRouter} from 'next/navigation';
import { paths } from '@/paths';


export default function Page(): React.JSX.Element {
  const router = useRouter();
  router.push(paths.home)
  return (      
        <></>
  );
}
