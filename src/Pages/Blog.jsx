import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "../Pages/Blog.css";

const Blog = () => {
  const [purchases, setPurchases] = useState([]);
  const db = getFirestore();

  // Fetch purchases
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "purchases"));
        const purchaseData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPurchases(purchaseData);
      } catch (error) {
        console.error("Error fetching purchases: ", error);
      }
    };

    fetchPurchases();
  }, [db]);

  // Delete purchase
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "purchases", id)); // Delete the document by ID
      setPurchases((prevPurchases) => prevPurchases.filter((purchase) => purchase.id !== id)); // Update state
      alert("Entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting entry: ", error);
      alert("Failed to delete the entry. Please try again.");
    }
  };

  return (
    <div className="purchases-container">
      <h1>Purchased Plans</h1>
      {purchases.length === 0 ? (
        <p>No purchases made yet!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Age</th>
              <th>Location</th>
              <th>Plan</th>
              <th>Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td>{purchase.username}</td>
                <td>{purchase.age}</td>
                <td>{purchase.location}</td>
                <td>{purchase.plan}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(purchase.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Blog;