import React from 'react';
import Skeleton from "react-loading-skeleton";


function ComponentSkeleton() {
    return(
    <div className="skeleton-container">
      <div className="skeleton-title">
        <Skeleton height={320} width="100%" />
      </div>
      <div className="skeleton-title">
        <Skeleton height={300} width="100%" />
      </div>
      <div className="skeleton-title">
        <Skeleton height={300} width="100%" />
      </div>
    </div>
)}

export default ComponentSkeleton;