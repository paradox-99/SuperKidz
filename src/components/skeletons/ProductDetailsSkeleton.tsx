const ProductDetailsSkeleton = () => {
      return (
            <section className="space-y-8 py-6 md:py-10">
                  <div className="flex flex-wrap items-center gap-3">
                        <div className="skeleton h-10 w-36 rounded-full" />
                        <div className="skeleton h-10 w-32 rounded-full" />
                  </div>

                  <div className="grid gap-8 lg:grid-cols-2">
                        <div className="space-y-4">
                              <div className="card overflow-hidden border border-base-200 bg-base-100 shadow-lg">
                                    <div className="skeleton h-96 w-full rounded-none" />
                              </div>

                              <div className="grid gap-4 sm:grid-cols-3">
                                    <div className="rounded-3xl border border-base-200 bg-base-100 p-5 shadow-sm">
                                          <div className="skeleton h-4 w-16" />
                                          <div className="skeleton mt-3 h-8 w-20" />
                                    </div>
                                    <div className="rounded-3xl border border-base-200 bg-base-100 p-5 shadow-sm">
                                          <div className="skeleton h-4 w-16" />
                                          <div className="skeleton mt-3 h-8 w-20" />
                                    </div>
                                    <div className="rounded-3xl border border-base-200 bg-base-100 p-5 shadow-sm">
                                          <div className="skeleton h-4 w-16" />
                                          <div className="skeleton mt-3 h-8 w-20" />
                                    </div>
                              </div>
                        </div>

                        <div className="space-y-6">
                              <div className="space-y-4 rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg md:p-8">
                                    <div className="flex gap-3">
                                          <div className="skeleton h-9 w-32 rounded-full" />
                                          <div className="skeleton h-9 w-24 rounded-full" />
                                    </div>

                                    <div className="space-y-3">
                                          <div className="skeleton h-10 w-3/4" />
                                          <div className="skeleton h-6 w-1/2" />
                                    </div>

                                    <div className="skeleton h-20 w-full rounded-3xl" />

                                    <div className="grid gap-4 sm:grid-cols-2">
                                          <div className="skeleton h-14 w-full rounded-2xl" />
                                          <div className="skeleton h-14 w-full rounded-2xl" />
                                    </div>

                                    <div className="space-y-3">
                                          <div className="skeleton h-6 w-36" />
                                          <div className="space-y-3">
                                                <div className="skeleton h-4 w-full" />
                                                <div className="skeleton h-4 w-11/12" />
                                                <div className="skeleton h-4 w-10/12" />
                                          </div>
                                    </div>
                              </div>

                              <div className="rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg md:p-8">
                                    <div className="skeleton mb-4 h-8 w-40" />
                                    <div className="grid gap-3 sm:grid-cols-2">
                                          {[...Array(4)].map((_, index) => (
                                                <div key={index} className="rounded-2xl bg-base-200/70 p-4">
                                                      <div className="skeleton h-4 w-3/4" />
                                                      <div className="skeleton mt-3 h-4 w-full" />
                                                </div>
                                          ))}
                                    </div>
                              </div>

                              <div className="rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg md:p-8">
                                    <div className="skeleton mb-4 h-8 w-56" />
                                    <div className="space-y-4">
                                          {[...Array(2)].map((_, index) => (
                                                <div key={index} className="rounded-2xl bg-base-200/70 p-5">
                                                      <div className="skeleton h-5 w-11/12" />
                                                      <div className="skeleton mt-3 h-4 w-full" />
                                                      <div className="skeleton mt-2 h-4 w-10/12" />
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default ProductDetailsSkeleton;