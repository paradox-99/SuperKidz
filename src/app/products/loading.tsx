import ProductSkeleton from '@/components/skeletons/ProductSkeleton';

const loading = () => {
      return (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {[...Array(3)].map((_, index) => (
                        <ProductSkeleton key={index} />
                  ))}
            </div>
      );
};

export default loading;