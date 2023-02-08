import React from "react";
import { api } from "../utils/api";
import { useSession } from "next-auth/react";

const NewItemForm = () => {
  const { data: session } = useSession();
  const [inputValue, setInputValue] = React.useState({
    name: "",
    description: "",
  });
  const postMessage = api.item.postMessage.useMutation();
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        postMessage.mutate({
          name: inputValue.name,
          description: inputValue.description,
          userId: session?.user.id || "",
        });
      }}
    >
      <div className="form-control w-full max-w-full">
        <label className="label">
          <span className="label-text">Item Name</span>
        </label>
        <input
          className="input-bordered input w-full max-w-full"
          type="text"
          placeholder="Name"
          value={inputValue.name}
          onChange={(e) =>
            setInputValue({ ...inputValue, name: e.target.value })
          }
        />
      </div>
      <div className="form-control w-full max-w-full">
        <label className="label">
          <span className="label-text">Item Description</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-40"
          placeholder="Description"
          value={inputValue.description}
          onChange={(e) =>
            setInputValue({ ...inputValue, description: e.target.value })
          }
        />
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  );
};

export default NewItemForm;
