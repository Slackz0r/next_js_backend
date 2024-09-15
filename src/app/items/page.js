// import { ItemCard } from "@/components/ItemCard";
// import { ItemForm } from "@/components/ItemForm";

// export default async function ItemPage() {
//   const items = await fetch("http://localhost:3000/api/items/")
//     .then((response) => response.json())
//     .catch((error) => {
//       console.log("failed to get items", error);
//     });

//   return (
//     <main className="min-h-screen w-full">
//       <ItemForm />
//       <h1>Items: {items?.length}</h1>

//       {items &&
//         items.map((item) => {
//           return <ItemCard item={item} />;
//         })}
//     </main>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { ItemCard } from "@/components/ItemCard";
// import { ItemForm } from "@/components/ItemForm";

// export default function ItemPage() {
//   // State to hold the items
//   const [items, setItems] = useState([]);

//   // Fetch items function
//   const fetchItems = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/items/");
//       const data = await response.json();
//       setItems(data);
//     } catch (error) {
//       console.log("Failed to fetch items", error);
//     }
//   };

//   // Fetch items when component mounts
//   useEffect(() => {
//     fetchItems();
//   }, []);

//   // Callback function to handle form submission and refresh items
//   const handleItemUpdate = async () => {
//     await fetchItems(); // Re-fetch the items after an update
//   };

//   return (
//     <main className="min-h-screen w-full">
//       {/* Pass the callback to the form to trigger refresh after an update */}
//       <ItemForm onItemUpdate={handleItemUpdate} />
//       <h1>Items: {items.length}</h1>

//       {items.map((item) => (
//         <ItemCard key={item.id} item={item} />
//       ))}
//     </main>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { ItemCard } from "@/components/ItemCard";
// import { ItemForm } from "@/components/ItemForm";

// export default function ItemPage() {
//   const [items, setItems] = useState([]);

//   // Fetch items from the API
//   const fetchItems = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/items/");
//       const data = await response.json();
//       setItems(data);
//     } catch (error) {
//       console.log("Failed to fetch items", error);
//     }
//   };

//   // Handle deleting an item
//   const handleDelete = (id) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   // Fetch items on component mount
//   useEffect(() => {
//     fetchItems();
//   }, []);

//   return (
//     <main className="min-h-screen w-full">
//       <ItemForm onItemUpdate={fetchItems} />
//       <h1>Items: {items.length}</h1>

//       {items.map((item) => (
//         <ItemCard key={item.id} item={item} onDelete={handleDelete} />
//       ))}
//     </main>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { ItemCard } from "@/components/ItemCard";
import { ItemForm } from "@/components/ItemForm";

export default function ItemPage() {
  const [items, setItems] = useState([]);

  // Fetch items from the API
  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/items/");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.log("Failed to fetch items", error);
    }
  };

  // Handle deleting an item
  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Handle editing an item
  const handleEdit = (id, updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <main className="min-h-screen w-full">
      <ItemForm onItemUpdate={fetchItems} />
      <h1>Items: {items.length}</h1>

      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </main>
  );
}
