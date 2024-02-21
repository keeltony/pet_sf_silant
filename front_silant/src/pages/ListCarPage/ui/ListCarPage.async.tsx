import {FC, lazy,Suspense} from "react";

export const ListCarPageAsync = lazy<FC>(() => import('./ListCarPage'));

export const DetailsListCarPage = () => (
  <Suspense>
    <ListCarPageAsync />
  </Suspense>
)