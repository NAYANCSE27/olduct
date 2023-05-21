import { Button, Upload, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { EditProduct, UploadProductImage } from "../../../api/products";
import { set } from "mongoose";

function Images({ selectedProduct, setShowProductForm, getData }) {
  const [showPreview = false, setShowPreview] = React.useState(true);
  const [images = [], setImages] = React.useState(selectedProduct.images);
  const [file = null, setFile] = React.useState(null);
  const dispatch = useDispatch();

  const upload = async () => {
    try {
      dispatch(SetLoading(true));
      // upload image to cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await UploadProductImage(formData);
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        setShowPreview(false);
        setFile(null);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const deleteImage = async (image) => {
    try {
      const updatedImagesArray = images.filter((img) => img !== image);
      const updatedProduct = { ...selectedProduct, images: updatedImagesArray };
      const response = await EditProduct(selectedProduct._id, updatedProduct);
      
      if (response.success) {
        message.success(response.message);
        setImages(updatedImagesArray);
        getData();
      } else {
        throw new Error(response.message);
      }
      dispatch(SetLoading(true));

    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex gap-5 mb-3">
        {images.map((image) => {
          return (
            <div className="flex gap-2 border border-solid border-gray-300 rounded p-3 items-end">
              <img src={image} alt="" className="w-20 h-20 object-cover" />
              <i
                className="ri-delete-bin-5-line"
                onClick={() => deleteImage(image)}
              ></i>
            </div>
          );
        })}
      </div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        showUploadList={showPreview}
      >
        <Button type="dashed">Upload Images</Button>
      </Upload>

      <div className="flex justify-end gap-5 mt-5">
        <Button
          type="default"
          onClick={() => {
            setShowProductForm(false);
          }}
        >
          Cancel
        </Button>

        <Button type="primary" disabled={!file} onClick={upload}>
          Upload
        </Button>
      </div>
    </div>
  );
}

export default Images;
