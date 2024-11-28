import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
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
  }, [db]); // Ensure `db` dependency is included

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
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td>{purchase.username}</td>
                <td>{purchase.age}</td>
                <td>{purchase.location}</td>
                <td>{purchase.plan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Blog;
