const response = await fetch("/api/books", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.token}`,
  },
});
