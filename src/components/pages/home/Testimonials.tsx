import { FiStar } from "react-icons/fi";
import { getTopTestimonials } from "@/actions/server/review";

const Testimonials = async () => {
      const testimonials = await getTopTestimonials(6);

      if (testimonials.length === 0) {
            return null;
      }

      return (
            <section className="w-full space-y-8">
                  <div className="mx-auto max-w-2xl space-y-4 text-center">
                        <span className="badge badge-outline badge-primary px-4 py-3 text-sm font-semibold">
                              Testimonials
                        </span>
                        <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                              What Parents Say
                        </h2>
                        <p className="text-base-content/70 md:text-lg">
                              Real feedback from verified SuperKidz customers.
                        </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial) => (
                              <div
                                    key={testimonial._id}
                                    className="flex flex-col gap-4 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm"
                              >
                                    <div className="flex items-center gap-1 text-amber-500">
                                          {Array.from({ length: 5 }).map((_, index) => (
                                                <FiStar
                                                      key={index}
                                                      className={index < testimonial.rating ? "fill-current" : "text-base-300"}
                                                />
                                          ))}
                                    </div>

                                    <p className="flex-1 text-base-content/80">&ldquo;{testimonial.comment}&rdquo;</p>

                                    <div className="flex items-center gap-3 border-t border-base-200 pt-4">
                                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                                                {testimonial.userName.charAt(0).toUpperCase()}
                                          </span>
                                          <div>
                                                <p className="text-sm font-bold text-base-content">{testimonial.userName}</p>
                                                <p className="text-xs text-base-content/50">
                                                      {testimonial.verifiedPurchase ? "Verified buyer · " : ""}
                                                      {testimonial.productTitle}
                                                </p>
                                          </div>
                                    </div>
                              </div>
                        ))}
                  </div>
            </section>
      );
};

export default Testimonials;
