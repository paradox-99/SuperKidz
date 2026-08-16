'use client';

import { FaStar } from "react-icons/fa";

type StarRatingProps = {
      value: number;
      size?: "sm" | "md" | "lg";
      interactive?: boolean;
      onChange?: (value: number) => void;
};

const sizeClass: Record<NonNullable<StarRatingProps["size"]>, string> = {
      sm: "text-sm",
      md: "text-xl",
      lg: "text-2xl",
};

const StarRating = ({ value, size = "md", interactive = false, onChange }: StarRatingProps) => {
      const stars = [1, 2, 3, 4, 5];

      return (
            <div className={`flex items-center gap-1 ${sizeClass[size]}`}>
                  {stars.map((star) => {
                        const filled = star <= Math.round(value);

                        if (!interactive) {
                              return (
                                    <FaStar
                                          key={star}
                                          className={filled ? "text-amber-500" : "text-base-content/20"}
                                    />
                              );
                        }

                        return (
                              <button
                                    key={star}
                                    type="button"
                                    onClick={() => onChange?.(star)}
                                    className={`transition hover:scale-110 ${filled ? "text-amber-500" : "text-base-content/20"}`}
                                    aria-label={`${star} star${star === 1 ? "" : "s"}`}
                              >
                                    <FaStar />
                              </button>
                        );
                  })}
            </div>
      );
};

export default StarRating;
