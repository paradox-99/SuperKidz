'use client';

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { createProduct, updateProduct, type ProductInput } from "@/actions/server/product";

type QnaItem = { question: string; answer: string };

type ProductFormProps = {
      mode: "create" | "edit";
      productId?: string;
      initialValues?: Partial<ProductInput>;
};

const ProductForm = ({ mode, productId, initialValues }: ProductFormProps) => {
      const router = useRouter();
      const [pending, startTransition] = useTransition();

      const [title, setTitle] = useState(initialValues?.title ?? "");
      const [bangla, setBangla] = useState(initialValues?.bangla ?? "");
      const [image, setImage] = useState(initialValues?.image ?? "");
      const [price, setPrice] = useState(initialValues?.price?.toString() ?? "");
      const [discount, setDiscount] = useState(initialValues?.discount?.toString() ?? "");
      const [sold, setSold] = useState(initialValues?.sold?.toString() ?? "0");
      const [description, setDescription] = useState(initialValues?.description ?? "");
      const [info, setInfo] = useState<string[]>(initialValues?.info?.length ? initialValues.info : [""]);
      const [qna, setQna] = useState<QnaItem[]>(initialValues?.qna?.length ? initialValues.qna : [{ question: "", answer: "" }]);

      const updateInfo = (index: number, value: string) => {
            setInfo((prev) => prev.map((item, i) => (i === index ? value : item)));
      };

      const updateQna = (index: number, field: keyof QnaItem, value: string) => {
            setQna((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
      };

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const input: ProductInput = {
                  title,
                  image,
                  bangla: bangla || undefined,
                  price: Number(price),
                  discount: discount ? Number(discount) : undefined,
                  sold: sold ? Number(sold) : undefined,
                  description: description || undefined,
                  info: info.filter((item) => item.trim()),
                  qna: qna.filter((item) => item.question.trim() && item.answer.trim()),
            };

            startTransition(async () => {
                  try {
                        if (mode === "create") {
                              await createProduct(input);
                              toast.success("Product created");
                        } else if (productId) {
                              await updateProduct(productId, input);
                              toast.success("Product updated");
                        }
                        router.push("/admin/products");
                        router.refresh();
                  } catch (error) {
                        toast.error(error instanceof Error ? error.message : "Could not save product");
                  }
            });
      };

      return (
            <form onSubmit={handleSubmit} className="space-y-6 rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg md:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1 sm:col-span-2">
                              <label className="text-sm font-semibold">Title</label>
                              <input
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="Number and Counting Learning Board"
                              />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                              <label className="text-sm font-semibold">Bangla title (optional)</label>
                              <input
                                    value={bangla}
                                    onChange={(e) => setBangla(e.target.value)}
                                    className="input input-bordered w-full"
                              />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                              <label className="text-sm font-semibold">Image URL</label>
                              <input
                                    required
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="https://i.ibb.co.com/..."
                              />
                        </div>

                        <div className="space-y-1">
                              <label className="text-sm font-semibold">Price (৳)</label>
                              <input
                                    required
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="input input-bordered w-full"
                              />
                        </div>

                        <div className="space-y-1">
                              <label className="text-sm font-semibold">Discount % (optional)</label>
                              <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    className="input input-bordered w-full"
                              />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                              <label className="text-sm font-semibold">Sold count</label>
                              <input
                                    type="number"
                                    min="0"
                                    value={sold}
                                    onChange={(e) => setSold(e.target.value)}
                                    className="input input-bordered w-full sm:w-40"
                              />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                              <label className="text-sm font-semibold">Description</label>
                              <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="textarea textarea-bordered w-full"
                                    rows={4}
                              />
                        </div>
                  </div>

                  <div className="space-y-3 border-t border-base-200 pt-5">
                        <div className="flex items-center justify-between">
                              <label className="text-sm font-semibold">Key features</label>
                              <button
                                    type="button"
                                    onClick={() => setInfo((prev) => [...prev, ""])}
                                    className="btn btn-ghost btn-xs"
                              >
                                    <FiPlus /> Add feature
                              </button>
                        </div>
                        {info.map((item, index) => (
                              <div key={index} className="flex gap-2">
                                    <input
                                          value={item}
                                          onChange={(e) => updateInfo(index, e.target.value)}
                                          className="input input-bordered w-full"
                                          placeholder="Helps kids learn counting 1-20"
                                    />
                                    <button
                                          type="button"
                                          onClick={() => setInfo((prev) => prev.filter((_, i) => i !== index))}
                                          className="btn btn-ghost btn-square btn-sm text-error"
                                          disabled={info.length === 1}
                                    >
                                          <FiTrash2 />
                                    </button>
                              </div>
                        ))}
                  </div>

                  <div className="space-y-3 border-t border-base-200 pt-5">
                        <div className="flex items-center justify-between">
                              <label className="text-sm font-semibold">Questions & answers</label>
                              <button
                                    type="button"
                                    onClick={() => setQna((prev) => [...prev, { question: "", answer: "" }])}
                                    className="btn btn-ghost btn-xs"
                              >
                                    <FiPlus /> Add Q&A
                              </button>
                        </div>
                        {qna.map((item, index) => (
                              <div key={index} className="space-y-2 rounded-2xl bg-base-200/70 p-4">
                                    <div className="flex gap-2">
                                          <input
                                                value={item.question}
                                                onChange={(e) => updateQna(index, "question", e.target.value)}
                                                className="input input-bordered w-full"
                                                placeholder="Question"
                                          />
                                          <button
                                                type="button"
                                                onClick={() => setQna((prev) => prev.filter((_, i) => i !== index))}
                                                className="btn btn-ghost btn-square btn-sm text-error"
                                                disabled={qna.length === 1}
                                          >
                                                <FiTrash2 />
                                          </button>
                                    </div>
                                    <textarea
                                          value={item.answer}
                                          onChange={(e) => updateQna(index, "answer", e.target.value)}
                                          className="textarea textarea-bordered w-full"
                                          placeholder="Answer"
                                          rows={2}
                                    />
                              </div>
                        ))}
                  </div>

                  <button type="submit" className="btn btn-primary w-full" disabled={pending}>
                        {pending ? "Saving…" : mode === "create" ? "Create product" : "Save changes"}
                  </button>
            </form>
      );
};

export default ProductForm;
