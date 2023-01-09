import { Skeleton, Stack } from "@mui/material";
import React from "react";

import classSkeleton from "./classSkeleton.module.css";

function ClassesSkeleton() {
  return (
    <div className={classSkeleton.classSkeleton}>
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={100} />

        <Skeleton variant="rounded" height={100} />

        <Skeleton className={classSkeleton.button} variant="rounded" height={40} width={150} />
      </Stack>

      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={100} />

        <Skeleton variant="rounded" height={100} />

        <Skeleton className={classSkeleton.button} variant="rounded" height={40} width={150} />
      </Stack>

      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={100} />

        <Skeleton variant="rounded" height={100} />

        <Skeleton className={classSkeleton.button} variant="rounded" height={40} width={150} />
      </Stack>

      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={100} />

        <Skeleton variant="rounded" height={100} />

        <Skeleton className={classSkeleton.button} variant="rounded" height={40} width={150} />
      </Stack>
    </div>
  );
}

export default ClassesSkeleton;
