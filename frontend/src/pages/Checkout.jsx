import { useState } from "react";

export default function Checkout() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto bg-white border rounded p-6 text-center shadow">
        <h2 className="text-2xl font-bold mb-2">Thank you for shopping with us!</h2>
        <p className="text-gray-700 mb-1">
          We truly appreciate your preference.
        </p>
        <p className="text-red-500 font-semibold">
          Note: This is just a test payment.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white border rounded p-6 shadow space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div>
        <label className="block text-sm mb-1">Cardholder Name</label>
        <input
          type="text"
          required
          placeholder="John Doe"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Card Number</label>
        <input
          type="text"
          required
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm mb-1">Expiry Date</label>
          <input
            type="text"
            required
            placeholder="MM/YY"
            maxLength={5}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="w-24">
          <label className="block text-sm mb-1">CVC</label>
          <input
            type="text"
            required
            placeholder="123"
            maxLength={4}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white rounded py-2 mt-4 hover:bg-gray-800"
      >
        Pay Now (Demo)
      </button>
    </form>
  );
}
