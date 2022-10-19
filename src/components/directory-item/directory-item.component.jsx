import { useNavigate } from "react-router-dom";

import {
  DirectoryItemContainer,
  BackgroundImage,
  DirectoryBody,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  const navigate = useNavigate();
  const shopNowClickHandler = () => {
    navigate(`shop/${title}`);
  };

  return (
    <DirectoryItemContainer>
      <BackgroundImage
        imageUrl={imageUrl}
      />
      <DirectoryBody
        className="directory-body-container"
        onClick={shopNowClickHandler}
      >
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectoryBody>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
