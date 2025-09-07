import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import Modal from "react-modal";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeOrder, setActiveOrder] = useState(null);

	useEffect(() => {
		if (isLoading) {
			const token = localStorage.getItem("token");
			if (!token) {
				alert("Please login first");
				return;
			}
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((res) => {
					setOrders(res.data);
					setIsLoading(false);
				})
				.catch((e) => {
					alert(
						"Error fetching orders: " +
							(e.response?.data?.message || "Unknown error")
					);
					setIsLoading(false);
				});
		}
	}, [isLoading]);

	return (
		<div className="w-full h-full max-h-full overflow-y-auto p-4 font-[var(--font-main)]">
		 	{isLoading ? (
		 		<Loading />
		 	) : (
		 		<div className="overflow-x-auto">
		 			{/* Modal for order details */}
		 			<Modal
		 				isOpen={isModalOpen}
		 				onRequestClose={() => setIsModalOpen(false)}
		 				className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto my-10 p-6 outline-none"
		 				overlayClassName="fixed inset-0 bg-[#00000040] flex justify-center items-center"
		 			>
		 				{activeOrder && (
		 					<div className="space-y-4">
		 						<h2 className="text-2xl font-bold text-[var(--color-accent)]">
		 							Order Details - {activeOrder.orderId}
		 						</h2>
		 						<div className="grid grid-cols-2 gap-4">
		 							<div>
		 								<p>
		 									<span className="font-semibold">Name:</span>{" "}
		 									{activeOrder.name}
		 								</p>
		 								<p>
		 									<span className="font-semibold">Email:</span>{" "}
		 									{activeOrder.email}
		 								</p>
		 								<p>
		 									<span className="font-semibold">Phone:</span>{" "}
		 									{activeOrder.phone}
		 								</p>
		 								<p>
		 									<span className="font-semibold">Address:</span>{" "}
		 									{activeOrder.address}
		 								</p>
		 							</div>
		 							<div>
		 								<p>
		 									<span className="font-semibold">Status:</span>{" "}
		 									<span
		 										className={`font-bold ${
		 											activeOrder.status === "pending"
		 												? "text-yellow-500"
		 												: activeOrder.status === "completed"
		 												? "text-green-600"
		 												: "text-red-500"
		 										}`}
		 									>
		 										{activeOrder.status.toUpperCase()}
		 									</span>
											<select
												onChange={async (e) => {
													const updatedValue = e.target.value;
													try {
														const token = localStorage.getItem("token");
														await axios.put(
															import.meta.env.VITE_BACKEND_URL +
																"/api/orders/" +
																activeOrder.orderId +
																"/" +
																updatedValue,
															{},
															{
																headers: {
																	Authorization: "Bearer " + token,
																},
															}
														);
														
														setIsLoading(true);
														const updatedOrder = {...activeOrder};
														updatedOrder.status = updatedValue;
														setActiveOrder(updatedOrder);

													} catch (e) {
														toast.error("Error updating order status")
														console.log(e)
													}
												}}
											>
												<option selected disabled>
													Change status
												</option>
												<option value="pending">Pending</option>
												<option value="completed">Completed</option>
												<option value="cancelled">Cancelled</option>
												<option value="returned">Returned</option>
											</select>
		 								</p>
		 								<p>
		 									<span className="font-semibold">Date:</span>{" "}
		 									{new Date(activeOrder.date).toLocaleDateString("en-GB")}
		 								</p>
		 								<p>
		 									<span className="font-semibold">Total:</span>{" "}
		 									{activeOrder.total.toLocaleString("en-LK", {
		 										style: "currency",
		 										currency: "LKR",
		 									})}
		 								</p>
		 								<p>
		 									<span className="font-semibold">Labelled Total:</span>{" "}
		 									{activeOrder.labelledTotal.toLocaleString("en-LK", {
		 										style: "currency",
		 										currency: "LKR",
		 									})}
		 								</p>
		 							</div>
		 						</div>

		 						<h3 className="text-xl font-semibold mt-4">Products</h3>
		 						<table className="w-full text-center border border-gray-200 shadow rounded">
		 							<thead className="bg-[var(--color-accent)] text-white">
		 								<tr>
		 									<th className="py-2 px-2">Image</th>
		 									<th className="py-2 px-2">Product</th>
		 									<th className="py-2 px-2">Price</th>
		 									<th className="py-2 px-2">Quantity</th>
		 									<th className="py-2 px-2">Subtotal</th>
		 								</tr>
		 							</thead>
		 							<tbody>
		 								{activeOrder.products.map((item, idx) => (
		 									<tr
		 										key={idx}
		 										className={`${
		 											idx % 2 === 0
		 												? "bg-[var(--color-primary)]"
		 												: "bg-gray-100"
		 										}`}
		 									>
		 										<td className="py-2 px-2">
		 											<img
		 												src={item.productInfo.images[0]}
		 												alt={item.productInfo.name}
		 												className="w-12 h-12 object-cover rounded"
		 											/>
		 										</td>
		 										<td className="py-2 px-2">{item.productInfo.name}</td>
		 										<td className="py-2 px-2">
		 											{item.productInfo.price.toLocaleString("en-LK", {
		 												style: "currency",
		 												currency: "LKR",
		 											})}
		 										</td>
		 										<td className="py-2 px-2">{item.quantity}</td>
		 										<td className="py-2 px-2">
		 											{(
														item.productInfo.price * item.quantity
													).toLocaleString("en-LK", {
														style: "currency",
														currency: "LKR",
													})}
		 										</td>
		 									</tr>
		 								))}
		 							</tbody>
		 						</table>
		 						<div className="flex justify-end gap-4">
		 							<button
		 								onClick={() => setIsModalOpen(false)}
		 								className="mt-4 px-4 py-2 bg-[var(--color-accent)] text-white rounded hover:bg-[var(--color-secondary)] transition"
		 							>
		 								Close
		 							</button>
                                     <button
		 								onClick={() => window.print()}
		 								className="mt-4 px-4 py-2 bg-[var(--color-accent)] text-white rounded hover:bg-[var(--color-secondary)] transition"
		 							>
		 								Print
		 							</button>
		 						</div>
		 					</div>
		 				)}
		 			</Modal>

					<table className="w-full text-sm text-gray-700 border border-gray-200 shadow-md rounded-2xl overflow-hidden">
						<thead className="bg-[var(--color-accent)] text-white text-base">
						<tr>
							<th className="py-4 px-3 text-left">Order ID</th>
							<th className="py-4 px-3 text-left">Name</th>
							<th className="py-4 px-3 text-left">Email</th>
							<th className="py-4 px-3 text-left">Phone</th>
							<th className="py-4 px-3 text-left">Total (LKR)</th>
							<th className="py-4 px-3 text-left">Date</th>
							<th className="py-4 px-3 text-left">Status</th>
						</tr>
						</thead>
						<tbody>
						{orders.map((order, index) => (
							<tr
							key={index}
							onClick={() => { setActiveOrder(order); setIsModalOpen(true); }}
							className={`cursor-pointer ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
							>
							<td className="py-2 px-3">{order.orderId}</td>
							<td className="py-2 px-3">{order.name}</td>
							<td className="py-2 px-3">{order.email}</td>
							<td className="py-2 px-3">{order.phone}</td>
							<td className="py-2 px-3 text-left">{order.total.toLocaleString("en-LK", { style: "currency", currency: "LKR" })}</td>
							<td className="py-2 px-3">{new Date(order.date).toLocaleDateString("en-GB")}</td>
							<td className={`py-2 px-3 font-semibold ${order.status === "pending" ? "text-yellow-500" : order.status === "completed" ? "text-green-600" : "text-red-500"}`}>
								{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
							</td>
							</tr>
						))}
						</tbody>
					</table>
		 		</div>
		 	)}
		</div>
	);
}
