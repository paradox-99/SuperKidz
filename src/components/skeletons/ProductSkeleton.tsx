import React from 'react';

const ProductSkeleton = () => {
      return (
            <article className="card overflow-hidden border border-base-200 bg-base-100 shadow-lg">
                  <div className="skeleton h-60 w-full rounded-none" />
                  <div className="card-body gap-4 p-5">
                        <div className="space-y-3">
                              <div className="skeleton h-6 w-3/4" />
                              <div className="flex items-center gap-3">
                                    <div className="skeleton h-4 w-20" />
                                    <div className="skeleton h-4 w-16" />
                              </div>
                        </div>

                        <div className="flex items-end justify-between gap-4 border-t border-base-200 pt-4">
                              <div className="space-y-3">
                                    <div className="skeleton h-3 w-14" />
                                    <div className="skeleton h-8 w-24" />
                              </div>
                              <div className="skeleton h-16 w-24 rounded-2xl" />
                        </div>
                        <div className="skeleton h-10 w-full rounded-2xl"></div>
                  </div>
            </article>
      );
};

export default ProductSkeleton;