import { Skeleton, Stack } from "@mui/material";
import React from "react";

import addClassSkeleton from "./addClassSkeleton.module.css";

function AddClassSkeleton() {
  return (
    <div className={addClassSkeleton.addClassSkeleton}>
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={100} />

        <Skeleton variant="rounded" height={60} />
      </Stack>

      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={100} />

        <Skeleton variant="rounded" height={60} />
      </Stack>

      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={100} />

        <Skeleton variant="rounded" height={60} />
      </Stack>

      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={100} />

        <Skeleton variant="rounded" height={60} />
      </Stack>
    </div>
  );
}

export default AddClassSkeleton;
