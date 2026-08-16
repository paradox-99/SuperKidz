import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FiPlus } from "react-icons/fi";
import { getAllProductsForAdmin, deleteProduct } from "@/actions/server/product";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";

export const metadata: Metadata = {
      title: "Admin · Products",
};

const AdminProductsPage = async () => {
      const products = await getAllProductsForAdmin();

      return (
            <div className="rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg md:p-8">
                  <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-lg font-bold">Products ({products.length})</h2>
                        <Link href="/admin/products/new" className="btn btn-primary btn-sm">
                              <FiPlus /> Add product
                        </Link>
                  </div>

                  {products.length === 0 ? (
                        <p className="text-sm text-base-content/60">No products yet.</p>
                  ) : (
                        <div className="overflow-x-auto">
                              <table className="table">
                                    <thead>
                                          <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Discount</th>
                                                <th>Sold</th>
                                                <th>Rating</th>
                                                <th className="text-right">Actions</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {products.map((product) => (
                                                <tr key={product._id}>
                                                      <td>
                                                            <div className="flex items-center gap-3">
                                                                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-base-200">
                                                                        <Image src={product.image} alt={product.title} fill sizes="48px" unoptimized className="object-cover" />
                                                                  </div>
                                                                  <span className="max-w-[220px] truncate font-semibold">{product.title}</span>
                                                            </div>
                                                      </td>
                                                      <td>৳{product.price}</td>
                                                      <td>{product.discount ? `${product.discount}%` : "—"}</td>
                                                      <td>{product.sold}</td>
                                                      <td>{product.ratings.toFixed(1)} ({product.reviews})</td>
                                                      <td>
                                                            <div className="flex justify-end gap-2">
                                                                  <Link href={`/admin/products/${product._id}/edit`} className="btn btn-outline btn-sm">
                                                                        Edit
                                                                  </Link>
                                                                  <AdminDeleteButton
                                                                        id={product._id}
                                                                        action={deleteProduct}
                                                                        confirmMessage={`Delete "${product.title}"? This also removes it from carts and its reviews.`}
                                                                  />
                                                            </div>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  )}
            </div>
      );
};

export default AdminProductsPage;
