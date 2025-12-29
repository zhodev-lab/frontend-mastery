import { useState, useRef } from "react";

export default function Apps() {
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState(100);
  const [qty, setQty] = useState(1);
  const qtyRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.target.name === "price") {
      if (e.key === "ArrowUp") setPrice((p) => p + 1);
      if (e.key === "ArrowDown") setPrice((p) => p - 1);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      alert(`Order Submitted: ${symbol} ${qty}@${price}`);
    }

    if (e.key === "Escape") {
      setSymbol("");
      setPrice(100);
      setQty(1);
    }
  };

  return (
    <div className="p-4 border rounded w-80 space-y-3">
      <input
        name="symbol"
        placeholder="Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border p-2 w-full"
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        onKeyDown={handleKeyDown}
        className="border p-2 w-full"
      />
      <input
        ref={qtyRef}
        name="qty"
        placeholder="Quantity"
        type="number"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        onKeyDown={handleKeyDown}
        className="border p-2 w-full"
      />
      <button
        onClick={() => alert(`Order Submitted: ${symbol} ${qty}@${price}`)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Order
      </button>
    </div>
  );
}
