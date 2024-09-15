// "use client";

// export const ItemCard = ({ item, onDelete }) => {
//   //   const handleDelete = async () => {
//   //     try {
//   //       const response = await fetch(`/api/items/${item.id}`, {
//   //         method: "DELETE",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //       });

//   //       if (response.ok) {
//   //         onDelete(item.id);
//   //       } else {
//   //         console.log("Failed to delete item");
//   //       }
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("@library/token"); // Get token from localStorage

//       const response = await fetch(`http://localhost:3000/api/items/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`, // Include token in the Authorization header
//         },
//       });
//       if (!response.ok) throw new Error("Failed to delete item");
//     } catch (err) {
//       console.log("Failed to delete item. dadklawdlawjmdjklawjdl");
//     }
//   };

//   return (
//     <div className="item-card">
//       <strong>
//         <p className="item-name">{item.name}</p>
//       </strong>
//       <p className="item-description">Description: {item.description}</p>
//       <p className="item-category">{item.category}</p>
//       <p className="item-quantity">In stock: {item.quantity}</p>
//       <button className="delete-btn" onClick={() => handleDelete(item.id)}>
//         Delete
//       </button>
//     </div>
//   );
// };

// "use client";

// export const ItemCard = ({ item, onDelete }) => {
//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("@library/token"); // Get token from localStorage

//       const response = await fetch(`http://localhost:3000/api/items/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`, // Include token in the Authorization header
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete item");
//       }

//       // Call the onDelete function passed as a prop to update the list after deletion
//       onDelete(id);
//     } catch (err) {
//       console.error("Failed to delete item", err);
//     }
//   };

//   return (
//     <div className="item-card">
//       <strong>
//         <p className="item-name">{item.name}</p>
//       </strong>
//       <p className="item-description">Description: {item.description}</p>
//       <p className="item-category">{item.category}</p>
//       <p className="item-quantity">In stock: {item.quantity}</p>
//       <button className="delete-btn" onClick={() => handleDelete(item.id)}>
//         Delete
//       </button>
//     </div>
//   );
// };

"use client";

import { useState } from "react";

export const ItemCard = ({ item, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false); // Toggle between edit and view mode
  const [editedItem, setEditedItem] = useState({
    name: item.name,
    description: item.description,
    quantity: item.quantity,
    category: item.category,
  });

  // Handle editing input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // Handle editing submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("@library/token");

      const response = await fetch(
        `http://localhost:3000/api/items/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedItem),
        }
      );

      if (!response.ok) throw new Error("Failed to update item");

      // Notify parent component after successful edit
      onEdit(item.id, editedItem);

      // Exit edit mode
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update item", err);
    }
  };

  // Render view mode or edit mode
  return (
    <div className="item-card">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            name="name"
            value={editedItem.name}
            onChange={handleInputChange}
            placeholder="Item Name"
            className="item-input"
            required
          />
          <input
            type="text"
            name="description"
            value={editedItem.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="item-input"
            required
          />
          <input
            type="number"
            name="quantity"
            value={editedItem.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="item-input"
            required
          />
          <input
            type="text"
            name="category"
            value={editedItem.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="item-input"
            required
          />
          <button type="submit" className="save-btn">
            Save
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <strong>
            <p className="item-name">{item.name}</p>
          </strong>
          <p className="item-description">Description: {item.description}</p>
          <p className="item-category">Category: {item.category}</p>
          <p className="item-quantity">In stock: {item.quantity}</p>

          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => onDelete(item.id)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};
