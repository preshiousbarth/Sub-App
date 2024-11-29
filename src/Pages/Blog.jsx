import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "../Pages/Blog.css";

const Blog = () => {
  const [purchases, setPurchases] = useState([]);
  const db = getFirestore();

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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "purchases", id));
      setPurchases((prevPurchases) =>
        prevPurchases.filter((purchase) => purchase.id !== id)
      );
      alert("Entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting entry:", error.message);
      alert("Failed to delete the entry. Please try again.");
    }
  };

  return (
    <div className="purchases-container p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">Purchased Plans</h1>
      {purchases.length === 0 ? (
        <p className="text-center text-lg md:text-xl">No purchases made yet!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200 text-sm md:text-lg">
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Age</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Plan</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id} className="text-sm md:text-base hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{purchase.username}</td>
                  <td className="border border-gray-300 px-4 py-2">{purchase.age}</td>
                  <td className="border border-gray-300 px-4 py-2">{purchase.location}</td>
                  <td className="border border-gray-300 px-4 py-2">{purchase.plan}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                      onClick={() => handleDelete(purchase.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Blog;
