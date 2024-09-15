// "use client";

// import { useAuth } from "@/context/auth";

// export const ItemForm = () => {
//   const auth = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch("/api/items", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${auth.token}`,
//       },
//       body: JSON.stringify({
//         name: "Sennheiser Headphones",
//         description: "Headphones for DJ'ing",
//         quantity: 12,
//         category: "Sound",
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       return data;
//     }
//   };

//   if (!auth.token) {
//     return <div>You have to be logged in to create a book</div>;
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <button>Add Item</button>
//     </form>
//   );
// };
// _________________________________________________________ -
// "use client";

// import { useAuth } from "@/context/auth";

// export const ItemForm = ({ onItemUpdate }) => {
//   const auth = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch("/api/items", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${auth.token}`,
//       },
//       body: JSON.stringify({
//         name: "Pioneer DDJ SX",
//         description: "Controller for DJ'ing",
//         quantity: 2,
//         category: "Sound",
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log("Item added:", data);

//       // Notify parent to refresh the item list
//       onItemUpdate();
//     } else {
//       console.error("Failed to add item");
//     }
//   };

//   if (!auth.token) {
//     return <div>You must be logged in to create an item.</div>;
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <button type="submit">Add Item</button>
//     </form>
//   );
// };

"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth";

export const ItemForm = ({ onItemUpdate }) => {
  const auth = useAuth();

  // State to hold form input values
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        name,
        description,
        quantity: Number(quantity), // Ensure quantity is a number
        category,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Item added:", data);

      // Clear form fields after successful submission
      setName("");
      setDescription("");
      setQuantity(0);
      setCategory("");

      // Notify parent component to refresh the items list
      onItemUpdate();
    } else {
      console.error("Failed to add item");
    }
  };

  if (!auth.token) {
    return <div>You must be logged in to create an item.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Add New Item</h2>

      <div className="form-group">
        <label className="form-label">Item Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
          placeholder="Enter item name"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-input"
          placeholder="Enter item description"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="form-input"
          placeholder="Enter item quantity"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="form-input"
          placeholder="Enter item category"
        />
      </div>

      <div className="form-group">
        <button type="submit" className="submit-button">
          Add Item
        </button>
      </div>
    </form>
  );
};
