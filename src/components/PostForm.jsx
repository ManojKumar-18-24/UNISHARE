import { useForm } from "react-hook-form";
import { Button, Input } from "./index"; 
import service from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import conf from "../conf/conf";

function PostForm({ post }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title || "",
      from: post?.stating_time,
      to: post?.ending_time,
      model: post?.model || "",
      price: post?.price || "",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null;

      if (file) {
        service.delteFile(post.image);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        image: file ? file.$id : post.image,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      if(data.image?.[0]) 
      {
        const file = await service.uploadFile(data.image[0]);
        if (file?.$id) data.image = file.$id;
        else data.image = conf.appwriteImageId ;
      }
      else {
          data.image = conf.appwriteImageId;
      }

      const dbPost = await service.createPost({
        ...data,
        userId: userData.$id,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const currentDateTime = new Date().toISOString().slice(0, 16); // Get current datetime in "YYYY-MM-DDTHH:mm" format

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: false && "Image is required" })}
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>
      <div className="w-2/3 px-2">
        <Input
          label="Model :"
          placeholder="Model"
          className="mb-4"
          {...register("model", { required: "Model is required" })}
        />
        {errors.model && <p className="text-red-500">{errors.model.message}</p>}
      </div>
      <div className="w-1/2 px-2">
        <Input
          label="From :"
          type="datetime-local"
          className="mb-4"
          {...register("starting_time", {
            required: "Start time is required",
            validate: (value) =>
              new Date(value) > new Date(currentDateTime) || "Start time must be in the future",
          })}
        />
        {errors.from && <p className="text-red-500">{errors.from.message}</p>}
      </div>
      <div className="w-1/2 px-2">
        <Input
          label="To :"
          type="datetime-local"
          className="mb-4"
          {...register("ending_time", {
            required: "End time is required",
            validate: (value) => {
              const from = new Date(watch("starting_time"));
              const to = new Date(value);
              return to > from || "End time must be after start time";
            },
          })}
        />
        {errors.to && <p className="text-red-500">{errors.to.message}</p>}
      </div>
      {post && (
        <div className="w-full mb-4">
          <img
            src={service.getFilePreview(post.image)}
            alt={post.title}
            className="rounded-lg"
          />
        </div>
      )}
      <div className="w-2/3 px-2">
        <Input
          label="Price :"
          placeholder="Price"
          type="number"
          className="mb-4"
          {...register("price", {
            required: "Price is required",
            validate: (value) =>
              parseInt(value, 10) > 0 || "Price must be a positive integer",
          })}
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>
      <Button
        type="submit"
        bgColor={post ? "bg-green-500" : undefined}
        className="w-full"
      >
        {post ? "Update" : "Submit"}
      </Button>
    </form>
  );
}

export default PostForm;
