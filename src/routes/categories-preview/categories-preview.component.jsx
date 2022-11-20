import { Fragment } from "react";
import { useSelector } from "react-redux";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      { isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => (
          <CategoryPreview
            title={title}
            key={title}
            products={categoriesMap[title]}
          />
        ))
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
