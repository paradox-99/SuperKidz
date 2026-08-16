import type { Metadata } from "next";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = {
      title: "Admin · Add Product",
};

const NewProductPage = () => {
      return (
            <div>
                  <h2 className="mb-5 text-lg font-bold">Add product</h2>
                  <ProductForm mode="create" />
            </div>
      );
};

export default NewProductPage;
