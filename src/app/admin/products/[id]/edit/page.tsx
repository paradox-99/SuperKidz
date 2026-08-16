import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById } from "@/actions/server/product";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = {
      title: "Admin · Edit Product",
};

type EditProductPageProps = {
      params: Promise<{ id: string }>;
};

const EditProductPage = async ({ params }: EditProductPageProps) => {
      const { id } = await params;
      const product = await getProductById(id);

      if (!product) {
            notFound();
      }

      return (
            <div>
                  <h2 className="mb-5 text-lg font-bold">Edit product</h2>
                  <ProductForm
                        mode="edit"
                        productId={id}
                        initialValues={{
                              title: product.title,
                              bangla: product.bangla,
                              image: product.image,
                              price: product.price,
                              discount: product.discount,
                              sold: product.sold,
                              description: product.description,
                              info: product.info,
                              qna: product.qna,
                        }}
                  />
            </div>
      );
};

export default EditProductPage;
